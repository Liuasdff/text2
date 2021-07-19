a<template>
  <div class="applications">
    <span>New Certificate</span>
    <div class='xijie'>
      <div class='xijie1'>Details</div>
      <div class = 'xijietext'>
       <div class = 'xijietextdv1'>
         <div class = 'xijietext1'><span class = 'fa fa-lock'></span></div>
         <div class = 'xijietext2'>
           <div>The certificate issuing process generates four types of files. </div>
           <div><span>Certificate </span> The certificate issued by a certificate authority. </div>
           <div><span>Intermediate Certificates </span> Chain certificates used to identify the primary certificate to web browsers.</div>
           <div><span>Certificate Signing Request </span>  A CSR is generated at the same time as the key. The CSR contains data used to create cert for the key.</div>
           <div><span>Key </span> The key used to decrypt the certificate.</div>
           <div>This form requires the  <span>Certificate，Intermediate Certificates, </span> and  <span> Private Key. </span></div>
         </div>
       </div>
       <div class = 'div1'>Name</div>
       <div class='input'><input v-model="name" placeholder="Enter a name for your certificate"></div>
       <div class = 'div3'>The name you want to use to recognize the cert/key pair later.</div>
       <div class = 'div1'>Certificate</div>
       <div class=''><textarea  v-model="cert"></textarea></div>
       <div class = 'div3'>Certificates will have the words 'BEGIN CERTIFICATE' on the first line, and 'END CERTIFICATE' on the last line. </div>
       <div class = 'div1'>Intermediate Certificates</div>
       <div class=''><textarea  v-model="intermediates"></textarea></div>
       <div class = 'div3'>Intermediate certificates are provided by the certificate authority, they are required for proper browser identification.</div>
       <div class = 'div1'>Key</div>
       <div class=''><textarea  v-model="key"></textarea></div>
       <div class = 'div3'>Keys will have the words 'BEGIN PRIVATE KEY' on the first line, and 'END PRIVATE KEY' on the last line. </div>
       <div class = "btn">
         <button class = 'add' @click="add">Add Certificate</button>
         <button class = 'quxiao' @click="quxiao">Cancel</button>
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
        this.$router.push({path:'/en/certificates'})
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
                 that.$router.push({path:'/en/certificates'})
              },
              error: function(xhr, status, text) {
                alert2(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
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
