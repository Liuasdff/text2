<template>
	<div class="my-inline-block" @click="switchMove">
			<div ref="dv" class="my-switch" :style=" 'border-radius:' + this.radius +';width:' + this.width+';height:' + this.height+';font-size:' + this.fontSize">
				<div  class = "switchOnoff" ref = "switchOnoff">{{ onoff }}</div>
				<div ref="switchMove" class="switch-btn"></div>
			</div>
			<span  class = "switchSpan" ref="switchSpan" :style = "'font-size:' + this.fontSize"> {{ text }} </span>
	</div>
</template>

<script>
	import myButton from '@/components/myComponents/button.vue'
	export default {
		data() {
			return {
				radius: "30px",
				w: 65,
				ww: 35,
				h:30,
				onoff:'OFF',
				backColor:'#26a2ff',
				colorr:'#fff',
			}
		},
		props: ['switchON',"backgroundColor", "borderRadius", "width", "height", "fontSize", "color", "text"],
		methods: {
			switchMove() {
				var l = this.$refs.switchMove.offsetLeft
				if (l == 0) {
					this.$refs.switchMove.style.left = this.ww + "px" //设置移动div的移动距离
					this.$refs.switchMove.style.boxShadow  = 'none';  //设置移动div的阴影
					this.$refs.dv.style.backgroundColor = this.backColor //设置移动盒子的背景颜色
					this.$refs.dv.style.color = this.colorr //设置移动盒子里面的字体颜色
					this.$refs.switchOnoff.style.left = 4 + "px"    //设置文字div的 left
					this.onoff = "ON"  //设置文字div的 文字
          if(this.$listeners['backfn']){
            this.$emit('backfn','ON')
          }
				} else if (l == this.ww) {
					this.$refs.switchMove.style.left = 0 + "px"  //设置移动div的移动距离
					this.$refs.switchMove.style.boxShadow  = '1px 3px 5px rgba(0, 0, 0, 0.4)'; //设置移动div的阴影
					this.$refs.dv.style.backgroundColor = "#fff" //设置移动盒子的背景颜色
					this.$refs.dv.style.color = "#999" //设置移动盒子里面的字体颜色
					this.$refs.switchOnoff.style.left = this.h + "px"    //设置文字div的 left
					this.onoff = "OFF"  //设置文字div的 文字
          if(this.$listeners['backfn']){
            this.$emit('backfn','OFF')
          }
				}
			},
      ON(){
        this.$refs.switchMove.style.left = this.ww + "px" //设置移动div的移动距离
        this.$refs.switchMove.style.boxShadow  = 'none';  //设置移动div的阴影
        this.$refs.dv.style.backgroundColor = this.backColor //设置移动盒子的背景颜色
        this.$refs.dv.style.color = this.colorr //设置移动盒子里面的字体颜色
        this.$refs.switchOnoff.style.left = 4 + "px"    //设置文字div的 left
        this.onoff = "ON"  //设置文字div的 文字
      },
      OFF(){
        this.$refs.switchMove.style.left = 0 + "px"  //设置移动div的移动距离
        this.$refs.switchMove.style.boxShadow  = '1px 3px 5px rgba(0, 0, 0, 0.4)'; //设置移动div的阴影
        this.$refs.dv.style.backgroundColor = "#fff" //设置移动盒子的背景颜色
        this.$refs.dv.style.color = "#999" //设置移动盒子里面的字体颜色
        this.$refs.switchOnoff.style.left = this.h + "px"    //设置文字div的 left
        this.onoff = "OFF"  //设置文字div的 文字
      },
		},
		mounted() {
			if(this.backgroundColor){
				this.backColor = this.backgroundColor;
			}

			if(this.color){
				this.colorr = this.color;
			}
			var w = this.$refs.dv.offsetWidth || 80  //获取移动盒子的宽度
			this.w = w
			var h = this.$refs.dv.offsetHeight || 40 //获取移动盒子的高度
			this.radius = h + 'px'  //设置移动盒子的borderRadius
			var hh = h-2
			this.radius = hh + "px"
			this.$refs.switchMove.style.width = hh + "px"   //设置移动div的宽度
			this.$refs.switchMove.style.height = hh + "px"	//设置移动div的高度
			this.ww = w-h+1 //设置移动div的移动距离
			this.$refs.switchOnoff.style.width = this.ww + "px"  //设置文字div的宽度
			this.$refs.switchOnoff.style.lineHeight = h + "px" //设置文字div的 lineHeight
			this.h = h-4
			this.$refs.switchOnoff.style.left = this.h + "px"    //设置文字div的 left

		},
		components: {

		},
	}
</script>

<style scoped>
	.my-inline-block {
		display: inline-block;
		position: relative;
		cursor: pointer;
		-webkit-user-select: none; /* 不可选择复制*/
		-moz-user-select:none;  /* 不可选择复制*/
	}
	.my-switch {
		left: 0;
		top: 0;
		display: inline-block;
		width: 80px;
		height: 40px;
		border-radius: 40px;
		box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
		position: relative;
		font-size: 12px;
		color: #999;
		line-height: 100px;
		vertical-align:middle;
		background-color: #fff;
	}
	.my-switch .switch-btn {
		position: absolute;
		background-color: #fff;
		left: 0px;
		top: 1px;
		border-radius: 50%;
		box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.4);
		transition: all;
		transition-duration: .2s;
	}
    .my-switch  .switchOnoff{
		position: absolute;
		height: 100%;
		line-height: 30px;
		text-align: center;
		-webkit-user-select: none; /* 不可选择复制*/
		-moz-user-select:none;  /* 不可选择复制*/
	}
	.switchSpan{
		line-height: 0;
		-webkit-user-select: none; /* 不可选择复制*/
		-moz-user-select:none;  /* 不可选择复制*/
	}

</style>
