<template>
	<div class ="domnew">
		<span>新域或子域</span>
    <div class = "yu">
      <div class = "xijie">细节</div>
      <div class ="kelong">
        <div class = "kelongdiv">
          <span>领域</span>
          <span>
            <div><input placeholder = "输入全名"></div>
            <div>请输入有效的域或子域</div>
          </span>
        </div>
      </div>
      <div class = "newadd">
        <button @click = "add"><i>十</i>新增网域</button>
      </div>
      <div class = "btn">
        <button class = "add" @click="Save">保存</button>
      </div>
    </div>
    <div class = "Opalstack">©2021 Opalstack LLC</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		mounted(){

		},
		methods:{
      add(){
        var dv = document.getElementsByClassName('kelong')[0]
        var div = document.getElementsByClassName('kelongdiv')[0]
        var cldiv = div.cloneNode(true);
        var i = document.createElement('i')
       i.textContent = "删除"
       i.style.display = "inline-block"
       i.style.textAlign = "center"
       i.style.float = "right"
       i.style.color = "#fff"
       i.style.letterSpacing = "5px"
       i.style.width = "90px"
       i.style.height = "40px"
       i.style.flex = '1'
       i.style.lineHeight = "40px"
       i.style.backgroundColor = "#fd397a"
       i.style.cursor = "pointer"
       i.onmouseenter = function(){
         i.style.backgroundColor = "red"
       }
       i.onmouseleave = function(){
         i.style.backgroundColor = "#fd397a"
       }
       i.onclick = function(){
         dv.removeChild(cldiv)
       }
        cldiv.appendChild(i)
        dv.appendChild(cldiv)
      },
      Save(){
        var that = this
        var inputs = $('.kelong input')
        var data = []
        $(".add").attr('disabled',true);
        for(var i = 0;i<inputs.length;i++){
          var obj = {}
          obj.name = inputs.eq(i).val()
          data.push(obj)
         }
          $.ajax({
             url: URL + "/domain/create/",
             headers:token,
             data:JSON.stringify(data),
             type: "POST",
          	  processData: false,
             contentType: "application/json",
          	  success: function(data){
                var data = JSON.stringify(obj)
                // alert("添加成功" )
                that.$router.push({path:'/en/domains'})
             },
             error: function(xhr, status, text) {
               var d = xhr.responseJSON
               var a = ''
               for(var i = 0;i<d.length;i++){
                 for(var j = 0;j<d[i].name.length;j++){
                   a = a  + " " + d[i].name[j]
                    myalert(a)
                 }
               }
               $(".add").attr('disabled',false);
             },
          })
      },
		},
		components:{

		},
	}
</script>

<style scoped>
	.domnew>span{
	  display: inline-block;
	   height: 70px;
	   padding-left: 32px;
	   line-height: 70px;
	   font-size: 20px;
	}
  .yu{
    padding: 0px 20px 40px 20px;
    max-width: 700px;
  }
  .yu>div{
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
  }
  .xijie{
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    border-bottom: 1px solid #7680b1;
  }
  .kelongdiv{
    height: 90px;
    border-bottom: 1px dashed #7680b1;
    display: flex;
    padding-top:30px;
    position: relative;
  }
  .kelongdiv>span{
    flex:1;
  }
  .kelongdiv>span:nth-child(2){
    flex:7;
  }
  .kelongdiv>span:nth-child(2) input{
    margin-bottom: 5px;
    width: 96%;
    height: 38px;
    font-size: 16px;
  }
  .kelongdiv i{
    flex: 1;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    background-color: red;
  }
  .newadd,.btn{
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .newadd{
    border-bottom: 1px dashed #7680b1;
  }
.newadd button{
  padding: 10px 20px;
}
.btn button{
  width: 100%;
  height: 55px;
}
</style>
