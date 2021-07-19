<template>
  <div class="applications" v-show='routers'>
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 Add Domains & Subdomains</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="Search Domains" />
      </span>
    </div>
    <span>Domains</span>
    <div class="div3">
      <span>You selected {{ checkcount }} records &nbsp;</span>
      <button class="del" @click="del">Delete Selected</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>Name</td>
          <td>Status</td>
          <!-- <td>编辑</td> -->
          <td>DKIM Record</td>
        </tr>
        <tr class="tr" v-for="(k,i) in tr">
          <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td>{{ Status[k.state] }}</td>
          <!-- <td><i @click="update(k.name,k.id)" class="fa fa-edit"></i></td> -->
          <td><div @click="certfn(k)" class = 'fa fa-key'></div></td>
        </tr>
      </table>
    </div>
    <tabelbottom ref="tabelbottom" @trs="trs"></tabelbottom>
    <div class="Opalstack">©2021 Opalstack LLC</div>
    <div  v-show='iff'>
      <div class = 'key'></div>
      <div class = 'text'>
        <div class = 'text1'>
          <div @click="guanbi" class = "guanbi">×</div>
          <div class = 'odd'>dkim._domainkey. {{ upname }}</div>
          <div class = 'even texts1'></div>
          <div><button @click="queding" class = "queding">OK</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tabelbottom from "./en-tablebottom.vue"
  export default {
    data() {
      return {
        routers: false,
        globalsearch: search,
        // shuju:[],
        data: [],
        data1: [],
        dellist: [],
        tr: [],
        checkcount: 0,
        sousuo: "",
        select: 10,
        iff:false,
        upname:'',
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/domain/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.data = data
          // var data1 = data.domains
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
      selectchange() {
        // console.log(this.select)
      },
      certfn(k) {
         this.iff = true
         this.dkim = k.dkim_record
         this.upname = k.name
         $('.texts1').html( this.dkim)
         // myevtset.scrollTop(0)
      },
      guanbi(){
        this.iff = false
      },
      queding(){
        this.iff = false
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
           url: URL + "/domain/delete/",
           headers: token,
           data: JSON.stringify(dellist),
           type: "POST",
           processData: false,
           contentType: "application/json",
           success: function(data) {
             location.reload()
           },
           error: function(xhr, status, text) {
             alert2("Deletion failed")
           },
         })
       }
       if (dellist.length < 1) {
         alert2("Select at least one")
       } else {
         // console.log(dellist)
         var text2 = 'Are you sure to delete ' +  dellist.length + ' items?'
         confirm2('Delete',text2,fn)
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
        that.data1 = this.data.filter(function(k, i) {
          return k.name.indexOf(that.sousuo) != -1
        })
        this.$refs.tabelbottom.parentTR(that.data1)
      },
      add() {
        this.$router.push({
          path: '/en/domains-new'
        })
      },
      update(name, id) {
        var text = '暂时为空'
        myalert(text)
        // this.$router.push({path:'/en/mail-update',query: { id: id,name:name }})
        // 使用name就要用params,使用path就要用query传递参数
        // this.$router.push({name:'/mailusers-update',params: { userId: 123 }})
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
    width: 220px;
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
    min-width: 430px;
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
  .key{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 999;
    background-color:#000;
    opacity: 0.4;
  }
  .text{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 9999;
    display: flex;
    /* 下面一行兼容IE */
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding-top: 20px;
  }
  .text1{
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
    overflow: hidden;
  }
  .even{
    background-color: #ececf1;
    padding: 30px 10px;
    word-break:break-all;
    font-family: monospace;
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
  .queding{
     width: 100%;
     height: 40px;
     margin-top: 10px;
  }
</style>
