<template>
  <div  class="applications certificates" v-show="routers">

    <div class="global-search" :class="{'search':globalsearch ==false}">
       <button class="tianjia" @click="add">十 添加证书</button>
       <span>
         <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="搜索证书" />
       </span>
     </div>
     <span>证书</span>
     <div class="div3">
       <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
       <button class="del" @click="del">删除所选</button>
     </div>

     <div id = 'certtable' class="table">
       <table cellspacing="10" cellpadding="110">
         <tr class="th">
           <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
           <td>名称</td>
           <td>截止日期</td>
           <td>域</td>
           <td>证书信息</td>
           <!-- <td>编辑</td> -->
         </tr>
         <tr class="tr" v-for="(k,i) in tr">
           <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
           <td>{{ k.name }}</td>
           <td>{{ k.exp_date }}</td>
           <td><div v-for = '(kk,ii) in data[i].listed_domains'>{{ kk }}</div></td>
           <td><div aria-haspopup="true" @click="certfn(k)" class = 'fa fa-key'></div></td>
           <!-- <td><i @click="update(k.name,k.id)" class="fa fa-edit"></i></td> -->
         </tr>
       </table>
     </div>
     <tabelbottom ref="tabelbottom" @trs="trs"></tabelbottom>
     <div class="Opalstack">©2021 Opalstack LLC</div>

    <div id='certshow' v-show='iff'>
      <div class = 'key'></div>
      <div id = 'certtext'  class = 'text'>
        <div class = 'text1'>
          <div @click="guanbi" class = "guanbi">×</div>
          <div class = 'odd'>证书</div>
          <div class = 'even texts1'>{{ text1 }}</div>
          <div class = 'odd'>中级证书</div>
          <div class = 'even texts2'>{{ text2 }}</div>
          <div class = 'odd'>密钥</div>
          <div class = 'even texts3'>{{ text3 }}</div>
          <div class = 'divqd'><button @click="queding" class = "queding">确定</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tabelbottom from "./tablebottom.vue"
  export default {
    data() {
      return {
        globalsearch: search,
        routers:false,
        // shuju:[],
        data: [],
        data: [],
        data1: [],
        tr: [],
        checkcount: 0,
        sousuo: "",
        select: 10,
        iff:false,
        text1:'',
        text2:'',
        text3:'',
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/cert/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.data = data
          if (that.$refs.tabelbottom) {
            that.data1 = that.data
            that.$refs.tabelbottom.parentTR(that.data)
            that.routers = true
          }
        }
      })
    },
    methods: {
      trs(trlist) {
        this.tr = trlist;
        this.initchecked()
      },
      guanbi(){
        this.iff = false
        // var body = document.getElementById('body')
        // body.style.overflowY = 'auto'
      },
      queding(){
        this.iff = false
        // var body = document.getElementById('body')
        // body.style.overflowY = 'auto'
      },
      selectchange() {
        // console.log(this.select)
      },
      initchecked() {
        var checkth = document.getElementById("appcheckth")
        var checktd = document.getElementsByClassName("appchecktd")
        checkth.checked = false
        for (var i = 0; i < checktd.length; i++) {
          checktd[i].checked = false
        }
        this.dellist = []
        this.checkcount = 0
      },
      appcheckth() {
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
            var obj = {
              'id': this.data1[ii].id
            }
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
      appchecktd() {
        this.dellist = []
        var checkth = document.getElementById("appcheckth")
        var checktd = document.getElementsByClassName("appchecktd")
        var count = 0;
        for (var i = 0; i < checktd.length; i++) {
          if (checktd[i].checked) {
            count += 1
            var idd = checktd[i].getAttribute('idd')
            var obj = {
              'id': idd
            }
            this.dellist.push(obj)
          }
        }
        this.checkcount = count;
        checkth.checked = count == this.data1.length ? true : false;
        // console.log(this.dellist)
      },
      del() {
        var dellist = this.dellist
       var fn = function(){
         $.ajax({
           url: URL + "/cert/delete/",
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
      sousuochange() {
        // this.data = this.shuju
        // var checkth = document.getElementById("appcheckth")
        // checkth.checked = false
        // var checktd = document.getElementsByClassName("appchecktd")
        // for (var i = 0; i < checktd.length; i++) {
        //   checktd[i].checked = false
        // }

        var that = this
        this.data1 = this.data.filter(function(k, i) {
          return k.name.indexOf(that.sousuo) != -1
        })
        this.$refs.tabelbottom.parentTR(this.data1)
      },
      add() {
        this.$router.push({
          path: '/certificates-new'
        })
      },
      certfn(k) {
         this.iff = true
         k.cert = k.cert.replace(/\n/g,'<br/>')
         $('.texts1').html( k.cert)
         // this.text1 = k.cert
         k.intermediates = k.intermediates.replace(/\n/g,'<br/>')
         $('.texts2').html( k.intermediates)
         // this.text2 = k.intermediates
         k.key = k.key.replace(/\n/g,'<br/>')
         $('.texts3').html( k.key)
         var div = document.getElementById('certtext')
         var seti = setInterval(function(){
           if(div){
             div.scrollTop = 0
             clearInterval(seti)
           }
         },50)
         // this.text3 = k.key
      },
    },
    components: {
      tabelbottom,
    },
  }
</script>

<style scoped>

  .applications {
    color: #3d4465;
  }
  .applications .tianjia {
    width: 155px;
    height: 40px;
    border-radius: 20px;
    background-color: #fd397a;
  }

  .applications .tianjia::after {
    border-radius: 20px;
  }

  .applications .sousuo {
    width: 180px;
    height: 35px;
    border-radius: 10px;
    font-size: 14px;
    border: 1px #fd397a solid;
  }

  .applications>span {
    display: inline-block;
    height: 70px;
    padding-left: 32px;
    line-height: 70px;
    font-size: 20px;
  }

  .applications .div3 {
    padding: 0px 0px 10px 32px;
  }

  .applications .div3 button {
    padding: 10px 10px;
    border-radius: 20px;
  }

  .applications .div3 .del {
    background-color: #fd397a;
  }

  .applications .div3 button::after {
    border-radius: 20px;
  }

  .global-search {
    min-width: 360px;
  }

  .applications .option {
    width: 60px;
  }

  .fa-edit {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .fa-edit:hover {
    cursor: pointer;
    background-color: #5d78ff;
  }

  tr td:nth-child(1) {
    width: 50px;
  }
  .fa-key{
    padding: 10px 0px;
    font-size: 22px;
    cursor: pointer;
    color: #0062CC;
    width: 50px;
    text-align: center;
  }
  #certshow{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 100;
  }
  .key{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 101;
    background-color:#000;
    opacity: 0.4;
  }
  .text{
    overflow-y: auto;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 102;
    display: flex;
    /* 下面一行兼容IE */
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding: 20px 0px 0px 0px;
  }
  .text1{
    top:0;
    display: inline-block;
    min-width: 500px;
    width: 50%;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    position: relative;
  }
  .odd{
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
  .even{
    background-color: #ececf1;
    padding: 10px;
    word-break:break-all;
  }
  .guanbi{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 35px;
    position: absolute;
    right: 0;
    top: 0;
    color:red;
    cursor: pointer;
    -webkit-user-select: none; /* 不可选择复制*/
    -moz-user-select:none;     /* 不可选择复制*/
    user-select:none;
  }
  .divqd{
    padding-bottom: 20px;
  }
  .queding{
     width: 100%;
     height: 40px;
     margin-top: 10px;
  }
  .texts1,.texts2,.texts3{
     font-family: monospace;
     /* font-family: Courier,Monospace; */
  }
</style>
