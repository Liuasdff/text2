a<template>
  <div class="applications">
    <span>新证书</span>
    <div class='xijie'>
      <div class='xijie1'>细节</div>
      <div class = 'xijietext'>
       <div class = 'xijietextdv1'>
         <div class = 'xijietext1'><span class = 'fa fa-lock'></span></div>
         <div class = 'xijietext2'>
           <div>证书颁发过程生成四种类型的文件</div>
           <div><span>Certificate </span> ：证书颁发机构颁发的证书。</div>
           <div><span>Intermediate Certificates </span> 链状证书，用于向Web浏览器标识主要证书。</div>
           <div><span>Certificate Signing Request </span> CSR与密钥同时生成。CSR包含用于创建密钥证书的数据。</div>
           <div><span>Key </span> 用于解密证书的密钥。</div>
           <div>这种形式的要求 <span>Certificate，Intermediate Certificates </span> 和 <span>Private key </span> 。</div>
         </div>
       </div>
       <div class = 'div1'>名称</div>
       <div class='input'><input v-model="name" placeholder="输入证书名称"></div>
       <div class = 'div3'>以后用来识别证书/密钥对的名称。</div>
       <div class = 'div1'>证书</div>
       <div class=''><textarea  v-model="cert"></textarea></div>
       <div class = 'div3'>证书的第一行将带有“ BEGIN CERTIFICATE”字样，最后一行将具有“ END CERTIFICATE”字样。</div>
       <div class = 'div1'>中级证书</div>
       <div class=''><textarea  v-model="intermediates"></textarea></div>
       <div class = 'div3'>中级证书由证书颁发机构提供，对于正确的浏览器标识，它们是必需的。</div>
       <div class = 'div1'>钥匙</div>
       <div class=''><textarea  v-model="key"></textarea></div>
       <div class = 'div3'>密钥的第一行将带有单词“ BEGIN PRIVATE KEY”，最后一行将带有“ END PRIVATE KEY”。</div>
       <div class = "btn">
         <button class = 'add' @click="add">添加证书</button>
         <button class = 'quxiao' @click="quxiao">取消</button>
       </div>
      </div>
    </div>
    <div class="Opalstack">©2021 Opalstack LLC</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:'',
        cert:'',
        intermediates:'',
        key:'',
      }
    },
    mounted() {

    },
    methods: {
      quxiao(){
        this.$router.push({path:'/certificates'})
      },
      add(){
         // if(this.name != '' && this.cert != '' && this.key !=''){
           var obj = {'name':this.name,'cert':this.cert,'intermediates':this.intermediates,'key':this.key}
           var data = [obj]
           var that = this
           $(".add").attr('disabled',false);
           $.ajax({
              url: URL + "/cert/create/",
              headers:token,
              data:JSON.stringify(data),
              type: "POST",
           	  processData: false,
              contentType: "application/json",
           	  success: function(data){
                 // conosle.log(data)
                 // alert("添加成功" )
                 that.$router.push({path:'/certificates'})
              },
              error: function(xhr, status, text) {
               alert1(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
                $(".add").attr('disabled',false);
              },
           })
         // }
      },

    },
    components: {

    },
  }
</script>

<style scoped>
  .applications>span {
    line-height: 60px;
    font-size: 22px;
  }

  .xijie {
    background-color: #fff;
    border-radius: 5px;
  }
  .xijie>div{
    padding: 10px;
    border-radius: 5px;
  }
  .xijie1 {
    height: 50px;
    line-height: 60px;
    /* padding: 10px; */
    border-bottom: 1px solid #ececf1;
  }

  .xijietext {
    padding: 10px;
  }
  .xijietextdv1{
    padding: 10px;
    display: flex;
    border-radius:5px;
    background-color: #ececf1;
  }
  .xijietext1 {
   flex: 1;
   min-width: 80px;
  }
  .xijietext2 {
   flex: 9;
  }
  .xijietext2>div{
    margin-bottom: 7px;
  }
  .xijietext2>div span{
    color:#fd397a;
  }
  .xijietext1{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .fa-lock{
    font-size: 40px;
    display: inline-block;
  }
  .xijietext .div1{
    margin: 20px 0 5px 0;
  }
  .xijietext input{
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
  .xijietext .div3{
    margin-top: 5px;
  }
  textarea{
    resize: none;
    outline: none;
    border-radius: 5px;
    border: 1px solid #0062CC;
    font-size: 16px;
    min-height: 100px;
    padding: 10px;
    width: calc(100% - 20px);
  }

</style>
