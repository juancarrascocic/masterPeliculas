using PeliculasEntradas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeliculasEntradas.Repository
{
    public interface IPeliculaRepository
    {
        Pelicula Create(Pelicula pelicula);
        Pelicula Read(long Id);
        IQueryable<Pelicula> ReadAll();
        void Update(long Id, Pelicula pelicula);
        void Delete(long Id);

    }
}