<template>
  <div>
    <div class="bodytopdiv"></div>
    <div class="topdiv">编辑电子邮件地址</div>
    <div class="bodydiv">
      <div class="laiyuan">来源</div>
      <div class = 'div3-1'>{{ input1 }}@{{ select1 }}</div>

     <!-- <div class="div2"><i></i><span></span>请输入名称，然后为电子邮件地址选择一个域。</div>
      <div class="div3">
       <input v-model="input1" disabled="disabled" placeholder="请输入名称" />
        <span class="a">@</span>
        <span class="option">
          <select autocomplete="off" v-model="select1" @change="chfn">
            <option v-for="(k,i) in option1" :key='k.id' :value="k.name">&nbsp; {{ k.name }}</option>
          </select>
          <div>
            <div class="optiondiv fa fa-angle-down"></div>
          </div>
        </span>
      </div>
      <div>请输入电子邮件地址详细信息。</div> -->

      <div class="mdd">目的地</div>
      <div class="div4">
        <i></i><span>请指定目标邮件用户和服务器用于邮箱存储。必须先安装邮件用户，然后才能在此处选择它们。</span>
      </div>
      <div id="mailnewcl">
        <div class="clonediv" v-for="(k,i) in obj.destinations" :key='i'>
          <span class="option">
            <select autocomplete="off" v-model="obj.destinations[i].id" class="mailnewselect2">
              <option v-for="(kk,ii) in option2" :value="kk.id">&nbsp; {{ kk.name }}@{{ kk.imap_server.hostname }}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
          <span class="clonedel"><button @click="delone(i)">删除</button></span>
        </div>
      </div>
      <div class="div5"><button @click="addd"><i>十</i><span>添加目标邮件用户</span></button></div>
      <div class="mdd">转发</div>
      <div class="div4">
        <i></i><span>请指定转发电子邮件地址列表。我们的邮件服务器将尝试转发到这些地址。对于重要邮件，建议您还添加目标邮件用户。</span>
      </div>
      <div id="<mailnewcl2></mailnewcl2>">
        <div class="clonediv2" v-for="(k,i) in cltow" :key='i'>
          <div class="div3 div33">
            <input class="mailnewclone1" v-model="k[0]" placeholder="请输入名称" />
            <span class="a">@</span>
            <input class="mailnewclone2" v-model="k[1]" placeholder="example.com" />
          </div>
          <span class="clonedel2"><button @click="deltow(i)">删除</button></span>
        </div>
      </div>
      <div class="div5"><button @click="add2"><i>十</i><span>添加转发地址</span></button></div>
      <div class = "btn">
        <button class = 'add' @click="add">保存</button>
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
        clone: [{
          'id': 0
        }],
        onecount: 0,
        cltow: [{
          'id': 0
        }],
        towcount: 0,
        data: "",
        option1: [],
        option2: [],
        select1: "",
        select2:'',
        // select2:"",
        input1: "",
        input2: "",
        input3: "",
        getItemobj: "",
        obj:{'id':'0'},
      }
    },
    mounted() {
      var obj = JSON.parse(localStorage.getItem("mail-updata"))
      this.getItemobj = obj.id
      var source = obj.source == null || "" || undefined ? "@" : obj.source
      this.input1 = source.substring(0, source.indexOf("@"))
      this.select1 = source.substring(source.indexOf("@") + 1, source.length)
      // this.clone = obj.name
      var forwards = obj.forwards
      var arr = []
      for (var i = 0; i < forwards.length; i++) {
        var a = forwards[i].substring(0, forwards[i].indexOf("@"))
        var b = forwards[i].substring(forwards[i].indexOf("@") + 1, forwards[i].length)
        arr.push([a, b])
      }
      this.cltow = arr
      this.obj = obj
      // console.log(obj)
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
          // var data1 = arrs
          // console.log(data)
        }
      })

      $.ajax({
        url: URL + "/mailuser/list/?embed=imap_server",
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
          that.option2 = arrs
        }
      })
    },
    methods: {
      quxiao(){
        this.$router.push({path:'/mail'})
      },
      chfn(){
        console.log(this.select1)
      },
      addd() {
        this.onecount += 1
        this.obj.destinations.push({'id':this.option2[0].id})
        // this.clone.push({
        //   'id': this.onecount,
        // })
      },
      add2() {
        this.towcount += 1
        this.cltow.push({
          'id': this.towcount
        })
      },
      delone(i) {
        this.obj.destinations.splice(i, 1)
      },
      deltow(i) {
        this.cltow.splice(i, 1)
      },
      add() {
        if (this.input1 == "") {
          alert("请在来源 输入名称")
          return true
        }
        // var source = "a"
        var source = this.input1 + "@" + this.select1
        console.log(source)
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
          var a = input1[i].value + "@" + input2[i].value
          forwards.push(a)
          // if (input1[i].value != "" && input2[i].value.indexOf(".com") != -1) {
          //   var a = input1[i].value + "@" + input2[i].value
          //   forwards.push(a)
          // }
        }
        var that = this
        var data = {
          'id': that.getItemobj,
          'source': source,
          'destinations': destinations,
          'forwards': forwards
        }
        var data = [data]
        // console.log(data)
        $(".add").attr('disabled', true);
        $.ajax({
          url: URL + "/address/update/",
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

  .clonedel button,
  .clonedel2 button {
    width: 90px;
    height: 40px;
    vertical-align: top;
    background-color: #fd397a;
  }

  .clonedel button:hover,
  .clonedel2 button:hover {
    background-color: red;
  }
  .div3-1{
     font-size: 20px;
  }
</style>
