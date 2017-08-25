using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PeliculasEntradas.Models;
using PeliculasEntradas.Repository;

namespace PeliculasEntradas.Services
{
    public class EntradaService : IEntradaService
    {
        IEntradaRepository entradaRepository;
        public EntradaService(IEntradaRepository entradaRepository)
        {
            this.entradaRepository = entradaRepository;
        }

        public Entrada Create(Entrada entrada)
        {
           return  this.entradaRepository.Create(entrada);
        }

        public void Delete(long Id)
        {
            this.entradaRepository.Delete(Id);
        }

        public Entrada Read(long Id)
        {
           return this.entradaRepository.Read(Id);
        }

        public IQueryable<Entrada> ReadAll()
        {
            return this.entradaRepository.ReadAll();
        }

        public void Update(long Id, Entrada entrada)
        {
            this.entradaRepository.Update(Id,entrada);
        }
    }
}