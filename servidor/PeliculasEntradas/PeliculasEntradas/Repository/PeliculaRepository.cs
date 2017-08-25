using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PeliculasEntradas.Models;
using System.Data.Entity;

namespace PeliculasEntradas.Repository
{
    public class PeliculaRepository: IPeliculaRepository
    {
        public Pelicula Create(Pelicula pelicula)
        {
            return ApplicationDbContext.applicationDbContext.Peliculas.Add(pelicula);
        }

        public void Delete(long Id)
        {

            Pelicula pelicula = ApplicationDbContext.applicationDbContext.Peliculas.Find(Id);
            if (pelicula == null)
            {
                throw new NoEncontradoException("No se ha encontrado");
            }

            ApplicationDbContext.applicationDbContext.Peliculas.Remove(pelicula);
        }

        public Pelicula Read(long Id)
        {
            return ApplicationDbContext.applicationDbContext.Peliculas.Find(Id);
        }

        public IQueryable<Pelicula> ReadAll()
        {
            IList<Pelicula> lista = new List<Pelicula>(ApplicationDbContext.applicationDbContext.Peliculas);

            return lista.AsQueryable();
        }

        public void Update(long Id, Pelicula pelicula)
        {
            if (ApplicationDbContext.applicationDbContext.Peliculas.Count(e => e.Id == pelicula.Id) == 0)
            {
                throw new NoEncontradoException("No he encontrado la entidad");
            }
            ApplicationDbContext.applicationDbContext.Entry(pelicula).State = EntityState.Modified;
        }
    }
}