<template>
	<div id="App">
   <!-- <div class = "fa fa-bell-o"> -->

   <!-- </div> -->
		<!-- <div>{{ this.$route.name }}</div> -->
		<router-view> </router-view>
	</div>
</template>

<script>
	import helloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'App',
		data(){
			return{
				value:true,
			}
		},
		mounted() {
     
		},
		methods:{
      
		},
		components: {
			helloWorld,
		},
	}
</script>

<style >

  a{
    /* color: #fff; */
    text-decoration: none;
  }
  i{
    font-style: normal;
  }
  .global-search{
    position: fixed;
    padding:0 20px;
    left: 200px;
    top: 18px;
    z-index: 10;
    height: 55px;
    background-color: #fff;
  }
  .Opalstack{
    padding: 20px 0px 40px 24px;
  }
  .option {
  	display: inline-block;
  	width: 110px;
  	height: 30px;
  	position: relative;
  	background-color: #fff;
    line-height: 0px !important;
    border: 1px solid #0062CC;
    border-radius: 3px;
  }
  .option select {
    cursor: pointer;
    background-color: #fff;
    display: inline-block;
  	/* padding-left: 5px; */
    font-size: 16px;
  	width: 100%;
  	height: 100%;
  	outline: none;
    border: none;
  	/* 隐藏select的下拉图标 */
  	appearance: none;
  	-webkit-appearance: none;
  	-moz-appearance: none;
  }
  select::-ms-expand { display: none; } /* 去除IE 下拉箭头 */
  .optiondiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 20px;
  	position: absolute;
    right: 5px;
  	/* top: calc((100% - 1em)/2); */
    top:0px;
  	/* z-index: 1; */
  	pointer-events: none;
  	/*  阻止点击、状态变化和鼠标指针变化： */
  }

    button{
      cursor: pointer;
    	-webkit-appearance: none;  /* 可以修改 input 样式*/
    	   -moz-appearance: none;  /* 可以修改 input 样式*/
    	        appearance: none;  /* 可以修改 input 样式*/
    	-webkit-user-select: none; /* 不可选择复制*/
    	-moz-user-select:none;     /* 不可选择复制*/
    	      user-select:none;
    	border: 0;
    	display: inline-block;
    	padding: 3px 15px;
    	background-color: #26A2FF;
    	border-radius: 3px;
    	color: #fff;
    	position: relative;
    	outline: none;
    }
    button::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
    	  border-radius:3px;
    }
    button:not(.is-disabled):active::after {
      outline: none;
        opacity: .4
    }
    button.is-disabled {
      outline: none;
        opacity: .6
    }
    button i{
    	margin-right: 10px;
    }
  input{
  	display: inline-block;
  	width: 100px;
  	height: 20px;
    outline: none;
  	/* text-align: justify;  */
    /* text-align-last: justify; */
  	border: 1px solid #0062CC;
  	padding:0;
    text-indent: 5px;
  	border-radius: 3px;
  }
  input[type="radio"],input[type="checkbox"]{
  	/* -webkit 和 -moz 是为了兼容浏览器*/
  	-webkit-user-select: none; /* 不可选择复制*/
  	-moz-user-select:none;  /* 不可选择复制*/
  	-moz-appearance:none;   /* 改变按钮和其他控件的外观*/
  	-webkit-appearance: none;    /* 改变按钮和其他控件的外观*/
    appearance:none;
    -moz-appearance:none; /* Firefox */
  	width: 16px;
  	height: 16px;
  	display: inline-block;
  	border: 0;
  	outline: 0 !important;
  	cursor: hand;
  	position: relative;
  	font-size: 14px;
  	line-height: 16px;
  	vertical-align: middle;
    text-indent: 0px;
  }
   input[type="radio"]::before,input[type="checkbox"]::before{
  	display: inline-block;
  	text-align: center;
  	content: "";
  	font-family: 'FontAwesome';
  	background-color: #becaf9;
  	border: 1px solid #becaf9;
  	text-align: center;
  	height: 100%;
  	width: 100%;
  	/* border-radius: 50%; */
  	position: absolute;
  	left: 0;
  	top: 0;
  	cursor: pointer;
  	color: #999;
  }
   input[type="radio"]:checked::before,input[type="checkbox"]:checked::before{
  	background-color: #2187E7;
  	border: 1px solid #2187E7;
  	content: "\f00c";
  	color:#fff;
  }

  .table{
    display: flex;
    /* 下面一行兼容IE */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .tablebottom{
    display: inline-block;
    padding: 10px 0;
  }
  table {
  	/* border-collapse 默认为 separate 单元格边框之间会有间隙 */
  	border-collapse: collapse;
  	/* text-align: center; */
    width: 100%;
    background-color: #fff;
  	/* border: solid 1px Black; */
  }
  table tr {
  	border: solid 1px #ececf1;
    /* border-left: none; */
    /* border-right: none; */
  }
  table td {
  	height: 20px;
  	padding: 10px 10px;
  }
  .th td{
  	/* background-color: #EEE; */
    height: 50px;
    font-weight: 600;
    font-size: 18px;
  }
  #App{
    height: 100%;
  }
  .search{
    left: 50px;
  }
  .bodytopdiv{
    display: inline-block;
     height: 70px;
     padding-left: 32px;
     line-height: 70px;
     font-size: 20px;
  }
  .home-body-luyou{
    padding: 0 24px 0 24px;
  }
  .bodydiv{
    padding: 0 20px 0 20px;
    background-color: #fff;
  }
  .btn{
    padding-top: 40px;
    padding-bottom: 40px;
    height: 55px;
  }
  .btn button{
    float: right;
    margin-right: 15px;
    height: 50px;
    font-size: 16px;
    min-width: 90px;
  }
  .add{
    background-color: #fd397a;
  }
</style>
