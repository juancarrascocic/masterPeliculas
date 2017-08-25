using PeliculasEntradas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliculasEntradas.Services
{
    public interface IPeliculaService
    {
        Pelicula Create(Pelicula pelicula);
        Pelicula Read(long Id);
        IQueryable<Pelicula> ReadAll();
        void Update(long Id, Pelicula pelicula);
        void Delete(long Id);
    }
}
