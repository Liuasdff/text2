<template>
  <div>
    <div id="box1">111111</div>
    <div id="bb">111111</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      window.onload = function() {
        var box1 = document.getElementById("box1");
        // 去除谷歌浏览器对阻止touch事件默认行为的警告提示的兼容代码
        var passiveSupported = false;
        try {
          var options = Object.defineProperty({}, "passive", {
            get: function() {
              passiveSupported = true;
            }
          });
          window.addEventListener("test", null, options);
        } catch (err) {}

        var fn = function(event) {
          var box1 = document.getElementById("box1");
          // alert(box1.style.height);
          // box1.onmousewheel = function(event) {
          event = event || window.event; /*||为或语句，当IE不能识别event时候，就执行window.event 赋值*/
          console.log(event.detail); //火狐

          if (event.wheelDelta > 0 || event.detail < 0) { /*可通过控制台查看，第一个针对谷歌，第二个针对火狐*/
            // console.log(event.wheelDelta);/*控制台测试代码*/
            /*每向上滑动则图形缩短*/
            box1.style.height = box1.clientHeight - 10 + "px";
          } else {
            /*向下滑动则加长*/
            box1.style.height = box1.clientHeight + 10 + "px";
          }
          // event.preventDefault && event.preventDefault();
          return false;
          // };
        }
        document.addEventListener("mousewheel", fn, passiveSupported ? {
          passive: true
        } : false)

        /*为火狐绑定滚动事件*/
        function bind(obj, eventStr, callback) {
          obj.addEventListener(eventStr, callback, false);
        }
        bind(box1, "DOMMouseScroll", fn);
      }
    },
    methods: {

    },
    components: {

    },
  }
</script>

<style scoped>
  #box1 {
    width: 100px;
    height: 80px;
    background-color: magenta;
  }
</style>
