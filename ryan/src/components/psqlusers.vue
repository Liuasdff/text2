a<template>
  <div class="applications" v-show="routers">
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 添加Postgres用户</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="搜索Postgres用户" />
      </span>
    </div>
    <span>Postgres用户</span>
    <div class="div3">
      <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
      <button class="del" @click="del">删除所选</button>
      <button class="change" @click="changePassword">更改用户密码</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>名称</td>
          <td>服务器</td>
          <td>状态</td>
          <td>编辑</td>
        </tr>
        <tr class="tr" v-for="(k,i) in tr">
          <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td>{{ k.server.hostname }}</td>
          <td>{{ chStatus[k.state] }}</td>
          <td><i @click="update(k)" class="fa fa-edit"></i></td>
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
  import changePassword from "./psqlusers-changepass.vue"
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
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/psqluser/list/?embed=server",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        async: true, // 异步
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
           url: URL + "/psqluser/delete/",
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
        var that = this
        this.data1 = this.data.filter(function(k, i) {
          return k.name.indexOf(that.sousuo) != -1
        })
        this.$refs.tabelbottom.parentTR(this.data1)
      },
      add() {
        this.$router.push({
          path: '/psqlusers-new'
        })
      },
      update(k) {
        localStorage.setItem('psqlusers-update',JSON.stringify(k))
        this.$router.push({
          path: '/psqlusers-update',
          query: {}
        })
        // 使用name就要用params,使用path就要用query传递参数
        // this.$router.push({name:'/mailusers-update',params: { userId: 123 }})
      },
      changePassword() {
        if (this.dellist.length < 1) {
          alert1("请最少选择一项")
        } else {
          localStorage.setItem('psqlusers-changePassword', JSON.stringify(this.dellist))
          this.iff = true
        }
      },
      changepassfn() {
        this.iff = false
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

  .applications .tianjia {
    width: 185px;
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
    min-width: 390px;
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
</style>
