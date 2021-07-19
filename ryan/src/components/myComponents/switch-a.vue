<template>
	<div class="my-inline-block">
		<label>
			<div ref="dv" class="my-switch" :style="'border-radius:' + this.radius +';width:' + this.width+';height:' + this.height+';font-size:' + this.fontSize+';color:' + this.color">
				<div class='my-switch-on' :style="'background-color:'+ this.backgroundColor+';border-radius:' + this.radius">
					<div ref="myontext">ON</div>
				</div>
				<div ref="myswitchoff" class='my-switch-off' :style="'border-radius:' + this.radius ">
					<div ref="myofftext">OFF</div>
				</div>
				<button @click="switchBtn" ref="switchBtn" class="switch-btn"></button>
			</div>
			<span ref="switchSpan" :style = "'font-size:' + this.fontSize"> {{ text }} </span>
		</label>
	</div>
</template>

<script>
	// import myButton from '@/components/myComponents/button.vue'
	export default {
		data() {
			return {
				radius: "30px",
				w: 65,
				ww: 35,
			}
		},
		props: ["backgroundColor", "borderRadius", "width", "height", "fontSize", "color", "text"],
		methods: {
			switchBtn() {
				var l = this.$refs.switchBtn.offsetLeft
				if (l == 0) {
					this.$refs.switchBtn.style.left = this.ww + "px"
					this.$refs.myswitchoff.style.width = 0 + "px"
				} else if (l == this.ww) {
					this.$refs.switchBtn.style.left = 0 + "px"
					this.$refs.myswitchoff.style.width = this.w + "px"
				}
			}
		},
		mounted() {
			var w = this.$refs.dv.offsetWidth || 80
			this.w = w
			var h = this.$refs.dv.offsetHeight || 40
			this.radius = h + "px"
			this.$refs.switchBtn.style.width = h + "px"
			this.$refs.switchBtn.style.height = h + "px"
			this.$refs.switchBtn.style.borderRadius = h + "px"
			w = w - h
			this.ww = w
			this.$refs.myontext.style.width = w + "px"
			this.$refs.myontext.style.lineHeight = h + "px"
			this.$refs.myofftext.style.width = w + "px"
			this.$refs.myofftext.style.lineHeight = h + "px"
			var spanH = this.$refs.switchSpan.offsetHeight
			var topH = (h - spanH )/2 + 3
			this.$refs.switchSpan.style.top = -topH + "px"
		},

		components: {
			// myButton,
		},
	}
</script>

<style scoped>
	.my-inline-block {
		display: inline-block;
		cursor: pointer;
	}

	.my-switch {
		display: inline-block;
		width: 80px;
		height: 40px;
		border-radius: 40px;
		box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.4);
		position: relative;
		/* overflow: hidden; */
		font-size: 12px;
		color: #fff;
		cursor: pointer;
	}

	.my-switch div {
		position: absolute;
		text-align: center;
		cursor: pointer;
	}

	.my-switch .my-switch-on {
		overflow: hidden;
		background-color: #26a2ff;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.my-switch .my-switch-off {
		overflow: hidden;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.my-switch .my-switch-on>div {
		left: 4px;
		-webkit-user-select: none; /* 不可选择复制*/
		-moz-user-select:none;  /* 不可选择复制*/
	}

	.my-switch .my-switch-off>div {
		right: 4px;
		color: #999;
		-webkit-user-select: none; /* 不可选择复制*/
		-moz-user-select:none;  /* 不可选择复制*/
	}

	.my-switch .switch-btn {
		position: absolute;
		/* left:0px; */
		left: 0px;
		top: 0px;
		border-radius: 50%;
		box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.4);
	}
  button::after {
      background-color: #000;
      content: " ";
      opacity: 0;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
  	  border-radius:50%;
  }
  button:not(.is-disabled):active::after {
    outline: none;
      opacity: .4
  }
  button.is-disabled {
    outline: none;
      opacity: .6
  }

	label>span {
		position: relative;
		margin:0 5px;
		font-size:12px ;
		color: #222222;
		cursor: pointer;
		-webkit-user-select: none; /* 不可选择复制*/
		-moz-user-select:none;  /* 不可选择复制*/
	}
	label{
		line-height: 0;
	}
</style>
