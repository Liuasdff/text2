<template>
  <div class='mariauser-new'>
    <span class='span1'>编辑 &nbsp; {{ text1 }}</span>
    <div class='div1'>细节</div>
    <div class='div2'>
      <div class='flex1'>
        <span>外部访问</span>
        <span>
          <switchs id = 'mariausersupdate-switch' ref='switchs'></switchs>
        </span>
      </div>
      <div class='flex1'>
        <span></span>
        <span>外部或仅本地主机可以访问此数据库吗？</span>
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
        text1: '',
        dbsuser: [],
        select1: '',
        css1: 0,
        id: '',
      }
    },
    mounted() {
      var loca = JSON.parse(localStorage.getItem('mariauser-update'))
      this.text1 = loca.name
      this.id = loca.id
    },
    methods: {
      save() {
        var that = this
        var on1 = document.getElementById('mariausersupdate-switch').getElementsByClassName('switchOnoff')[0].innerHTML
        on1 = on1 == 'ON' ? true : false
        var obj = {
          'id': this.id,
          // 'charset':this.select2,
          'external':on1,
        }
        var data = [obj]
        console.log(data)
        $(".add").attr('disabled', true);
        $.ajax({
          url: URL + "/mariauser/update/",
          headers: token,
          data: JSON.stringify(data),
          type: "POST",
          processData: false,
          contentType: "application/json",
          success: function(data) {
            that.$router.push({
              path: '/en/mariausers'
            })
          },
          error: function(xhr, status, text) {
            console.log(xhr)
            alert('添加失败')
            $(".add").attr('disabled', false);
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

  .div2 button,
  .div2 .option {
    width: 100%;
    height: 50px;
  }

  .flex1 {
    display: flex;
    font-size: 18px;
    padding: 20px 0px;
  }

  .flex1>span:nth-child(1) {
    flex: 1;
    text-align: center;
  }

  .flex1>span:nth-child(2) {
    flex: 3;
  }
</style>
