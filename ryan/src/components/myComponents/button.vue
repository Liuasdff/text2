<template>
	<div class = "my-inline-block">
		<button  class="my-button" :style="'background-color:'+ this.backgroundColor+';border-radius:' + this.borderRadius
		+';width:' + this.width+';height:' + this.height+';font-size:' + this.fontSize+';color:' + this.color">
			<label class="my-button-text">{{ text }}</label>
		</button>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				// backColor:"red",
				a:"blue",
			}
		},
		props:["backgroundColor","borderRadius","width","height","fontSize","color","text"],
		methods:{
			
		},
		mounted() {
		  
		},
		
		components: {
			
		},
	}
</script>

<style scoped>
	.my-inline-block{
		display: inline-block;
	}
	.my-button {
		padding: 6px;
		line-height: 0;
		background-color: #26a2ff;
	    -webkit-appearance: none;
	       -moz-appearance: none;
	            appearance: none;
	    border-radius: 4px;
	    border: 0;
	    box-sizing: border-box;
		 color: #fff;
	    display: block;
	    font-size: 18px;
		height: 30px;
		width: 60px;
	    outline: 0;
	    overflow: hidden;
	    position: relative;
	    text-align: center
	}
	.my-button::after {
	    background-color: #000;
	    content: " ";
	    opacity: 0;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    position: absolute
	}
	.my-button:not(.is-disabled):active::after {
	    opacity: .4
	}
	.my-button.is-disabled {
	    opacity: .6
	}
	
	
</style>
