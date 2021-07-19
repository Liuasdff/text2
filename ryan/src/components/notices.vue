<template>
	<div class = "notices" v-show="routers">
		<div class = "global-search" :class = "{'search':globalsearch ==false}">
      <span ><input @input="sousuochange" v-model="sousuo" placeholder = "搜索须知" /></span>
    </div>
    <span>告示</span>
    <div class = "div3">
      <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
      <button class = "del" @click="del">删除所选</button>
    </div>
    <div class = "table">
    	<table cellspacing="10" cellpadding="10">
    		<tr class="th">
    			<td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
    			<td>内容</td>
    			<td>创建于</td>
    			<td>类型</td>
    		</tr>
    		<tr class="tr" v-for = "(k,i) in tr" >
    			<td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
    			<td class = "noticesbody"><div>{{ k.content }}</div></td>
    			<td>{{ k.created_at.replace('T',' ').slice(0,19) }}</td>
          <td>{{ type[k.type]}}</td>
    		</tr>
    	</table>
      <tabelbottom  ref="tabelbottom" @trs = "trs"></tabelbottom>
    </div>
    <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
  import tabelbottom from "./tablebottom.vue"
	export default{
		data(){
			return{
        routers:false,
        globalsearch:search,
         sousuo:"",
         data:[],
         data1:[],
         dellist:[],
         tr:[],
         checkcount:0,
         type:{'M':'信息',"D":'默认密码',},
			}
		},
		mounted(){
      var that = this
      $.ajax({
          url: URL + "/notice/list/",
          headers:token,
          type: "GET",
          // data:JSON.stringify(data),
        	processData: false,
          contentType: "application/json",
        	success: function(data){
           // console.log(data)
           that.data = data
           that.data1 = data
           if(that.$refs.tabelbottom){
              that.$refs.tabelbottom.parentTR(that.data)
              that.routers = true
           }
          },
          error: function(xhr, status, text) {
            console.log(xhr)
            var a = ''
            for(var k in xhr.responseJSON){
              a = a + k + " " +xhr.responseJSON[k]
            }
            // myalert(a)
            // $(".add").attr('disabled',false);
          },

      })
		},
		methods:{
      trs(trlist){
        this.tr = trlist;
        this.initchecked()
      },
      sousuochange(){
        var that = this
        that.data1 = this.data.filter(function(k,i){
          return k.content.indexOf(that.sousuo) != -1
        })
        // this.numberinit(1,0)
        this.$refs.tabelbottom.parentTR(that.data1)
      },
     initchecked(){
        var checkth = document.getElementById("appcheckth")
        var checktd = document.getElementsByClassName("appchecktd")
        checkth.checked = false
        for (var i = 0; i < checktd.length; i++) {
        	checktd[i].checked = false
        }
        this.dellist=[]
        this.checkcount = 0
      },
      appcheckth(){
      	// 获取被选中的复选框：使用 :checked 方法
      	// var chec = $("input[type='checkbox']:checked");
      	var checkth = document.getElementById("appcheckth").checked
      	var checktd = document.getElementsByClassName("appchecktd")
       this.dellist = []
       if (checkth) {
         for (var i = 0; i < checktd.length; i++) {
         		checktd[i].checked = true
         	}
       	for (var ii = 0; ii < this.data1.length; ii++) {
           var obj = {'id':this.data1[ii].id}
       		this.dellist.push(obj)
       	}
         this.checkcount = this.data1.length;

       } else {
       	for (var i = 0; i < checktd.length; i++) {
       		checktd[i].checked = false
       	}
         this.checkcount = 0;
       }
       // console.log(this.dellist)
     },
     appchecktd(){
       this.dellist = []
       var checkth = document.getElementById("appcheckth")
       var checktd = document.getElementsByClassName("appchecktd")
       var count = 0;
       for (var i = 0; i < checktd.length; i++) {
        	if(checktd[i].checked){
        		count+=1
           var idd = checktd[i].getAttribute('idd')
           var obj = {'id':idd}
           this.dellist.push(obj)
        	}
       }
       this.checkcount = count;
       checkth.checked = count == this.data1.length?true:false;
       // console.log(this.dellist)
     },
      del(){
        var dellist = this.dellist
        var fn = function(){
          $.ajax({
            url: URL + "/notice/delete/",
            headers: token,
            data: JSON.stringify(dellist),
            type: "POST",
            processData: false,
            contentType: "application/json",
            success: function(data) {
              location.reload()
            },
            error: function(xhr, status, text) {
              alert1("删除失败")
            },
          })
        }
        if (dellist.length < 1) {
          alert1("请最少选择一项")
        } else {
          // console.log(dellist)
          var text2 = '确认删除 ' +  dellist.length + ' 个项吗？'
          confirm1('删除？',text2,fn)
        }
      },
		},
		components:{
        tabelbottom,
		},
	}
</script>

<style scoped>
  .global-search input{
     /* border-radius: 10px; */
     height: 30px;
     padding: 5px 10px;
     width: 160px;
     font-size: 16px;

  }
  .notices>span{
    display: inline-block;
     height: 70px;
     padding-left: 32px;
     line-height: 70px;
     font-size: 20px;
  }
  tr td:nth-child(1){
    width: 50px;
  }
  .notices .div3{
    padding: 0px 0px 10px 32px;
  }
  .notices .div3 button{
    padding: 10px 10px;
    border-radius: 20px;
  }
  .notices .div3 .del{
    background-color: #fd397a;
  }
  .notices .div3 button::after{
    border-radius: 20px;
  }

</style>
