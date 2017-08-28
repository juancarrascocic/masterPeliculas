<template>
	<div id = "Menu" >

		<a :class ="anchorClass" v-on:click="chooseMenu('Pelicula')">Películas</a>
		<a :class ="anchorClass" v-on:click="chooseMenu('Entrada')">Entradas</a>

	</div>
</template>


<script>
	
	export default {	
		name:"Tabs",
		data (){
			return{
				
			}
		},
		props:[
		'menuChoice'],
		computed:{
			anchorClass: function(){

			}
		},
		methods:{
			chooseMenu : function(option){
				this.$emit('changeTab', option);
			}

		},

	}

</script>

<style>
	
	a.anchorMenu{
	display:inline-block;
	padding: 10px;
	margin: 0px;
}
a.anchorSelected{
	border-top: solid;
	border-right: solid;
	border-left: solid;
	background-color: 
}
a.anchorNotSelected{
	border: solid;

}
</style>