<template>
	<div class="dv users-changepass">
    <div class = "div"></div>
    <form>
      <div class = "text">
        <div class = "div2">
          <div class = "div2-1">
            <div>更改密码？</div>
            <div @click="guanbi" class = "guanbi">×</div>
          </div>
          <div class = "names" v-for = "(k,i) in loca"> 选定的Shell用户 {{ k.obj.name }}</div>
          <div class = "div2-2">
            <div class = 'divv2-2'>
               密码在8到64个字符之间。
            </div>
          </div>
          <div class = "newpass">新密码 &nbsp; <span :style = "{'color':color1}">{{ text1 }}</span></div>
          <div><input autocomplete='false' @input="input1" maxlength="254" v-model="newpass" type="password" placeholder="新密码"></div>
          <div class = "querengpass">确认密码 &nbsp; <span :style = "{'color':color2}">{{ text2 }}</span></div>
          <div><input autocomplete='false' @input="input2" maxlength="254" v-model="querenpass" type="password" placeholder="确认密码"></div>
          <div class = "div2-3">您要更改上述用户的密码吗？</div>
          <div>
            <div class="buttons">
              <button type="button" @click="guanbi">取消</button>
              <button type="button" name='sub' class="button1 xiugai" @click="xiugai">修改密码</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- <div class = "dv3"></div> -->
	</div>
</template>

<script>
	export default{
		data(){
			return{
        loca:[{'obj':{'name':''}}],
        text1:'',
        color1:'',
        text2:'',
        color2:'',
        newpass:'',
        querenpass:"",
        password:'',
			}
		},
    mounted(){
       var loca = JSON.parse(localStorage.getItem('mailusers-changePassword'))
       this.loca = loca
       // console.log(loca)
    },
		methods: {
		  guanbi() {
		    this.$emit('changepassfn')
		  },
		  input1() {
		    return
		    var re =
		      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]).{8,64}$/
		    if (re.test(this.newpass)) {
		      this.text1 = '密码可用'
		      this.color1 = 'blue'
		      this.password = this.newpass
		      return true;
		    } else {
		      // console.log(222)
		      this.text1 = '密码无效'
		      this.color1 = 'red'
		      this.password = ''
		      return false;
		    }
		  },
		  input2() {
		    return
		    if (this.password == "") {
		      this.text2 = ''
		      this.color2 = ''
		    } else {
		      if (this.newpass == this.querenpass) {
		        this.text2 = '密码可用'
		        this.color2 = 'blue'
		      } else {
		        this.text2 = '密码不一致'
		        this.color2 = 'red'
		      }
		    }
		  },
		  xiugai() {
		    if (this.newpass != this.querenpass){
		      alert1('密码不一致')
		      return false
		    }else{
		      var that = this
		      var data = []
		      for (var i = 0; i < this.loca.length; i++) {
		        data.push({
		          'id': this.loca[i].id,
		          'password': this.newpass
		        })
		      }
		      $(".xiugai").attr('disabled', true);
		      $.ajax({
		        url: URL + "/mailuser/update/",
		        headers: token,
		        data: JSON.stringify(data),
		        type: "POST",
		        processData: false,
		        contentType: "application/json",
		        success: function(dataa) {
		          // console.log(dataa)
		          that.$emit('changepassfn')
		          location.reload()
		          // alert("修改成功" )
		        },
		        error: function(xhr, status, text) {
		          // console.log(xhr)
		          alert1(xhr.responseText.replace(/\"|\'|\[|\]|\{|\}/g,''))
		          $(".xiugai").attr('disabled', false);
		        },
		      })
		    }
		    // if (this.password != "") {
		    //   var that = this
		    //   var data = []
		    //   for (var i = 0; i < this.loca.length; i++) {
		    //     data.push({
		    //       'id': this.loca[i].id,
		    //       'password': this.password
		    //     })
		    //   }

		  },
		},
		components:{

		},
	}
</script>

<style scoped>
	.div{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 98;
    background-color:#000;
    opacity: 0.2;
  }
  .text{
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 99;
    display: flex;
    /* 下面一行兼容IE */
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding-top: 20px;
  }
  .div2{
    display: inline-block;
    min-width: 500px;
    width: 50%;
    background-color: #fff;
    border-radius: 5px;
    padding-bottom: 20px;
  }
  .div2>div{
    padding: 0 20px;
  }
  .div2-1{
     height: 70px;
     line-height: 70px;
     border-bottom: 1px #ececf1;
     font-size: 22px;
     position: relative;
  }
  .guanbi{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 35px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    -webkit-user-select: none; /* 不可选择复制*/
    -moz-user-select:none;     /* 不可选择复制*/
    user-select:none;
  }
  .names{
    margin-bottom: 8px;
    font-size: 18px;
  }
  .divv2-2{
    background-color:#ececf1 ;
    padding: 10px;
    font-size: 18px;
  }
  .newpass,.querengpass{
    margin: 30px 0 8px 0;
  }
  .users-changepass input{
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
  .users-changepass button{
    width: 100px;
    height: 40px;
    font-size: 16px;
  }
  .buttons{
    display: inline-block;
    float: right;
  }
  .div2-3{
    margin: 20px 0;
  }
  .button1{
    background-color: #fd397a;
    margin-right: 10px;
  }
</style>
