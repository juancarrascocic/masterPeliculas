using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PeliculasEntradas.Models;
using PeliculasEntradas.Services;
using System.Web.Http.Cors;

namespace PeliculasEntradas.Controllers
{
    [EnableCors(origins: "http://localhost:3000, http://localhost:8080", headers: "*", methods: "*")]


    public class PeliculaController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public IPeliculaService peliculaService;
        public PeliculaController(IPeliculaService peliculaService)
        {
            this.peliculaService = peliculaService;
        }
        // GET: api/Peliculas
        public IQueryable<Pelicula> GetPeliculas()
        {
            return peliculaService.ReadAll();
        }

        // GET: api/Peliculas/5
        [ResponseType(typeof(Pelicula))]
        public IHttpActionResult GetPelicula(long id)
        {
            Pelicula pelicula = peliculaService.Read(id);
            if (pelicula == null)
            {
                return NotFound();
            }

            return Ok(pelicula);
        }

        // PUT: api/Peliculas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPelicula(long id, Pelicula pelicula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pelicula.Id)
            {
                return BadRequest();
            }

            peliculaService.Update(id, pelicula);
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Peliculas
        [ResponseType(typeof(Pelicula))]
        public IHttpActionResult PostPelicula(Pelicula pelicula)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            peliculaService.Create(pelicula);

            return CreatedAtRoute("DefaultApi", new { id = pelicula.Id }, pelicula);
        }

        // DELETE: api/Peliculas/5
        [ResponseType(typeof(Pelicula))]
        public IHttpActionResult DeletePelicula(long id)
        {
            Pelicula pelicula = db.Peliculas.Find(id);
            if (pelicula == null)
            {
                return NotFound();
            }

            peliculaService.Delete(id);

            return Ok(pelicula);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PeliculaExists(long id)
        {
            return db.Peliculas.Count(e => e.Id == id) > 0;
        }
    }
}