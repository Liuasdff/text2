<template>
  <div class="rounew">
    <div class="">
      <div>
        <div class="top">新网站路线</div>
        <div class="div2">
          <div>
            <span><span class="sleft">姓名</span></span>
            <span><input v-model="input1" placeholder=""></span>
            <span></span>
          </div>
         <!-- <div>
            <span><span class="sleft">服务器</span></span>
            <span class="option">
              <select v-model="select1" autocomplete="off">
                <option v-for="(k,i) in servers" :value="k.hostname"> &nbsp; {{ k.hostname }} </option>
              </select>
              <div>
                <div class="optiondiv fa fa-angle-down"></div>
              </div>
            </span>
            <span></span>
          </div> -->
          <div>
            <span><span class="sleft">服务器IP</span></span>
            <span class="option">
              <select v-model="select2" class='rounewselect2'  autocomplete="off">
                <option :idd = 'k.id' v-for="(k,i) in ips" :value="k.ip"> &nbsp; {{ k.ip }} </option>
              </select>
              <div>
                <div class="optiondiv fa fa-angle-down"></div>
              </div>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft">证书</span></span>
            <span class="option">
              <select @change="certchange()" v-model="select3" id='certoption3' autocomplete="off">
                <option  v-for="(k,i) in cert" :idd = 'k.id' :value="k.id" :key = 'k.id'> &nbsp; {{ k.name }} </option>
              </select>
              <div>
                <div class="optiondiv fa fa-angle-down"></div>
              </div>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft">让我们加密证书</span></span>
            <span class="swspan">
              <switchs @backfn='jiami' ref='switch1' :height="'40px'" :width="'80px'"></switchs>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft"></span></span>
            <span>您是否希望我们管理此站点的证书生成和颁发？可以在我们的文档中找到更多信息。</span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft">重定向到HTTPS</span></span>
            <span class="swspan">
              <switchs  ref='switch2' :class='cssswitch2' :height="'40px'" :width="'80px'"></switchs>
            </span>
            <span></span>
          </div>
          <div>
            <span><span class="sleft"></span></span>
            <span>将该站点的所有HTTP通信重定向到HTTPS？</span>
            <span></span>
          </div>
        </div>

        <div class="div3">应用程序路由信息</div>

        <div class="kelong">
          <div class="kelongdiv">
            <div>
              <span>
                <span class="option">
                  <select  v-model="select4" class='rounewselect4' autocomplete="off">
                    <option class='rounewoption4' :idd='k.id' v-for="k in appdata" :value="k.id" :key='k.id'> &nbsp; {{ k.name }} ({{ k.osuser.name }}@{{ k.server.hostname }})
                    </option>
                  </select>
                  <div>
                    <div class="optiondiv fa fa-angle-down"></div>
                  </div>
                </span>
              </span>
              <span><input v-model="input2" class='rounewinput2' placeholder=""></span>
              <span class="kelongdel"></span>
            </div>
            <div class="klbottom">
              <span>选择一个应用程序。</span>
              <span>键入将向其提供应用程序的URI端点。</span>
              <span></span>
            </div>
          </div>
        </div>
        <div>
          <div>
            <button class="klbtn" @click="addone"><i>十</i>添加路线</button>
          </div>
          <div class="yuxinxi">
            <span>域信息</span>
          </div>
        </div>

        <div class="klwang">
          <div class="klwangdiv">
            <div>
              <span class="option">
                <select class='rounewselect5' v-model="select5" autocomplete="off">
                  <option class='rounewoption5' v-for="k in doudata" :idd='k.id' :value="k.name" :key='k.id'> &nbsp; {{ k.name }} </option>
                </select>
                <div>
                  <div class="optiondiv fa fa-angle-down"></div>
                </div>
              </span>
              <span class="del klwangdel"></span>
            </div>
            <div>选择一个域。如果该域不在列表中，则它可能在另一个站点路由上。首先从另一个站点中删除域。</div>
          </div>
        </div>
        <div class="wangbtn">
          <button @click="addtow"><i>十</i>新增网域</button>
        </div>
        <!-- </div> -->

        <div class = "btn">
          <button class = 'add' @click="add">添加网站详情</button>
          <button class = 'quxiao' @click="quxiao">取消</button>
        </div>

      </div>
    </div>

    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  import switchs from './myComponents/switch.vue'
  export default {
    data() {
      return {
        cssswitch2:'cssswitch2',
        certonoff:'OFF',
        appdata: "",
        doudata: '',
        ips: [],
        servers: [],
        cert: [],
        input1: '',
        input2: '/',
        select1: '',
        select2: '',
        select3: '',
        select4: '',
        select5: '',
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/app/list/?embed=server,osuser",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          var arrs = []
          for(var ii = 0;ii<data.length;ii++){
            if(data[ii].ready == true){
              arrs.push(data[ii])
            }
          }
          that.appdata = arrs
          that.select4 = arrs[0].id
        }
      })

      $.ajax({
        url: URL + "/domain/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          var arrs = []
          for(var ii = 0;ii<data.length;ii++){
            if(data[ii].ready == true && data[ii].is_valid_hostname == true){
              arrs.push(data[ii])
            }
          }
          that.doudata = arrs
          that.select5 = arrs[0].name
        }
      })

      $.ajax({
        url: URL + "/cert/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // console.log(data)
          var cert = data
          $.ajax({
            url: URL + "/cert/shared/",
            headers: token,
            type: "GET",
            // data:JSON.stringify(data),
            processData: false,
            contentType: "application/json",
            success: function(data) {
              // console.log(data)
              data.name = '公用证书'
              cert.unshift(data)
              cert.unshift({'id':null,'name':'No HTTPS'})
              that.cert = cert
              that.select3 = that.cert[0].id
            }
          })
        }
      })

      $.ajax({
        url: URL + "/ip/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(datab) {
          // console.log(datab)
          var aa = []
          for(var i = 0;i<datab.length;i++){
            if(datab[i].type == 4){
              aa.push(datab[i])
            }
          }
          that.ips = aa
          that.select2 = aa[0].ip
        }
      })
    },
    methods: {
      jiami(onoff){
        if(onoff == 'ON'){
          this.certonoff = 'ON'
          $('#certoption3').attr('disabled','disabled')
        }else{
          this.certonoff = 'OFF'
          $('#certoption3').attr('disabled',false)
        }
        this.certchange()
      },
      certchange(){
        if(this.select3 == null && this.certonoff == 'OFF'){
          this.$refs.switch2.OFF()
          this.cssswitch2 = 'cssswitch2'
        }else{
          this.cssswitch2 = ''
        }
      },
      quxiao(){
        this.$router.push({path:'/routes'})
      },
      addone() {
        var dv = document.getElementsByClassName('kelong')[0]
        var div = document.getElementsByClassName('kelongdiv')[0]
        var cldiv = div.cloneNode(true);
        var del = cldiv.getElementsByClassName('kelongdel')[0]
        var i = document.createElement('i')
        i.textContent = "删除"
        i.style.display = "inline-block"
        i.style.textAlign = "center"
        i.style.float = "right"
        i.style.color = "#fff"
        i.style.letterSpacing = "5px"
        i.style.width = "90%"
        i.style.height = "40px"
        i.style.lineHeight = "40px"
        i.style.backgroundColor = "#fd397a"
        i.style.cursor = "pointer"
        i.onmouseenter = function() {
          i.style.backgroundColor = "red"
        }
        i.onmouseleave = function() {
          i.style.backgroundColor = "#fd397a"
        }
        i.onclick = function() {
          dv.removeChild(cldiv)
        }
        del.appendChild(i)
        dv.appendChild(cldiv)
      },
      addtow() {
        var dv = document.getElementsByClassName('klwang')[0]
        var div = document.getElementsByClassName('klwangdiv')[0]
        var cldiv = div.cloneNode(true);
        var del = cldiv.getElementsByClassName('klwangdel')[0]
        var i = document.createElement('i')
        i.textContent = "删除"
        i.style.display = "inline-block"
        i.style.textAlign = "center"
        i.style.float = "right"
        i.style.color = "#fff"
        i.style.letterSpacing = "5px"
        i.style.width = "90%"
        i.style.height = "40px"
        i.style.lineHeight = "40px"
        i.style.backgroundColor = "#fd397a"
        i.style.cursor = "pointer"
        i.onmouseenter = function() {
          i.style.backgroundColor = "red"
        }
        i.onmouseleave = function() {
          i.style.backgroundColor = "#fd397a"
        }
        i.onclick = function() {
          dv.removeChild(cldiv)
        }
        del.appendChild(i)
        dv.appendChild(cldiv)
      },
      add() {
        var obj = {}
        obj.name = this.input1
        // var hostname = this.select1
        // for (var i = 0; i < this.servers.length; i++) {
        //   if (this.servers[i].hostname == hostname) {
        //     obj.server = this.servers[i].id
        //     break
        //   }
        // }
        var select = document.getElementsByClassName('rounewselect2')[0]
        var selectindex = select.selectedIndex
        var idd = select.options[selectindex].getAttribute('idd')
        var num = this.ips[selectindex].type
        var ip = 'ip' + num
        obj[ip] = idd
        var select = document.getElementById('certoption3')
        var selectindex = select.selectedIndex
        var idd = select.options[selectindex].getAttribute('idd')
        obj.cert = idd
        obj.routes = []
        var select = document.getElementsByClassName('rounewselect4')
        var input2 = document.getElementsByClassName('rounewinput2')
        for (var i = 0; i < select.length; i++) {
          var selectindex = select[i].selectedIndex
          var idd = select[i].options[selectindex].getAttribute('idd')
          obj.routes.push({
            'app': idd,
            'uri': input2[i].value
          })
        }
        obj.domains = []
        var select = document.getElementsByClassName('rounewselect5')
        for (var i = 0; i < select.length; i++) {
          var selectindex = select[i].selectedIndex
          var idd = select[i].options[selectindex].getAttribute('idd')
          obj.domains.push(idd)
        }
        var on1 = document.getElementsByClassName('rounew')[0].getElementsByClassName('switchOnoff')[0].innerHTML
        on1 = on1 == 'ON' ? true : false
        obj.generate_le = on1
        var on2 = document.getElementsByClassName('rounew')[0].getElementsByClassName('switchOnoff')[1].innerHTML
        on2 = on2 == 'ON' ? true : false
        obj.redirect = on2
        // console.log(obj)
        var data = [obj]
        var that =this
        $(".add").attr('disabled',true);
        $.ajax({
           url: URL + "/site/create/",
           headers:token,
           data:JSON.stringify(data),
           // data:data,
           type: "POST",
        	  processData: false,
           contentType: "application/json",
        	  success: function(data){
               // var data = JSON.stringify(data)
               // alert("添加成功" )
               that.$router.push({path:'/routes'})
           },
           error: function(xhr, status, text) {
             alert1(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
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
  .cssswitch2{
    pointer-events:none;
    opacity: 0.3;
  }
  .rounew>div {
    padding: 40px 24px 40px 24px;
  }

  .rounew>div>div {
    background-color: #fff;
  }

  .rounew>div>div>div {
    padding: 0 20px;
  }

  .top {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 18px;
    border-bottom: 1px solid #7680b1;
  }

  .div2 {
    padding-left: 20px;
    padding-right: 20px;
  }

  .div2>div {
    margin-top: 10px;
    display: flex;
  }

  .div2>div>span {
    height: 42px;
    /* padding: 10px 0; */
  }
  .rounew .btn{
    padding: 20px 0px 40px 0;
  }
  .sleft {
    float: right;
    /* line-height: 40px; */
    padding-right: 20px;
  }

  .div2>div>span:nth-child(1),
  .div2>div>span:nth-child(3) {
    flex: 1;
    padding: 10px 0 0 0;
  }

  .div2>div>span:nth-child(2) {
    flex: 2;
  }

  .div2 input,
  .div2 select {
    width: 100%;
    height: 40px;
  }

  .swspan {
    vertical-align: middle;
    display: inline-block;
  }

  .div3 {
    height: 100px;
    line-height: 100px;
    padding-left: 20px;
    font-size: 18px;
    border-top: 1px dashed #7680b1;
    margin-top: 20px;
  }

  .kelong {
    padding: 0 20px;
  }

  .kelongdiv>div {
    display: flex;
  }

  .kelongdiv>div>span:nth-child(1),
  .kelongdiv>div>span:nth-child(2) {
    flex: 3;
    height: 40px;
  }

  .kelongdiv>div>span:nth-child(3) {
    flex: 1;
  }

  .kelong .option {
    height: 40px;
    width: 95%;
  }

  .kelong input {
    height: 40px;
    width: 100%;
  }

  .klbottom {
    /* margin-top: 5px; */
    padding: 2px 0 20px 0;
  }

  .kelong button {
    height: 40px;
  }

  .yuxinxi {
    height: 60px;
    line-height: 80px;
    font-size: 18px;
  }

  .klwangdiv>div:nth-child(1) {
    display: flex;
  }

  .klwangdiv {
    margin-top: 30px;
  }

  .klwangdiv .option {
    flex: 6;
    height: 40px;
    margin-bottom: 5px;
  }

  .klwangdiv .del {
    flex: 1;
  }

  .rounew .wangbtn {
    height: 60px;
    padding-top: 20px;
  }

  .rounew .bottombtn {
    padding: 20px;
    border-top: 1px solid #7680b1;
  }
  .klbtn,
  .wangbtn button {
    height: 40px;
  }

  .kelongdel i {
    height: 40px;
    display: inline-block;
    background-color: red;
  }
</style>
