using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeliculasEntradas.Models
{
    public class Pelicula
    {
        public long Id { get; set; }
        public String Titulo { get; set; }
        public String Director { get; set; }
        public float Duracion { get; set; }
        public String Pais { get; set; }
    }
}