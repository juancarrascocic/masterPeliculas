using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeliculasEntradas
{
    public class NoEncontradoException : Exception
    {
        public NoEncontradoException() : base()
        {

        }

        public NoEncontradoException(String mensaje) : base(mensaje)
        {

        }

        public NoEncontradoException(String mensaje, Exception innerException) : base(mensaje, innerException)
        {

        }
    }
}