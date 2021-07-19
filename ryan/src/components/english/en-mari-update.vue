<template>
  <div class = 'applications' v-show="routers">
    <span class='span1'>编辑 &nbsp; {{ text1 }}</span>
    <div  class='div1'> 选择哪些用户可以读写你的数据库</div>
    <div class="div3">
      <span>选择了 {{ checkcount }} 个用户 &nbsp;</span>
      <button class="del" @click="del">保存所选</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="110">
        <tr class="th">
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>用户</td>
        </tr>
        <tr class="tr" v-for="(k,i) in tr">
          <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
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
        globalsearch: search,
        routers: false,
        // shuju:[],
        data: [],
        data: [],
        data1: [],
        tr: [],
        checkcount: 0,
        sousuo: "",
        select: 10,

        text1:'',
        // tr:[],
        // select1:'',
        // css1:0,
        id:'',
      }
    },
    mounted() {
     var loca = JSON.parse(localStorage.getItem('mariadbs-update'))
     this.text1 = loca.name
     this.id = loca.id
     var that = this
      $.ajax({
        url: URL + "/mariauser/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        async: true, // 异步
        contentType: "application/json",
        success: function(data2) {
          // console.log(data2)
          that.data = data2
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
        var dbusers_readwrite = []
        if (checkth) {
          for (var i = 0; i < checktd.length; i++) {
            checktd[i].checked = true
          }
          for (var ii = 0; ii < this.data1.length; ii++) {
            dbusers_readwrite.push(this.data1[ii].id)
          }
          this.dellist = [{'id':this.id,'dbusers_readwrite':dbusers_readwrite}]
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
        var dbusers_readwrite = []
        var checkth = document.getElementById("appcheckth")
        var checktd = document.getElementsByClassName("appchecktd")
        var count = 0;
        for (var i = 0; i < checktd.length; i++) {
          if (checktd[i].checked) {
            count += 1
            var idd = checktd[i].getAttribute('idd')
             dbusers_readwrite.push(idd)
          }
        }
        this.dellist = [{'id':this.id,'dbusers_readwrite':dbusers_readwrite}]
        this.checkcount = count;
        checkth.checked = count == this.data1.length ? true : false;
        // console.log(this.dellist)
      },

      sousuochange() {
        var that = this
        this.data1 = this.data.filter(function(k, i) {
          return k.name.indexOf(that.sousuo) != -1
        })
        this.$refs.tabelbottom.parentTR(this.data1)
      },
      del() {
        var that = this
        var dellist = this.dellist
        // console.log(dellist)
        if (dellist.length < 1) {
          alert("请最少选择一项")
        } else {
          if (window.confirm("确定保存所选用户吗码？")) {
            $(".del").attr('disabled', true);
            $.ajax({
              url: URL + "/mariadb/update/",
              headers: token,
              data: JSON.stringify(dellist),
              type: "POST",
              processData: false,
              contentType: "application/json",
              success: function(data) {
                var data = JSON.stringify(data)
                // alert("保存成功")
                that.$router.push({path: '/en/mariadbs'})
              },
              error: function(xhr, status, text) {
                console.log(xhr)
                alert("保存失败")
                $(".del").attr('disabled', false);
              },
            })
          } else {}
        }
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
  .div1{
    margin-bottom: 15px;
    font-size: 18px;
  }
</style>
