using PeliculasEntradas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeliculasEntradas.Services
{
    public interface IEntradaService
    {
        Entrada Create(Entrada entrada);
        Entrada Read(long Id);
        IQueryable<Entrada> ReadAll();
        void Update(long Id, Entrada entrada);
        void Delete(long Id);
    }
}
