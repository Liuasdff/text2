<template>
  <div class="users" v-show="routers">
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 Add Shell User</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="users" placeholder="Search Users" />
      </span>
    </div>
    <span>Shell Users</span>
    <div class="div3">
      <span>You selected {{ checkcount }} records &nbsp;</span>
      <button class="del" @click="del">Delete Selected</button>
      <button class="change" @click="changePassword">Change Users Passwords</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>Username</td>
          <td>Server</td>
          <td>Status</td>
        </tr>
        <tr class="tr" v-for="(k,i) in tr">
          <td><input class="userschecktd appchecktd" :idd='k.id' :mykey='JSON.stringify(k)' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td>{{ k.server.hostname }}</td>
          <td>{{ Status[k.state] }}</td>
        </tr>
      </table>
      <tabelbottom ref="tabelbottom" @trs="trs"></tabelbottom>
    </div>
    <div class="Opalstack">©2021 Opalstack LLC</div>
    <changePassword @changepassfn='changepassfn' v-if='iff'></changePassword>
  </div>
</template>

<script>
  import tabelbottom from "./en-tablebottom.vue"
  import changePassword from "./en-users-changePassword.vue"
  export default {
    data() {
      return {
        routers: false,
        globalsearch: search,
        // users:'aa',
        shuju: [],
        tr: [],
        checkcount: 0,
        users: '',
        data: [],
        data1: [],
        dellist: [],
        iff: false,
      }
    },
    inject: ["name", "opalstack"], // 获取home祖路由provide里面的属性
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/osuser/list/?embed=server",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          // that.data = data.users
          that.data = data
          if (that.$refs.tabelbottom) {
            that.data1 = that.data
            that.$refs.tabelbottom.parentTR(that.data)
            that.routers = true
          }
        },
        error: function(xhr, status, text) {
          console.log(xhr)
          var a = ''
          for (var k in xhr.responseJSON) {
            a = a + k + " " + xhr.responseJSON[k]
          }
          // myalert(a)
          // $(".add").attr('disabled',false);
        },

      })
    },
    methods: {
      trs(trlist) {
        this.tr = trlist;
        this.initchecked()
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
              'mykey': this.data1[ii]
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
            var mykey = JSON.parse(checktd[i].getAttribute('mykey'))
            // console.log(mykey)
            var obj = {
              'id': idd,
              'mykey': mykey
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
            url: URL + "/osuser/delete/",
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
      changepassfn() {
        this.iff = false
      },
      changePassword() {
        var changelist = []
        // console.log(this.dellist)
        for (var i = 0; i < this.dellist.length; i++) {
          changelist.push(this.dellist[i])
        }
        // console.log(changelist)
        if (changelist.length < 1) {
          alert2("Select at least one")
        } else {
          localStorage.setItem('changePassword', JSON.stringify(changelist))
          this.iff = true
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
        var text = that.users
        text = that.users == that.name ? "" : that.users
        that.data1 = this.data.filter(function(k, i) {
          return k.name.indexOf(text) != -1
        })
        this.$refs.tabelbottom.parentTR(that.data1)
      },
      add() {
        this.$router.push({
          path: '/en/users-new'
        })
      },
    },
    components: {
      tabelbottom,
      changePassword,
    },
  }
</script>

<style scoped>
  .users {
    color: #3d4465;
  }

  .users .tianjia {
    width: 155px;
    height: 40px;
    border-radius: 20px;
    background-color: #fd397a;
  }

  .users .tianjia::after {
    border-radius: 20px;
  }

  .users .sousuo {
    width: 180px;
    height: 35px;
    border-radius: 10px;
    font-size: 14px;
    border: 1px #fd397a solid;
  }

  .users>span {
    display: inline-block;
    height: 70px;
    padding-left: 32px;
    line-height: 70px;
    font-size: 20px;
  }

  .users .div3 {
    padding: 0px 0px 10px 32px;
  }

  .users .div3 button {
    padding: 10px 10px;
    border-radius: 20px;
  }

  .users .div3 .del {
    background-color: #fd397a;
  }

  .users .div3 .geng {
    background-color: #9816f4;
  }

  .users .div3 button::after {
    border-radius: 20px;
  }

  .global-search {
    min-width: 360px;
  }

  .users .tdi {
    width: 50px;
  }

  .users .option {
    width: 60px;
  }

  tr td:nth-child(1) {
    width: 50px;
  }
</style>
