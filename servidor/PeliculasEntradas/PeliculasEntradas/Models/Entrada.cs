using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeliculasEntradas.Models
{
    public class Entrada
    {
        public long Id { get; set; }
        public String Hora { get; set; }
        public float Precio { get; set; }
        public String Pelicula { get; set; }
    }
}