using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;
using PeliculasEntradas.Models;
using PeliculasEntradas.Repository;
using PeliculasEntradas.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Unity.WebApi;

namespace PeliculasEntradas
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers
            container.AddNewExtension<Interception>();
            container.RegisterType<IPeliculaService, PeliculaService>(
                new Interceptor<InterfaceInterceptor>(),
                new InterceptionBehavior<DBInterceptor>());
            container.RegisterType<IPeliculaRepository, PeliculaRepository>();
            container.RegisterType<IEntradaService, EntradaService>(
                new Interceptor<InterfaceInterceptor>(),
                new InterceptionBehavior<DBInterceptor>());
            container.RegisterType<IEntradaRepository, EntradaRepository>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
    public class DBInterceptor : IInterceptionBehavior
    {
        public IMethodReturn Invoke(IMethodInvocation input,
          GetNextInterceptionBehaviorDelegate getNext)
        {
            IMethodReturn result;
            if (ApplicationDbContext.applicationDbContext == null)
            {
                using (var context = new ApplicationDbContext())
                {
                    ApplicationDbContext.applicationDbContext = context;
                    using (var dbContextTransaction = context.Database.BeginTransaction())
                    {
                        try
                        {

                            result = getNext()(input, getNext);


                            if (result.Exception != null)
                            {
                                throw result.Exception;
                            }
                            context.SaveChanges();

                            dbContextTransaction.Commit();
                        }
                        catch (Exception e)
                        {
                            dbContextTransaction.Rollback();
                            ApplicationDbContext.applicationDbContext = null;
                            throw new Exception("He hecho rollback de la transacción", e);
                        }
                    }
                }
                ApplicationDbContext.applicationDbContext = null;
            }
            else
            {

                result = getNext()(input, getNext);


                if (result.Exception != null)
                {
                    throw result.Exception;
                }
            }
            return result;
        }

        public IEnumerable<Type> GetRequiredInterfaces()
        {
            return Type.EmptyTypes;
        }

        public bool WillExecute
        {
            get { return true; }
        }

        private void WriteLog(string message)
        {

        }
    }
}