<template>
  <div class="applications" v-show='routers'>
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 Add Email Address</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="Search Email Address" />
      </span>
    </div>
    <span>Email Address</span>
    <div class="div3">
      <span>You selected {{ checkcount }} records &nbsp;</span>
      <button class="del" @click="del">Delete Selected</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>Source</td>
          <td>Domain</td>
          <td>Domain	Destinations</td>
          <td>Forwards</td>
          <td>Status</td>
          <td>Edit</td>
        </tr>
        <tr class="tr" v-for="(k,i) in tr">
          <td><input class="appchecktd" :idd="k.id" :data-id='i' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.source }}</td>
          <td>{{ k.domainname }}</td>
          <td>
            <p v-for="(kk,ii) in k.destinations">{{ kk.name }}</p>
          </td>
          <td>
            <p v-for="(kkk,iii) in k.forwards">{{ kkk || "" }}</p>
          </td>
          <td>{{ Status[k.state] }}</td>
          <td><i @click="update(k)" class="fa fa-edit"></i></td>
        </tr>
      </table>
    </div>
    <tabelbottom ref="tabelbottom" @trs="trs"></tabelbottom>
    <div class="Opalstack">©2021 Opalstack LLC</div>
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
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/address/list/?embed=destinations",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // that.data = data
          var data = data
          // console.log(data)
          for (var i = 0; i < data.length; i++) {
            var domain = data[i].source == null || "" || undefined ? "@" : data[i].source
            data[i].domainname = domain.substring(domain.indexOf('@') + 1, domain.length)
          }

          if (that.$refs.tabelbottom) {
            // console.log(data)
            that.data = data
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
            url: URL + "/address/delete/",
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
        // table里面有选择框就初始选择框都没有被选择
        // var checkth = document.getElementById("appcheckth")
        // checkth.checked = false
        // var checktd = document.getElementsByClassName("appchecktd")
        // for (var i = 0; i < checktd.length; i++) {
        //   checktd[i].checked = false
        // }

        var that = this
        that.data1 = this.data.filter(function(k, i) {
          return k.source.indexOf(that.sousuo) != -1
        })
        this.$refs.tabelbottom.parentTR(that.data1)
      },
      add() {
        this.$router.push({
          path: '/en/mail-new'
        })
      },
      update(obj) {
        localStorage.setItem('mail-updata', JSON.stringify(obj))
        this.$router.push({
          path: '/en/mail-update',
          query: {}
        })
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
