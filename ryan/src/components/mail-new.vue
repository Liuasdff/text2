<template>
  <div>
    <div class="bodytopdiv"></div>
    <div class="topdiv">新邮件地址</div>
    <div class="bodydiv">
      <div class="laiyuan">来源</div>
      <div class="div2"><i></i><span></span>请输入名称，然后为电子邮件地址选择一个域。</div>
      <div class="div3">
        <input v-model="input1" placeholder="" />
        <span class="a">@</span>
        <span class="option">
          <select autocomplete="off" v-model="select1">
            <option v-for="(k,i) in option1" :value="k.name">&nbsp; {{ k.name }}</option>
          </select>
          <div>
            <div class="optiondiv fa fa-angle-down"></div>
          </div>
        </span>
      </div>
      <div>请输入电子邮件地址详细信息。</div>
      <div class="mdd">目的地</div>
      <div class="div4">
        <i></i><span>请指定目标邮件用户和服务器用于邮箱存储。必须先安装邮件用户，然后才能在此处选择它们。</span>
      </div>
      <div id="mailnewcl">
        <div class="clonediv">
          <span class="option">
            <select autocomplete="off" class="mailnewselect2">
              <option v-for="(k,i) in option2" :value="k.option2">&nbsp; {{ k.option2}}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
          <span class="clonedel"></span>
        </div>
      </div>
      <div class="div5"><button @click="addd"><i>十</i><span>添加目标邮件用户</span></button></div>
      <div class="mdd">转发</div>
      <div class="div4">
        <i></i><span>请指定转发电子邮件地址列表。我们的邮件服务器将尝试转发到这些地址。对于重要邮件，建议您还添加目标邮件用户。</span>
      </div>
      <div id="mailnewcl2">
        <div class="clonediv2">
          <div class="div3 div33">
            <input class="mailnewclone1" placeholder="" />
            <span class="a">@</span>
            <input class="mailnewclone2" placeholder="example.com" />
          </div>
          <span class="clonedel2"></span>
        </div>
      </div>
      <div class="div5"><button @click="add2"><i>十</i><span>添加转发地址</span></button></div>
      <div class = "btn">
        <button class = 'add' @click="add">添加邮件地址</button>
        <button class = 'quxiao' @click="quxiao">取消</button>
      </div>
    </div>
    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        option1: [],
        option2: [],
        select1: "",
        // select2:"",
        input1: "",
        input2: "",
        input3: "",
      }
    },
    mounted() {
      var that = this
      $.ajax({
        url: URL + "/domain/list/",
        headers: token,
        type: "GET",
        // data:JSON.stringify(data),
        processData: false,
        contentType: "application/json",
        success: function(data) {
          var arrs = []
          for(var ii = 0;ii<data.length;ii++){
            if(data[ii].ready == true && data[ii].is_valid_hostname == true){
              arrs.push(data[ii])
            }
          }
          that.option1 = arrs
          that.select1 = arrs[0].name
          // var data1 = arrs
        }
      })

      $.ajax({
        url: URL + "/mailuser/list/",
        headers: token,
        type: "GET",
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
          var data1 = arrs
          $.ajax({
            url: URL + "/server/list/",
            headers: token,
            type: "GET",
            processData: false,
            contentType: "application/json",
            success: function(dataa) {
              // console.log(dataa)
              var server = dataa
              // console.log(data1)
              for (var j = 0; j < data1.length; j++) {
                for (var jj = 0; jj < server.imap_servers.length; jj++) {
                  console.log()
                  if (data1[j].imap_server == server.imap_servers[jj].id) {
                    data1[j].server = server.imap_servers[jj].hostname
                    data1[j].option2 = (data1[j].name + "@" + data1[j].server)
                  }
                }
              }
              that.option2 = data1
            }
          })
        }
      })

    },
    methods: {
      quxiao(){
        this.$router.push({path:'/mail'})
      },
      addd() {
        var dv = document.getElementById("mailnewcl")
        var div = document.getElementsByClassName('clonediv')[0]
        var cldiv = div.cloneNode(true);
        var del = cldiv.getElementsByClassName('clonedel')[0]
        var i = document.createElement('i')
        i.textContent = "删除"
        i.style.display = "inline-block"
        i.style.textAlign = "center"
        i.style.float = "right"
        i.style.color = "#fff"
        i.style.letterSpacing = "5px"
        i.style.width = "90px"
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
      add2() {
        var dv = document.getElementById("mailnewcl2")
        var div = document.getElementsByClassName('clonediv2')[0]
        var cldiv = div.cloneNode(true);
        var del = cldiv.getElementsByClassName('clonedel2')[0]
        var i = document.createElement('i')
        i.textContent = "删除"
        i.style.display = "inline-block"
        i.style.textAlign = "center"
        i.style.float = "right"
        i.style.color = "#fff"
        i.style.letterSpacing = "5px"
        i.style.width = "90px"
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
        if (this.input1 == "") {
          alert1("请在来源 输入名称")
          return true
        }
        var source = this.input1 + "@" + this.select1
        // var destinations = this.input1 + this.select1
        var div = document.getElementsByClassName("mailnewselect2")
        var destinations = []
        for (var i = 0; i < div.length; i++) {
          var index = div[i].selectedIndex
          destinations.push(this.option2[index].id)
        }
        var input1 = document.getElementsByClassName("mailnewclone1")
        var input2 = document.getElementsByClassName("mailnewclone2")
        var forwards = []
        for (var i = 0; i < input1.length; i++) {
          if (input1[i].value != "" && input2[i].value.indexOf(".com") != -1) {
            var a = input1[i].value + "@" + input2[i].value
            forwards.push(a)
          }
        }
        var data = {
          'source': source,
          'destinations': destinations,
          'forwards': forwards
        }
       var data = [data]
        // console.log(data)
        var that = this
        $(".add").attr('disabled', true);
        $.ajax({
          url: URL + "/address/create/",
          headers: token,
          type: "POST",
          data: JSON.stringify(data),
          // data:data,
          processData: false,
          contentType: "application/json",
          success: function(data) {
            that.$router.push({
              path: '/mail'
            })
          },
          error: function(xhr, status, text) {
            alert1(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
            $(".add").attr('disabled', false);
          },
        })
      },
    },
    components: {

    },
  }
</script>

<style scoped>
  .topdiv {
    border-bottom: 1px solid #7680b1;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    padding: 0 20px;
    font-size: 18px;
  }

  .laiyuan {
    padding: 20px 0px;
    font-size: 22px;
  }

  .div2 {
    padding: 20px 0px;
    font-size: 18px;
  }

  .div3 {
    overflow: hidden;
  }

  .div3 .a {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    line-height: 40px;
    /* background-color:#ececf1; */
    float: left;
  }

  .div3 input,
  .div3 .option {
    width: calc((100% - 44px)/2);
    height: 38px;
    font-size: 16px;
    vertical-align: middle;
    float: left;
  }

  .mdd {
    padding: 30px 0;
    font-size: 22px;
  }

  .div4 {
    height: 80px;
    padding-left: 20px;
  }

  #mailnewcl .clonediv {
    margin-bottom: 20px;
  }

  #mailnewcl .clonediv .option,
  .div33 {
    display: inline-block;
    width: calc(100% - 100px);
    height: 40px;
  }

  .div5 {
    margin: 20px 0;
  }

  .div5 button {
    height: 50px;
  }

  .clonediv2 {
    margin-bottom: 20px;
  }

  .save {
    padding: 20px 0;
  }

  .save button {
    height: 60px;
    width: 100%;
  }
</style>
