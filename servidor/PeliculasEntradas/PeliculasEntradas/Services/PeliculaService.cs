using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PeliculasEntradas.Models;
using PeliculasEntradas.Repository;

namespace PeliculasEntradas.Services
{
    public class PeliculaService : IPeliculaService
    {
        IPeliculaRepository peliculaRepository;
        public PeliculaService(IPeliculaRepository peliculaRepository)
        {
            this.peliculaRepository = peliculaRepository;
        }
        public Pelicula Create(Pelicula pelicula)
        {
            return this.peliculaRepository.Create(pelicula);
        }

        public void Delete(long Id)
        {
            this.peliculaRepository.Delete(Id);
        }

        public Pelicula Read(long Id)
        {
           return this.peliculaRepository.Read(Id);
        }

        public IQueryable<Pelicula> ReadAll()
        {
           return this.peliculaRepository.ReadAll();
        }

        public void Update(long Id, Pelicula pelicula)
        {
            peliculaRepository.Update(Id, pelicula);
        }
    }
}