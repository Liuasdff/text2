<template>
  <div class="applications" v-show='routers'>
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 添加邮件用户</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="搜索邮件用户" />
      </span>
    </div>
    <span>邮件用户</span>
    <div class="div3">
      <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
      <button class="del" @click="del">删除所选</button>
      <button class="change" @click="changePassword">更改用户密码</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>姓名</td>
          <td>服务器</td>
          <td>Procmail</td>
          <td>自动回复</td>
          <td>回复内容</td>
          <td>状态</td>
          <td>编辑</td>
        </tr>
        <tr class="tr" v-for="(k,i) in tr">
          <td><input class="appchecktd" :idd="k.id" :data-id='i' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td>{{ k.imap_server.hostname }}</td>
          <td>{{ k.procmailrc }}</td>
          <td>{{ k.autoresponder_enable }}</td>
          <td>{{ k.autoresponder_message }}</td>
          <td>{{ chStatus[k.state] }}</td>
          <td><i class="fa fa-edit" @click="update(k)"></i></td>
        </tr>
      </table>
    </div>
    <tabelbottom ref="tabelbottom" @trs="trs"></tabelbottom>
    <div class="Opalstack">©2021 Opalstack LLC</div>
    <changePassword v-if='iff'  @changepassfn='changepassfn'> </changePassword>
  </div>
</template>

<script>
  import tabelbottom from "./tablebottom.vue"
  import changePassword from "./mailusers-changepass.vue"
  export default {
    data() {
      return {
        routers: false,
        globalsearch: search,
        shuju: [],
        data: [],
        data1: [],
        dellist: [],
        tr: [],
        sousuo: "",
        select: 10,
        checkcount: 0,
        iff:false,
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/mailuser/list/?embed=imap_server",
        headers: token,
        type: "GET",
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.data = data
          if (that.$refs.tabelbottom) {
            // that.data = data1
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
      changePassword() {
        if (this.dellist.length < 1) {
          alert1("请最少选择一项")
        } else {
          localStorage.setItem('mailusers-changePassword', JSON.stringify(this.dellist))
          this.iff = true
        }
      },
      changepassfn() {
        this.iff = false
      },
      selectchange() {

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
              'id': this.data1[ii].id,
              'obj':this.data1[ii],
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
              'id': idd,
              'obj':this.tr[i],
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
           url: URL + "/mailuser/delete/",
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
        // table里面有选择框就初始选择框都没有被选择
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
          path: '/mailusers-new'
        })
      },
      update(obj) {
        localStorage.setItem('mai-update',JSON.stringify(obj))
        this.$router.push({path: '/mailusers-update'})
        // 使用name就要用params,使用path就要用query传递参数
        // this.$router.push({name:'/mailusers-update',params: { userId: 123 }})
      },
    },
    components: {
      tabelbottom,
      changePassword,
    },
  }
</script>

<style scoped>
  .applications {
    color: #3d4465;
  }

  .global-search {
    min-width: 330px;
  }

  .applications .tianjia {
    min-width: 105px;
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

  .tablebottomdv {
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

  .tablebottom {
    display: inline-block;
    margin: auto;
    -webkit-user-select: none;
    /* 不可选择复制*/
    -moz-user-select: none;
    /* 不可选择复制*/
    user-select: none;
  }

  .tablebottom span {
    /* vertical-align: top; */
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 5px;
  }

  .blues:hover {
    background-color: #5d78ff;
  }

  .number {
    display: inline-block;
    height: 30px;
  }

  ..number span {
    /* vertical-align: middle; */
    font-size: 18px;
  }

  .dian {
    position: relative;
  }

  .blue {
    background-color: #5d78ff;
  }

  .tablebottom .option {
    cursor: pointer;
    width: 110px;
    height: 30px;
  }

  .tablebottom .xianshi {
    width: auto;
  }
</style>
