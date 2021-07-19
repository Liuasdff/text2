a<template>
  <div class="applications" v-show="routers">
    <span>用法</span>
    <div>
      
    </div>
    <div>
      
    </div>

    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  import tabelbottom from "./en-tablebottom.vue"
  
  export default {
    data() {
      return {
        routers: true,
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/cert/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          console.log(data)
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
  .applications>span {
    display: inline-block;
    height: 70px;
    padding-left: 32px;
    line-height: 70px;
    font-size: 20px;
  }


</style>
