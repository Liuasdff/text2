<template>
  <div class="applications" v-show="routers">
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 添加网站</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="搜索网站" />
      </span>
    </div>
    <span>网站路线</span>
    <div class="div3">
      <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
      <button class="del" @click="del">删除所选</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td class='thone'>#</td>
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>姓名</td>
          <td>服务器</td>
          <td>IP地址</td>
          <td>域</td>
          <td>状态</td>
          <td>编辑</td>
        </tr>
        <tr class="tr trr" v-for="(k,i) in tr">
          <td class="one" ref="one" @click="one($event,'one',i)"><i class="fa fa-caret-right"></i></td>
          <td class="tow" ref="tow" @click="tow($event,'tow',i)"><i class="fa fa-caret-down"></i></td>
          <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td>{{ k.server.hostname }}</td>
          <td>{{ k.ip.ip}}</td>
          <td>
            <div v-for='(k,i) in k.domains'>{{ k.name }}</div>
          </td>
          <td>{{ chStatus[k.state] }}</td>
          <td><i @click="update(k)" class="fa fa-edit"></i></td>
        </tr>
      </table>
    </div>
    <tabelbottom ref="tabelbottom" @trs="trs"></tabelbottom>
    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  import tabelbottom from "./tablebottom.vue"
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
        url: URL + "/site/list/?embed=app,server,ip4,ip6,domains,osuser,cert",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          that.data = data
          for(var i=0;i<that.data.length;i++){
            if(that.data[i].ip4==null || that.data[i].ip4==undefined ||that.data[i].ip4==''){
              that.data[i].ip = that.data[i].ip6
            }else{
              that.data[i].ip = that.data[i].ip4
            }
          }
          if (that.$refs.tabelbottom) {
            // console.log(that.data)
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
      one(e, t, i) {
        var one = this.$refs['one']
        var tow = this.$refs['tow']
        one[i].style.display = 'none'
        tow[i].style.display = "block"

        var trr = $('.trr').eq(i)
        var trrtr = $('<tr class = "table2"></tr>')
        trrtr.css({
          'width': '100%',
        })
        trr.after(trrtr)
        var td = $('<td colspan = "6"></td>')
        trrtr.append(td)
        td.css({
          'padding': '30px',
        })
        var table = $('<table></table>')
        td.append(table)
        table.css({
          'width': '100%',
          'box-shadow': 'darkgrey 3px 3px 9px 3px'
        })

        var tr = $('<tr></tr>')
        table.append(tr)
        tr.addClass("table2tr")
        tr.css({
          'border': '2px solid darkgrey',
        })
        var td = $('<td></td>')
        tr.append(td)
        td.html('User')
        var td = $('<td></td>')
        tr.append(td)
        td.html('App')
        var td = $('<td></td>')
        tr.append(td)
        td.html('URI')

        for (var j = 0; j < this.tr[i].routes.length; j++) {
          var tr = $('<tr class = "td"></tr>')
          table.append(tr)
          tr.css({
            'border': '2px solid darkgrey',
          })
          var td = $('<td></td>')
          tr.append(td)
          td.html(this.tr[i].routes[j].app.osuser.name)
          var td = $('<td></td>')
          tr.append(td)
          td.html(this.tr[i].routes[j].app.name)
          var td = $('<td></td>')
          tr.append(td)
          td.html(this.tr[i].routes[j].uri)
        }

      },
      tow(e, t, i) {
        this.$refs[t][i].style.display = 'none'
        this.$refs['one'][i].style.display = "block"
        $(".trr:eq(" + i + ")").next('.table2').remove()
      },
      del() {
        var dellist = this.dellist
        var fn = function(){
          $.ajax({
            url: URL + "/site/delete/",
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
          path: '/routes-new'
        })
      },
      update(obj) {
        localStorage.setItem('rouupdate', JSON.stringify(obj))
        this.$router.push({
          path: '/routes-update'
        })
        // this.$router.push({path:'/rou-update',query: { id: id,name:name }})
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
    width: 135px;
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

  .one,
  .tow,
  .thone {
    width: 20px;
    padding: 10px 15px;
    font-size: 22px;
    color: #becaf9;
    cursor: pointer;
  }

  .tow {
    display: none;
  }
</style>
