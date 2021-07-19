<template>
  <div class='mariauser-new'>
    <span class='span1'>Edit &nbsp; {{ text1 }}</span>
    <div class='div1'>Details</div>
    <div class='div2'>
      <div class='flex1'>
        <span>External Access</span>
        <span>
          <switchs id = 'psqlusersupdate-switch' ref='switchs'></switchs>
        </span>
      </div>
      <div class='flex1'>
        <span></span>
        <span>Can this database be accessed by the outside world or only localhost?.</span>
      </div>
      <div class = "btn">
        <button class = 'add' @click="add">Save</button>
        <button class = 'quxiao' @click="quxiao">Cancel</button>
      </div>
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
      var loca = JSON.parse(localStorage.getItem('psqlusers-update'))
      this.text1 = loca.name
      this.id = loca.id
      if(loca.external == true){
        this.$refs.switchs.ON()
      } 
    },
    methods: {
      quxiao(){
        this.$router.push({path:'/en/psqlusers'})
      },
      add() {
        var that = this
        var on1 = document.getElementById('psqlusersupdate-switch').getElementsByClassName('switchOnoff')[0].innerHTML
        on1 = on1 == 'ON' ? true : false
        var obj = {
          'id': this.id,
          // 'charset':this.select2,
          'external':on1,
        }
        var data = [obj]
        // console.log(data)
        $(".add").attr('disabled', true);
        $.ajax({
          url: URL + "/psqluser/update/",
          headers: token,
          data: JSON.stringify(data),
          type: "POST",
          processData: false,
          contentType: "application/json",
          success: function(data) {
            that.$router.push({
              path: '/en/psqlusers'
            })
          },
          error: function(xhr, status, text) {
           alert2(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
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
