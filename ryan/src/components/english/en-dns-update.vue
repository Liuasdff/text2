a<template>
  <div class="dns-new">
    <span>新的 DNS 记录</span>
    <div class='xijie'>
      <div class='xijie1'>细节</div>
      <div class='xijietext'>
        <!-- <div v-show="kk.id != '1'"><button class="del" @click="del(ii)">删除</button></div> -->
        <div>
          <span>领域</span>
          <span class="option">
            <select autocomplete="off" id='dnsupdateselect1' v-model="select1">
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
            <select autocomplete="off" v-model="select2">
              <option v-for='(k,i) in type' :value="k">&nbsp; {{ k }}</option>
            </select>
            <div>
              <div class="optiondiv fa fa-angle-down"></div>
            </div>
          </span>
        </div>
        <div>
          <span>内容</span>
          <span>
            <input v-model="input1" placeholder="请输入内容" />
          </span>
        </div>
        <div>
          <span>优先事项</span>
          <span>
            <input v-model="input2" value="10" />
          </span>
        </div>
        <div>
          <span>TTL</span>
          <span>
            <input v-model="input3" value="3600" />
          </span>
        </div>
      </div>
      <!-- <div><button @click="add" class='add1'><i>十</i>添加 DNS 记录</button></div> -->
      <div><button @click="save" class='add'>保存</button></div>
    </div>
    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        domain: [],
        select1: '',
        type: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV'],
        select2: 'TXT',
        input1: '',
        input2: '10',
        input3: '3600',
        id:'',
      }
    },
    mounted() {
      var obj = JSON.parse(localStorage.getItem('dns-update'))
      this.select1 = obj.domain.name
      console.log(obj)
      this.select2 = obj.type
      this.input1 = obj.content
      this.input2 = obj.priority
      this.input3 = obj.ttl
      this.id = obj.id
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
          // console.log(data)
          that.domain = data
          // that.select1 = data[0].name
        }
      })
    },
    methods: {
      save() {
        var data = []
        var select = document.getElementById('dnsupdateselect1')
        var seindex = select.selectedIndex
        var selected = select.options[seindex].getAttribute('idd')
        // console.log(selected)
        var input2 = this.input2
        var input3 = this.input3
        var re = /^[0-9]*$/
        if (!re.test(input2)) {
          myalert('优先事项只能为正整数')
          return false;
        } else {
          input2 = parseInt(input2)
          if (input2 > 65535) {
            myalert('优先事项必须小于 65535')
            return false;
          }
        }
        if (!re.test(input3)) {
          myalert('TTL只能为正整数')
          return false;
        } else {
          input2 = parseInt(input2)
          if (input3 > 2147483647 || input3 < 300) {
            myalert('TTL 必须 大于 300 小于 2147483647')
            return false
          }
        }
        if (this.input1.value == '') {
          myalert('内容不能为空')
          return false
        } else {
          input2 = parseInt(input2)
          input3 = parseInt(input3)
          data.push({
            'id':this.id,
            'domain': selected,
            'type': this.select2,
            'content': this.input1,
            'priority': input2,
            'ttl': input3
          })
        }

      // console.log(data)
      var that = this
      $(".add").attr('disabled', false);
      $.ajax({
        url: URL + "/dnsrecord/update/",
        headers: token,
        data: JSON.stringify(data),
        type: "POST",
        processData: false,
        contentType: "application/json",
        success: function(data) {
          // conosle.log(data)
          // alert("添加成功" )
          that.$router.push({
            path: '/en/dns'
          })
        },
        error: function(xhr, status, text) {
          console.log(xhr)
          var d = xhr.responseText
          alert('保存失败')
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

  .add {
    width: 100%;
    height: 50px;
    font-size: 20px;
    margin-bottom: 20px;
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
