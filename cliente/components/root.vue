<template>

	<div id="Root" class="root-div">
		<master @isNew = "setNew" @readDetail = "readIndex" @updateDetail = "updateIndex"></master>
		<detail v-if="this.showDetail" v-bind:readIndex = "this.itemIndex" v-bind:detailMode="detailMode" v-bind:enableButtons="enableButtons"></detail>
	</div>
</template>

<script>
	import master from './master.vue'
	import detail from './detail.vue'
	export default{
		components:{
			master,
			detail,
		},
		data (){
			return{
				showDetail : false,
				enableButtons: false,
				itemIndex : "",
				detailMode : ""
			}
		},
		methods:{
			setNew(newState){
				this.showDetail = true;
				this.enableButtons = false;
			},
			readIndex(index){
				this.itemIndex = index;
				this.showDetail = true;
				this.enableButtons = false;
			},
			updateIndex(index){
				this.itemIndex = index;
				this.showDetail = true;
				this.enableButtons = false;
			},			
		}
	}
</script>

<style></style>