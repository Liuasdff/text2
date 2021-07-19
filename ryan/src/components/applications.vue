<template>
  <div class="applications" v-show='routers'>
    <div class="global-search" :class="{'search':globalsearch ==false}">
      <button class="tianjia" @click="add">十 添加 APP</button>
      <span>
        <input class="sousuo" @input="sousuochange" v-model="sousuo" placeholder="搜索 APP" />
      </span>
    </div>
    <span>APP</span>
    <div class="div3">
      <span>选择了 {{ checkcount }} 条记录 &nbsp;</span>
      <button class="del" @click="del">删除所选</button>
    </div>

    <div class="table">
      <table cellspacing="10" cellpadding="10">
        <tr class="th">
          <!-- <td class='thone'>#</td> -->
          <td><input id="appcheckth" @click="appcheckth()" type="checkbox"></td>
          <td>姓名</td>
          <td>类型</td>
          <td>用户名</td>
          <td>港口</td>
          <td>服务器</td>
          <td>状态</td>
          <td>编辑</td>
        </tr>
        <tr class="tr trr" v-for="(k,i) in tr">
          <!-- <td class="one" ref="one" @click="one($event,'one',i)"><i class="fa fa-caret-right"></i></td> -->
          <!-- <td class="tow" ref="tow" @click="tow($event,'tow',i)"><i class="fa fa-caret-down"></i></td> -->
          <td><input class="appchecktd" :idd='k.id' @click="appchecktd()" type="checkbox"></td>
          <td>{{ k.name }}</td>
          <td class='app_type'>{{ k.htm || types[k.type] }}</td>
          <td>{{ k.osuser_name }}</td>
          <td>{{ k.port }}</td>
          <td>{{ k.server.hostname }}</td>
          <td>{{ chStatus[k.state] }}</td>
          <td><i @click="update(k)" class="fa fa-edit"></i></td>
        </tr>
      </table>
    </div>
    <tabelbottom class='tabelbottom' ref="tabelbottom" @trs="trs"></tabelbottom>
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
        data: [],
        data1: [],
        dellist: [],
        tr: [],
        checkcount: 0,
        sousuo: "",
        // select:10,
        // cus: [
        //   'Python/uWsgi', 'Django', 'Node.js', 'Ghost', 'Ruby on Rails', 'Gitea'
        // ],
        // loadurl: {
        //   'https://raw.githubusercontent.com/opalstack/installers/master/core/uwsgi/install.sh': 0,
        //   'https://raw.githubusercontent.com/opalstack/installers/master/core/django/install.py': 1,
        //   'https://raw.githubusercontent.com/opalstack/installers/master/core/node/install.py': 2,
        //   'https://raw.githubusercontent.com/opalstack/installers/master/core/ghost/install.py': 3,
        //   'https://raw.githubusercontent.com/opalstack/installers/master/core/rails/install.py': 4,
        //   'https://raw.githubusercontent.com/opalstack/installers/master/core/gitea/install.py': 5,
        // },
        types: {
          'APA': 'Apache/PHP-CGI',
          'NPF': 'Nginx/PHP-FPM',
          'SLP': 'Symbolic link, Apache/PHP-CGI',
          'CUS': 'Proxied port',
          'STA': 'Static Only',
          'SLS': 'Symbolic link, Static only',
          'SVN': 'Subversion',
          'DAV': 'WebDAV',
        },

      }
    },
    mounted() {
      var that = this
      ajax1('app', 'server,osuser', that)
    },
    methods: {
      trs(trlist) {
        var that = this
        this.tr = trlist;
        initchecked(that)
      },
      appcheckth() {
        var that = this
        appcheckth(that)
      },
      appchecktd() {
        var that = this
        appchecktd(that)
      },
      del() {
        var that = this
        del1(that, 'app')
      },
      sousuochange() {
        var that = this
        sousuochange(that, 'name')
      },
      add() {
        this.$router.push({
          path: '/applications-new'
        })
      },
      update(k) {
        localStorage.setItem('appupdate', JSON.stringify(k))
        this.$router.push({
          path: '/applications-update',
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

  .one,
  .tow,
  .thone {
    width: 20px;
    padding: 10px 15px;
    font-size: 22px;
    color: #becaf9;
    cursor: pointer;
  }

  .applications {
    min-width: 700px;
  }

  .tow {
    display: none;
  }

  .app_type {
    color: #dd0cf7;
  }
</style>
