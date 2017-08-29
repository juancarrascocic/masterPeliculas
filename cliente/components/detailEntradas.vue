<template>
	<div class="detail-div" id="Detail">
		<h1>DETAIL:</h1>
		<div id ="FormularioUsuarios"  class="Formulario">
			<label>Hora:</label>
			<input :disabled="read" v-model="currentObject.property1" type="time" id="horaInput" placeholder="Hora"></input>
		</br>
		<label>Precio:</label>
		<input :disabled="read" type="number" v-model="currentObject.property2" id="precioInput" placeholder="Precio"></input>
	</br>
	<label>Pelicula:</label>
	<select :disabled="read">
		<option value="p1">Pelicula1</option>
		<option value="p2">Pelicula2</option>
		<option value="p3">Pelicula3</option>
		<option value="p4">Pelicula4</option>
	</select>
	<div class = "buttonContainer">
		<button :disabled="!this.enableButtons" id="acceptButton" v-on:click="buttonAccept">ACEPTAR</button>
		<button  id="limpiarButton" v-on:click="buttonClean">LIMPIAR</button>
		<button :disabled="!this.enableButtons" id="resetButton" v-on:click="buttonReset">RESET</button>
	</div>
</div>
</div>
</template>

<script>
	var baseURL = "http://localhost:53765/api/"
	export default {	
		name:"Detail",
		data (){a
			return{
				currentObject: [],
				index:""
			}
		},
		props:['readIndex',
		'enableButtons',
		'detailMode',
		'menuChoice'],
		computed:{
			calculateButtons: function(){
			},
			getData: function(){
				readDetail();
			}
		},
		methods:{
	  // all code for my component goes here
	  makeGetRequest: function(id){
	  	$.ajax(url=baseURL + this.menuChoice + "/" + id,
	  		method="GET")
	  	.done(this.submitDetailValues)
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
