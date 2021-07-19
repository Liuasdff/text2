<template>
	<div class = "my-checkbox">
		<input class = "my-checkbox-input" ref= "myCheckbox" type="checkbox" @change="Change"/>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		props:["backgroundColor","width","height","color",],
		methods:{
			Change(){
				console.log(33)
			}
		},
		mounted() {
		    if(this.width ){
		    	this.$refs.myCheckbox.style.width = this.width
				this.$refs.myCheckbox.style.height = this.width
				this.$refs.myCheckbox.style.fontSize = this.width 
				this.$refs.myCheckbox.style.lineHeight = this.width 
                return		
		    }
			if(this.height ){
				this.$refs.myCheckbox.style.width = this.height
				this.$refs.myCheckbox.style.height = this.height
				this.$refs.myCheckbox.style.fontSize = this.height 
				this.$refs.myCheckbox.style.lineHeight = this.height 
			    return		
			}
	      	  
		},
		
		components: {
			
		},
	}
</script>
 
<style scoped>
	.my-checkbox{
		display: inline-block;
		/* cursor: -ms-hand; */
	}
	.my-checkbox input[type="checkbox"]{
		/* -webkit 和 -moz 是为了兼容浏览器*/ 
		-webkit-user-select: none; /* 不可选择复制*/   
		-moz-user-select:none;  /* 不可选择复制*/
		-moz-appearance:none;   /* 改变按钮和其他控件的外观*/
		-webkit-appearance: none;    /* 改变按钮和其他控件的外观*/
		width: 22px;
		height: 22px;
		display: inline-block;
		border: 0;
		outline: 0 !important;
		cursor: hand;
		position: relative;
		font-size: 18px;
		line-height: 20px;
	}
	.my-checkbox input[type="checkbox"]::before{
		display: inline-block;
		text-align: center;
		content: "";
		font-family: 'FontAwesome';
		background-color: white;
		border: 1px solid #AAAAAA;
		text-align: center;
		height: 100%;
		width: 100%;
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: 0;
		cursor: pointer;
		color: #999;
	}
	.my-checkbox input[type="checkbox"]:checked::before{
		background-color: #2187E7;
		border: 1px solid #2187E7;
		content: "\f00c";
		color:#fff;	
	}
	.red .my-checkbox-input[type="checkbox"]:checked::before{
		background-color: red;
		border: 1px solid red;
		content: "\f00c";
		color:#fff;	
	}
	.blue .my-checkbox-input[type="checkbox"]:checked::before{
		background-color: blue;
		border: 1px solid blue;
		content: "\f00c";
		color:#fff;	
	}
	
</style>
