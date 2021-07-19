<template>
  <div class='mariauser-new'>
    <span class='span1'>新的 PostgreSQL 用户</span>
    <div class='div1'>细节</div>
    <div class='div2'>
      <div class='div2-1'>
        <!-- <span @click="css1 = 1" :class='{"css1":css1 == 1}'>玛利亚数据库</span> -->
        <span @click="css1 = 2" :class='{"css1":css1 == 3}'>PostgreSQL 用户</span>
      </div>
      <div class='div2-2' v-show="css1 == 1">
        <div class='div2-2-1'>MariaDB是MySQL兼容的数据库，具有许多增强功能。它由MySQL的原始开发人员制作，并保证保持开源。</div>
        <div>名称</div>
        <div class='dv2'><input v-model="input1"></div>
        <div class='dv3'>用于请求PostgreSQL数据库的名称，以及分配用于访问该数据库的用户。</div>
        <div> 服务器</div>
        <div class='dv2'>
          <span class="option">
            <select class = 'select1' autocomplete="off" v-model="select1">
              <option v-for="k in servers" :key='k.id' :value="k.id">&nbsp; {{ k.hostname }}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
        </div>
        <div class='dv3'>选择一个服务器</div>

      <!-- <div>字符集</div>
        <div class='dv2'>
          <span class="option">
            <select autocomplete="off" v-model="select2">
              <option v-for="(k,i) in charset" :value="k">&nbsp; {{ k }}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
        </div>
        <div class='dv3'>您的MariaDB数据库的字符集。</div> -->
        <div class='flex1'>
          <span>外部访问</span>
          <span>
            <switchs id = 'psqlusersnew-switch' ref='switchs'></switchs>
          </span>
        </div>
        <div class='flex1'>
          <span></span>
          <span>外部或仅本地主机可以访问此数据库吗？</span>
        </div>

      </div>

      <div class='btndiv'><button class='add' @click="save">保存</button></div>
    </div>
    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  import switchs from '@/components/myComponents/switch.vue'
  export default {
    data() {
      return {
        css1: 1,
        servers: [],
        charset:['utf8'],
        show1:1,
        input1:'',
        select1:'',
        select2:'utf8',
      }
    },
    mounted() {
      var that = this
       $.ajax({
         url: URL + "/server/list/",
         headers: token,
         type: "GET",
         // data:JSON.stringify(data),
         processData: false,
         async: true, // 异步
         contentType: "application/json",
         success: function(data2) {
           // console.log(data2)
           that.servers = data2.web_servers
           that.select1 = that.servers[0].id
         }
       })
    },
    methods: {
      save() {
         var that =this
         var on1 = document.getElementById('psqlusersnew-switch').getElementsByClassName('switchOnoff')[0].innerHTML
         on1 = on1 == 'ON' ? true : false
         var obj = {
           'name':this.input1,
           'server':this.select1,
           // 'charset':this.select2,
           'external':on1,
           // 'dbusers_readwrite':'',
           // 'dbusers_readonly':'',
         }
         var data = [obj]
         console.log(data)
         $(".add").attr('disabled',true);
         $.ajax({
            url:URL + "/psqluser/create/",
            headers:token,
            data:JSON.stringify(data),
            type: "POST",
         	  processData: false,
            contentType: "application/json",
         	  success: function(data){
              that.$router.push({path:'/en/psqlusers'})
            },
            error: function(xhr, status, text) {
              console.log(xhr)
              alert('添加失败')
              $(".add").attr('disabled',false);
            },

         })

      },
    },
    components: {
      switchs,
    },
  }
</script>

<style scoped>
  .mariauser-new {
    /* padding-bottom: 40px; */
  }

  .span1 {
    padding: 25px 0px;
    display: inline-block;
    font-size: 22px;
  }

  .div1 {
    padding: 20px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ECECF1;
    font-size: 20px;
  }

  .div2 {
    padding: 0px 20px 10px 20px;
    background-color: #fff;
  }

  .div2-1 {
    display: flex;
  }

  .div2-1>span {
    flex: 1;
    text-align: center;
    padding: 20px 0px;
    display: inline-block;
    cursor: pointer;
    font-size: 18px;
    -webkit-user-select: none;
    /* 不可选择复制*/
    -moz-user-select: none;
    /* 不可选择复制*/
    user-select: none;
  }

  .css1 {
    color: #0062CC;
    border-bottom: 2px solid #0062CC;
  }

  .div2 .option,
  .div2 input {
    width: 100%;
    height: 40px;
    font-size: 16px;
  }

  .div2-2-1 {
    padding: 30px;
    border: 2px solid #ACACB4;
    margin: 30px 0px;
    border-radius: 5px;
  }

  .dv2 {
    margin: 5px 0px;
  }

  .dv3 {
    margin-bottom: 20px;
  }

  .flex1 {
    display: flex;
    font-size: 18px;
    margin-top: 10px;
  }

  .flex1>span:nth-child(1) {
    flex: 1;
    text-align: center;
  }

  .flex1>span:nth-child(2) {
    flex: 3;
  }

  .btndiv {
    margin: 20px 0px;
  }

  .div2 button {
    width: 100%;
    height: 50px;
  }
</style>
