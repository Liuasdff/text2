a<template>
  <div class="applications" v-show="routers">
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 添加Postgres数据库</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="搜索Postgres数据库" />
      </span>
    </div>
    <span>Postgres数据库</span>
    <div class="div3">
      <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
      <button class="del" @click="del">删除所选</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td class='thone'>#</td>
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>名称</td>
          <td>服务器</td>
          <td>字符集</td>
          <td>状态</td>
           <!-- <td></td> -->
          <td>编辑</td>
        </tr>
        <tr class="tr trr" v-for="(k,i) in tr">
          <td class="one" ref="one" @click="one($event,'one',i)"><i class="fa fa-caret-right"></i></td>
          <td class="tow" ref="tow" @click="tow($event,'tow',i)"><i class="fa fa-caret-down"></i></td>
          <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td>{{ k.server.hostname }}</td>
          <td>{{ k.charset }}</td>
          <td>{{ chStatus[k.state] }}</td>
          <!-- <td><i @click="adm(k)" class="fa fa-user-circle-o"></i></td> -->
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
        globalsearch: search,
        routers:false,
        // shuju:[],
        data: [],
        data1: [],
        tr: [],
        checkcount: 0,
        sousuo: "",
        select: 10,
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/psqldb/list/?embed=server,dbusers_readwrite,dbusers_readonly",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        async: true,
        success: function(data) {
          that.data = data
          // console.log(data)
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
           url: URL + "/psqldb/delete/",
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
          path: '/psqldbs-new'
        })
      },
      adm(k) {
        // localStorage.setItem('mari-update',JSON.stringify(k))
        this.$router.push({path: '/psqldbs-adm',query:{}})
        // 使用name就要用params,使用path就要用query传递参数
        // this.$router.push({name:'/mailusers-update',params: { userId: 123 }})
      },
      update(k) {
        localStorage.setItem('psqldbs-update',JSON.stringify(k))
        this.$router.push({
          path: '/psqldbs-update',
          query: {}
        })
        // 使用name就要用params,使用path就要用query传递参数
        // this.$router.push({name:'/mailusers-update',params: { userId: 123 }})
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
        td.html('名称')
        var td = $('<td></td>')
        tr.append(td)
        td.html('用户')
        // var td = $('<td></td>')
        // tr.append(td)
        // td.html('URI')

        var tr = $('<tr class = "td"></tr>')
        table.append(tr)
        tr.addClass("table2tr")
        tr.css({
          'border': '2px solid darkgrey',
        })
        var td = $('<td></td>')
        tr.append(td)
        td.html('读写用户')
        var td = $('<td></td>')
        for(var j = 0;j<this.tr[i].dbusers_readwrite.length;j++){
          var div = $('<div></div>')
          div.html(this.tr[i].dbusers_readwrite[j].name)
          td.append(div)
        }
        tr.append(td)

        var tr = $('<tr class = "td"></tr>')
        table.append(tr)
        tr.addClass("table2tr")
        tr.css({
          'border': '2px solid darkgrey',
        })
        var td = $('<td></td>')
        tr.append(td)
        td.html('只读用户')
        var td = $('<td></td>')
        for(var j = 0;j<this.tr[i].dbusers_readonly.length;j++){
          var div = $('<div></div>')
          div.html(this.tr[i].dbusers_readonly[j].name)
          td.append(div)
        }
        tr.append(td)


        // for(var j =0;j<this.tr[i].dbusers_readwrite.length;j++){
        //   var tr = $('<tr class = "td"></tr>')
        //   table.append(tr)
        //   tr.css({
        //     'border': '2px solid darkgrey',
        //   })
        //   var td = $('<td></td>')
        //   tr.append(td)
        //   td.html(this.tr[i].dbusers_readwrite[j])
        //   var td = $('<td></td>')
        //   tr.append(td)
        //   td.html(this.tr[i].routes[j].app_server_name)
        //   var td = $('<td></td>')
        //   tr.append(td)
        //   td.html(this.tr[i].routes[j].uri)
        // }

      },
      tow(e, t, i) {
        this.$refs[t][i].style.display = 'none'
        this.$refs['one'][i].style.display = "block"
        $(".trr:eq(" + i + ")").next('.table2').remove()
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
  .fa-user-circle-o{
    display: inline-block;
    height: 30px;
    width: 30px;
    line-height: 30px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    color: #0062CC;
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
