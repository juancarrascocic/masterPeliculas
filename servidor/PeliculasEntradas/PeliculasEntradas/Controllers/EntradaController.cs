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

    public class EntradaController : ApiController
    {

        private ApplicationDbContext db = new ApplicationDbContext();
        public IEntradaService entradaService;
        public EntradaController(IEntradaService entradaService)
        {
            this.entradaService = entradaService;
        }
        // GET: api/Entrada
        public IQueryable<Entrada> GetEntradas()
        {
            return this.entradaService.ReadAll();
        }

        // GET: api/Entrada/5
        [ResponseType(typeof(Pelicula))]
        public IHttpActionResult GetEntrada(long id)
        {
            Entrada entrada = this.entradaService.Read(id);
            if (entrada == null)
            {
                return NotFound();
            }

            return Ok(entrada);
        }

        // PUT: api/Entrada/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEntrada(long id, Entrada entrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entrada.Id)
            {
                return BadRequest();
            }

            entradaService.Update(id, entrada);

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Entrada
        [ResponseType(typeof(Pelicula))]
        public IHttpActionResult PostEntrada(Entrada entrada)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            entradaService.Create(entrada);

            return CreatedAtRoute("DefaultApi", new { id = entrada.Id }, entrada);
        }

        // DELETE: api/Entrada/5
        [ResponseType(typeof(Pelicula))]
        public IHttpActionResult DeleteEntrada(long id)
        {
            Entrada entrada = entradaService.Read(id);
            if (entrada == null)
            {
                return NotFound();
            }

            entradaService.Delete(id);

            return Ok(entrada);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EntradaExists(long id)
        {
            return db.Entradas.Count(e => e.Id == id) > 0;
        }
    }
}