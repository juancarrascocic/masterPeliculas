<template>
	<div class="detail-div" id="Detail">
		<h1>DETAIL:</h1>
		<div id ="FormularioUsuarios"  class="Formulario">
			<label>Titulo:</label>
			<input :disabled="read" v-model="currentPelicula.Titulo" type="text" id="nombreInput" placeholder="Titulo"></input>
		</br>
		<label>Director:</label>
		<input :disabled="read" type="text" v-model="currentPelicula.Director" id="apellidoInput" placeholder="Director"></input>
	</br>
	<label>Duracion:</label>
	<input :disabled="read" type="number" v-model="currentPelicula.Duracion" id="edadInput" placeholder="Duracion"></input>
</br>
<label>País:</label>
<select v-model="currentPelicula.Pais" :disabled="read">
	<option value="España">España</option>
	<option value="Francia">Francia</option>
	<option value="Alemania">Alemania</option>
	<option value="EEUU">EEUU</option>
</select>
<div class = "buttonContainer">
	<button :disabled="!this.enableButtons" id="acceptButton" v-on:click="buttonAccept">ACEPTAR</button>
	<button :disabled="this.enableCleanButton" id="limpiarButton" v-on:click="buttonClean">LIMPIAR</button>
	<button :disabled="!this.enableButtons" id="resetButton" v-on:click="buttonReset">RESET</button>
</div>
</div>
</div>
</template>

<script>
	var baseURL = "http://localhost:53765/api/"
	import constantes from './constants.js'
	export default {	
		name:"Detail",
		data (){
			return{
				currentPelicula: {
					Titulo: undefined,
					Director: undefined,
					Duracion: 0,
					Pais: undefined

				},
				previousPelicula: {
					Titulo: undefined,
					Director: undefined,
					Duracion: 0,
					Pais: undefined}
				}
			},
			props:['readIndex',
			'enableButtons',
			'detailMode',
			'menuChoice', 
			'read'],
			computed:{
				enableCleanButton: function(){
					if(this.detailMode == constantes.STATE_READ){
						return true;
					}
					else{
						return false;
					}
				},
				enableResetButton: function(){
					if(this.detailMode == constantes.STATE_READ){
						return true;
					} 
					else{
						return false;
					}
				},
				enableAcceptButton: function(){
					if(this.detailMode == constantes.STATE_READ){
						return true;
					}
					else{
						return false;
					}
				}, 
				updateMode: function(){
					if(this.detailMode == constantes.STATE_READ){
						this.readDetail();
					}
					else if(this.detailMode == constantes.STATE_NEW){
						this.currentPelicula = {};
						this.previousPelicula = {};
					}
				}

			},
			methods:{
	  // all code for my component goes here
	  makeGetRequest: function(){
	  	$.ajax({url:baseURL + this.menuChoice + "/" + this.readIndex,
	  		method:"GET"})
	  	.done(this.submitDetailValues)
	  },
	  submitDetailValues: function(data){
	  	this.currentPelicula = data;
	  },
	  readDetail: function(){
	  	this.makeGetRequest(this.readIndex);
	  	this.read = true;
	  },
	  updateDetail: function(index){
	  	this.makeGetRequest(index);
	  	this.previousPerson.index = this.currentPerson.index;
	  	this.previousPerson.name = this.currentPerson.name;
	  	this.previousPerson.surname = this.currentPerson.surname;
	  	this.previousPerson.age = this.currentPerson.age;
	  	this.read = false;
	  },
	  newDetail: function(index){
	  	this.read= false;
	  	this.currentPerson.index = "";
	  	this.currentPerson.name = "";
	  	this.currentPerson.surname = "";
	  	this.currentPerson.age = "";
	  },
	  buttonClean: function(){
	  	this.currentPelicula = {};
	  	this.previousPelicula = {};
	  },
	  deleteItem: function(index){
	  	$.ajax({url:baseURL + this.menuChoice +"/" + index,
	  		method:"DELETE"})	
	  	.done(this.makeGetListRequest)
	  	.fail(function(){
	  		alert("ELEMENTO NO BORRADO");
	  	})
	  },
	},
	mounted() {
		if(this.detailMode == constantes.STATE_READ){
			this.readDetail();
		}
		else if(this.detailMode == constantes.STATE_NEW){
			this.currentPelicula = {Titulo: undefined,
				Director: undefined,
				Duracion: 0,
				Pais: undefined};
				this.previousPelicula = {Titulo: undefined,
					Director: undefined,
					Duracion: 0,
					Pais: undefined};
				}
			},
		}
	</script>

	<style scoped>
  /* CSS here
   * by including `scoped`, we ensure that all CSS
   * is scoped to this component!
   */
</style>
