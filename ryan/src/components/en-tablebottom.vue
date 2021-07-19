<template>
	<div class = "tablebottomdv">
	  <div class = "tablebottom">
	    <span class = "blues" @click="first"><i class = "fa fa-angle-double-left"></i></span>
	    <span class = "blues" @click="qian"><i class = "fa fa-angle-left"></i></span>
	    <span class = "dian blues" @click="dianqian">
	      <i>...</i>
	    </span>
	    <div class = "number">
	      <span class = "blues" v-for = "(k,i) in number" @click="numbersclick(k,i)" :class = "{'blue':blue == i}">{{ k }}</span>
	    </div>
	    <span class = "dian blues" @click="dianhou">
	      <i>...</i>
	    </span>
	    <span class = "blues" @click="hou"><i class = "fa fa-angle-right"></i></span>
	    <span class = "blues" @click="end"><i class = "fa fa-angle-double-right"></i></span>
	    <span class="option" id = "option">
	    	<select @change="selectchange()" v-model="select" autocomplete="off">
	    		<option selected='selected' value="10"> &nbsp; 10 </option>
	    		<option class = "optiona" value="20">&nbsp; 20 </option>
	    		<option value="30">&nbsp; 30 </option>
	    		<option value="40">&nbsp; 40 </option>
	    		<option value="50">&nbsp; 50 </option>
          <option value="100">&nbsp; All</option>
	    	</select>
	    	<div>
	        <div class="optiondiv fa fa-angle-down"></div>
	      </div>
	    </span>
	    <span class = "xianshi">Showing  {{ firstTR }} 一 {{ endTR }} of {{ data.length }}</span>
	  </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data:[],
				tr:[], // tr总共有多少行 每行是哪一个obj
				number:[],  //总共有多少页
				numberkey:1, // 记录被点击的哪一页
				numberi:0,// 记录被点击的哪一页的索引
				maxnumber:1, // 最大页数
				select:10,   // 每行显示多少条信息 初始10
				optionnum:10, // 每行显示多少条信息
				firstTR:1, // 开始显示TR的索引
				endTR:10, // 结束显示TR的索引
				blue:0, // 点击哪一页 哪一个数字就为蓝色
			}
		},
    created(){
      // this.$emit('trs',this.tr)
    },
		mounted(){

		},
		methods:{
      parentTR(trs){
        this.data = trs
        this.numberinit(1,0)
      },
			//k 点击的数字几默认1 i数字K的索引默认0
			numberinit(k,i){
			  this.blue = i
			  this.numberkey = k
			  this.firstTR = this.numberkey*this.optionnum - this.optionnum+1
			  this.endTR = this.numberkey*this.optionnum
			  this.endTR = this.endTR<this.data.length?this.endTR:this.data.length
			  this.numberi = i
			  //初始多少行tr
			  this.number = [1,2,3,4,5]
			  this.maxnumber = parseInt((this.data.length - 1)/this.optionnum) + 1;
			  for(var i = 0 ; i < this.number.length ; i++){
			    if(this.number[i] == this.maxnumber){
			      this.number = this.number.splice(0,i+1)
			    }
			  }
			   //  每行tr显示多少条
			   var kk = k -1
			   var indexf = kk * this.optionnum
			   var indexe = indexf + this.optionnum
			   var maxindex = this.data.length;
			   indexe = indexe>maxindex?maxindex:indexe
			   this.tr = []
			   for(var i = indexf ;i < indexe ; i++){
			     var datas = this.data[i]
			     this.tr.push(datas)
			   }
         this.$emit('trs',this.tr)
			},
			numbersclick(k,i){
			  this.blue = i
			  this.numberkey = k
			  this.firstTR = this.numberkey*this.optionnum - this.optionnum+1
			  this.endTR = this.numberkey*this.optionnum
			  this.endTR = this.endTR<this.data.length?this.endTR:this.data.length
			  this.numberi = i
			   //  每行tr显示多少条
			   var kk = k -1
			   var indexf = kk * this.optionnum
			   var indexe = indexf + this.optionnum
			   var maxindex = this.data.length;
			   indexe = indexe>maxindex?maxindex:indexe
			   this.tr = []
			   for(var i = indexf ;i < indexe ; i++){
			     var datas = this.data[i]
			     this.tr.push(datas)
			   }
         this.$emit('trs',this.tr);
			},
			first(){
			  this.numberinit(1,0)
			},
			qian(){
			  if(this.numberkey >1){
			    if(this.numberkey % 5 == 1){
			      this.number = [this.numberkey - 5,this.numberkey - 4,this.numberkey - 3,this.numberkey - 2,this.numberkey - 1]
			      this.numbersclick(this.numberkey-1,4)
			    }else{
			      this.numbersclick(this.numberkey-1,this.numberi-1)
			    }
			  }

			},
			hou(){
			    if(this.numberkey < this.maxnumber){
			      if(this.numberkey % 5 == 0){
			        var arr = []
			        var endindex = this.numberkey + 5 <= this.maxnumber?5:this.maxnumber - this.numberkey
			        for(var i = 0;i<endindex;i++){
			          arr[i] = this.numberkey + i + 1
			        }
			        this.number = arr
			        this.numbersclick(this.numberkey+1,0)
			      }else{
			        this.numbersclick(this.numberkey+1,this.numberi+1)
			      }
			    }
			},
			end(){
			   var yushu = this.maxnumber%5
			   yushu = yushu == 0?5:yushu
			   var arr = []
			   for(var i = 0 ;i<yushu;i++){
			     arr[i] = this.maxnumber - yushu + i + 1
			   }
			   this.number = arr
			   this.numbersclick(this.number[this.number.length -1],this.number.length -1)
			},
			dianqian(){
			  if(this.number[0] - 5 < 1){
			    this.number = this.number
			  }else{
			    this.number = [this.number[0] -5,this.number[0] -4,this.number[0] -3,this.number[0] -2,this.number[0] -1]
			  }
			  this.numbersclick(this.number[0],0)
			},
			dianhou(){
			   if(this.number.length >=5){
			     var arr = []
			    for(var i = 0 ;i < this.number.length ; i++){
			        if(this.number[i] + 5 > this.maxnumber){
			          this.number = arr.length>0?arr:this.number;
			          this.numbersclick(this.number[0],0)
			          return;
			        }else{
			           arr[i] = this.number[i] + 5
			        };
			    }
			    this.number = arr
			    this.numbersclick(this.number[0],0)
			   }else{
			     return;
			   };
			},
			selectchange(){
			  this.optionnum = parseInt(this.select)
        this.optionnum = this.optionnum==100?this.data.length:this.optionnum       
			  this.numberinit(1,0)
			},
			sousuochange(){
			  // this.data = this.shuju
			  var that = this
			  console.log(this.data)
			  this.data = this.shuju.filter(function(k,i){
			    return k.body.indexOf(that.sousuo) != -1
			  })
			  this.numberinit(1,0)
			},
		},
		components:{

		},
	}
</script>

<style scoped>
	.tablebottomdv{
	  width: 100%;
	  background-color: #ececf1;
	  padding: 20px 0;
	  display: flex;
	  /* 下面一行兼容IE */
	  flex-direction: column;
	  /* !*flex-direction: column;*!可写可不写 */
	  justify-content: center;
	  align-items: center;
	}
	.tablebottom{
	  display: inline-block;
	  margin: auto;
	  -webkit-user-select: none; /* 不可选择复制*/
	  -moz-user-select:none;     /* 不可选择复制*/
	  user-select:none;
	}
	.tablebottom span{
	  /* vertical-align: top; */
	  display: inline-block;
    padding: 0 5px;
	  min-width: 20px;
	  height: 30px;
	  font-size: 18px;
	  line-height: 30px;
	  text-align: center;
	  border-radius: 3px;
	  cursor: pointer;
	  margin-right: 5px;
	}
	.blues:hover{
	  background-color: #5d78ff;
	}
	.number{
	  display: inline-block;
	  height: 30px;
	}
	.number span{
	  /* vertical-align: middle; */
	  font-size: 18px;
	}
	 .dian{
	   position: relative;
	 }
	 .blue{
	   background-color: #5d78ff;
	 }
	.tablebottom .option {
	  cursor: pointer;
	 	width: 110px;
	 	height: 30px;
	}
	.tablebottom .xianshi{
	  width: auto;
	}
</style>
