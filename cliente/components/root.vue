<template>
	<div id="Root" class="root-div">
		<tabs @changeTab = "changeTab" v-bind:menuChoice = "this.menuChoice"></tabs>
		<masterPeliculas v-if="this.menuChoice == 'Pelicula'" v-bind:menuChoice="this.menuChoice" @isNew = "setNew" @readDetail = "readIndex" @updateDetail = "updateIndex"></masterPeliculas>
		<masterEntradas v-if="this.menuChoice == 'Entrada'" v-bind:menuChoice="this.menuChoice" @isNew = "setNew" @readDetail = "readIndex" @updateDetail = "updateIndex"></masterEntradas>
		<detailEntradas v-if="showDetailEntradas" v-bind:readIndex = "this.itemIndex" v-bind:detailMode="detailMode" v-bind:enableButtons="enableButtons" v-bind:menuChoice = "this.menuChoice">
		</detailEntradas>
		<detailPeliculas v-if="showDetailPeliculas" v-bind:read="this.read" v-bind:readIndex = "this.itemIndex" v-bind:detailMode="detailMode" v-bind:enableButtons="enableButtons" v-bind:menuChoice = "this.menuChoice">
		</detailPeliculas>
	</div>
</template>

<script>
	import masterPeliculas from './masterPeliculas.vue'
	import masterEntradas from './masterEntradas.vue'
	import detailPeliculas from './detailPeliculas.vue'
	import detailEntradas from './detailEntradas.vue'
	import tabs from './tabs.vue'
	import constantes from './constants.js'


	export default{
		components:{
			masterPeliculas,
			masterEntradas,
			detailPeliculas,
			detailEntradas,
			tabs
		},
		data (){
			return{
				showDetail : false,
				enableButtons: false,
				itemIndex : "",
				detailMode : constantes.STATE_NEW,
				menuChoice : "Pelicula",
				read : true
			}
		},
		computed:{
			showDetailEntradas: function(){
				return this.showDetail && this.menuChoice == "Entrada";
			},
			showDetailPeliculas: function(){
				return this.showDetail && this.menuChoice == "Pelicula";
			},
		},
		methods:{
			setNew(newState){
				this.showDetail = true;
				this.enableButtons = false;
				this.read = false;	
				this.detailMode = constantes.STATE_NEW;
			},
			readIndex(index){
				this.itemIndex = index;
				this.showDetail = true;
				this.detailMode = constantes.STATE_READ;
				this.enableButtons = false;
			},
			updateIndex(index){
				this.itemIndex = index;
				this.showDetail = true;
				this.enableButtons = false;
				this.detailMode = constantes.STATE_UPDATE;
			},		
			changeTab(option){
				this.menuChoice = option;
				this.showDetail = false;
			}

		}
	}
</script>

<style></style>