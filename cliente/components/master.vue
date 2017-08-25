<template>

	<div id="Master" class="master-div">
		<h1>MASTER: {{menuChoice}}</h1>

		<div  class = "master-div-row" :class=computedClass v-for="(item, index) in lista" >
			<p class = "nameParagraph">{{index}}    </p>
			<p class = "nameParagraph">{{item.Nombre}}</p>
			<div class ="rowButtonsContainer">
				<button class="masterButton" v-on:click="readDetail(item.Id)" ><img class="buttonImage" src="images/read.png"/></button>
				<button class="masterButton" v-on:click="updateDetail(item.Id)" ><img class="buttonImage" src="images/update.png"/></button>
				<button class="masterButton" v-on:click="deleteItem(item.Id)" ><img class="buttonImage" src="images/delete.png"/></button>
			</div>
		</div>
		<button class="masterButton buttonNew" v-on:click="newDetail()" ><img class="buttonImage" src="images/new.png"/></button>

	</div>
</template>

<script type="text/javascript">
	var baseURL = "http://localhost:53765/api/"
	export default{
		name:'master',
		data (){
			return{
				lista : [],
				menuChoice : "Pelicula"
			}
		},
		computed:{
			computedClass(){

			},
		},
		methods: {
			makeGetListRequest: function(){
				$.ajax({
					url : baseURL + this.menuChoice,
					method: "GET"})
				.done(this.submitGetListValues)
			},
			submitGetListValues: function(datos){
				this.lista = datos;
			},
			deleteItem: function(index){
				$.ajax({url: baseURL + this.menuChoice +"/" + index,
					method:"DELETE"})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO BORRADO");
				})
			},
			newDetail: function(){
				this.$emit('isNew', true);
			},
			readDetail: function(index){
				this.$emit('readDetail', index);
			},
			updateDetail: function(index){
				this.$emit('updateDetail', index);
			},

		}, 
		created(){
			this.makeGetListRequest();
		},
	}
</script>
<style type="text/css">
	div.master-div-row {
	border-size:1px;
	border-style:solid;
	border-color:black;
	margin:10px;
	padding:3px;
}
div.master-div {
	width:70%;
	float: left;
}
div.selected {
	background-color: #81F7F3;
}
p.nameParagraph {
	display:inline-block;
}

button.masterButton {
	height:50px;
	width:50px;
	align-content: center;
}
img.buttonImage {
	height:30px;
	width:30px	;

}
</style>