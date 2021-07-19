a<template>
  <div class="dns-new">
    <span>新DNS记录</span>
    <div class='xijie'>
      <div class='xijie1'>细节</div>
      <div class='xijietext' v-for='(kk,ii) in data' :key='kk.id'>
        <div v-show="kk.id != '1'"><button class="del" @click="del(ii)">删除</button></div>
        <div>
          <span>域</span>
          <span class="option">
            <select autocomplete="off">
              <option v-for='(k,i) in domain' :idd='k.id' :value="k.name">&nbsp; {{ k.name }}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
        </div>
        <div>
          <span>类型</span>
          <span class="option">
            <select autocomplete="off" >
              <option :selected="k == 'TXT'" v-for='(k,i) in type' :value="k">&nbsp; {{ k }}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
        </div>
        <div>
          <span>内容</span>
          <span>
            <input placeholder="" />
          </span>
        </div>
        <div>
          <span>优先事项</span>
          <span>
            <input value="10" />
          </span>
        </div>
        <div>
          <span>TTL</span>
          <span>
            <input value="3600" />
          </span>
        </div>
      </div>
      <!-- <div><button @click="addd" class='add1'><i>十</i>添加 DNS 记录</button></div> -->
      <div class = "btn">
        <button class = 'add' @click="add">添加DNS记录</button>
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
        data: [{
          'id': 1
        }],
        datacount: 1,
        domain: [],
        // select1:'',
        type: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV'],
        // select2:'A',
        // input1:'',
        // input2:'10',
        // input3:'3600',
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
          // console.log(data)
          var arrs = []
          for(var ii = 0;ii<data.length;ii++){
            if(data[ii].ready == true && data[ii].is_valid_hostname == true){
              arrs.push(data[ii])
            }
          }
          that.domain = arrs
          that.select1 = arrs[0].name
        }
      })
    },
    methods: {
      quxiao(){
        this.$router.push({path:'/dns'})
      },
      addd() {
        this.datacount += 1
        this.data.push({
          'id': this.datacount
        })
      },
      del(ii) {
        this.data.splice(ii, 1)
      },
      add() {
        var data = []
        var div = document.getElementsByClassName('xijietext')
        for (var i = 0; i < div.length; i++) {
          var selects = div[i].getElementsByTagName('select')
          var seindex1 = selects[0].selectedIndex
          var selected1 = selects[0].options[seindex1].getAttribute('idd')
          var seindex2 = selects[1].selectedIndex
          var selected2 = selects[1].options[seindex2].value
          var inputs = div[i].getElementsByTagName('input')
          var input2 = inputs[1].value
          var input3 = inputs[2].value
          var re = /^[0-9]*$/
          if (!re.test(input2)) {
            alert1('优先事项只能为正整数')
            return false;
          }else{
            input2 = parseInt(input2)
            if(input2>65535){
              alert1('优先事项必须小于 65535')
              return false;
            }
          }
          if (!re.test(input3)) {
            alert1('TTL只能为正整数')
            return false;
          }else{
            input2 = parseInt(input2)
            if(input3>2147483647 || input3 < 300){
              alert1('TTL 必须 大于 300 小于 2147483647')
              return false
            }
          }
          if (inputs[0].value == '') {
            alert1('内容不能为空')
            return false
          }else{
            input2 = parseInt(input2)
            input3 = parseInt(input3)
            data.push({
              'domain': selected1,
              'type': selected2,
              'content': inputs[0].value,
              'priority': input2,
              'ttl': input3
            })
          }
        }
        // console.log(data)
        var that = this
        $(".add").attr('disabled',false);
        $.ajax({
           url: URL + "/dnsrecord/create/",
           headers:token,
           data:JSON.stringify(data),
           type: "POST",
        	  processData: false,
           contentType: "application/json",
        	  success: function(data){
              // conosle.log(data)
              // alert("添加成功" )
              that.$router.push({path:'/dns'})
           },
           error: function(xhr, status, text) {
             alert1(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
             $(".add").attr('disabled',false);
           },
        })

      },

    },
    components: {

    },
  }
</script>

<style scoped>
  .dns-new>span {
    line-height: 60px;
    font-size: 22px;
  }

  .xijie {
    background-color: #fff;
    border-radius: 5px;
    width: 500px;

  }

  .del {
    background-color: #fd397a;
    width: 90px;
    height: 40px;
    cursor: pointer;
    font-size: 20px;
  }

  .del:hover {
    background-color: red;
  }

  .xijie>div {
    padding: 10px 20px;
    border-radius: 5px;
  }

  .xijie1 {
    height: 50px;
    line-height: 60px;
    font-size: 22px;
    border-bottom: 1px solid #ececf1;
  }

  .xijie .btn {
   padding: 20px 0px 40px 0px;
  }

  .xijietext>div {
    display: flex;
    margin-bottom: 20px;
  }

  .xijietext>div>span:nth-child(1) {
    flex: 1;
    padding: 0px 10px;
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
    font-size: 16px;
    line-height: 40px;
  }

  .xijietext>div>span:nth-child(2) {
    flex: 3;
  }

  .xijietext .option {
    width: 100%;
    height: 40px;
    font-size: 16px;
  }

  .xijietext input {
    height: 40px;
    width: 100%;
    font-size: 16px;
  }

  .add1 {
    width: 180px;
    height: 50px;
    font-size: 18px;
  }
</style>
