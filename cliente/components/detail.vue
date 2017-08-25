<template>
	<div class="detail-div" id="Detail">
		<h1>DETAIL:</h1>
		<div id ="FormularioUsuarios"  class="Formulario">
			<label>Nombre:</label>
			<input :disabled="read" v-model="currentObject.property1" type="text" id="nombreInput" placeholder="Nombre"></input>
			<label>Apellido:</label>
			<input :disabled="read" type="text" v-model="currentObject.property2" id="apellidoInput" placeholder="Apellido"></input>
			<label>Edad:</label>
			<input :disabled="read" type="number" v-model="currentObject.property3" id="edadInput" placeholder="Edad"></input>
			<div class = "buttonContainer">
				<button :disabled="!this.enableButtons" id="acceptButton" v-on:click="buttonAccept">ACEPTAR</button>
				<button  id="limpiarButton" v-on:click="buttonClean">LIMPIAR</button>
				<button  id="resetButton" v-on:click="buttonReset">RESET</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"Detail",
		data (){
			return{
				menuChoice : "Pelicula",
				currentObject: [],
				index:""
			}
		},
		props:['readIndex',
		'enableButtons',
		'detailMode'],
		computed:{
			calculateButtons: function(){

			}
		},
		methods:{
	  // all code for my component goes here
	  makeGetRequest: function(id){
	  	$.ajax(url="http://localhost:57470/api/" + this.menuChoice + "/" + id,
	  		method="GET")
	  	.done(this.submitDetailValues)
	  },
	  readDetail: function(index){
	  	this.makeGetRequest(index);
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
	  deleteItem: function(index){
	  	$.ajax({url:"http://localhost:57470/api/ " + this.menuChoice +"/" + index,
	  		method:"DELETE"})	
	  	.done(this.makeGetListRequest)
	  	.fail(function(){
	  		alert("ELEMENTO NO BORRADO");
	  	})
	  },
	},
	mounted() {
		console.log('Component mounted.')
	}
}
</script>

<style scoped>
  /* CSS here
   * by including `scoped`, we ensure that all CSS
   * is scoped to this component!
   */
</style>
