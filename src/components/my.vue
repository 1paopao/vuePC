<template>
	<div id="my">
		<mt-header fixed :title="str" style="z-index: 3;">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<div class="jqr">
			<ul class="box" id='box'>
				<li style="text-align: center;color: #26a2ff;font-size: 15px;">快来和我聊天！！</li>
			</ul>
			<div class="msg">
				<input type="text" name="" id="" value="" v-model="msg"/>
				<button @click="send">send</button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name:'my',
		data:function(){
			return {
				str:'咨询',
				msg:''
			}
		},
		methods:{
			//发送信息
			send() {
				var _this = this;
				
				var 
					oBox = document.getElementById('box'),
					oLi  = document.createElement('li');
					oLi.innerHTML = "<span style='font-size:15px;color:#26a2ff'>我说:</span>"+ this.msg;
					oLi.style.borderBottom = '1px solid #ddd';
					oLi.style.lineHeight   = '35px';
					oLi.style.textAlign   = 'left';
					oBox.appendChild(oLi);
					

				//调用机器人的接口
				axios({
					url:'http://route.showapi.com/60-27?showapi_appid=47789&showapi_sign=3e57857a6b224dd4beb6b1773085ca93&info='+_this.msg
				}).then(function(data){
					//清空输入框的值
					_this.msg = '';
					
					var reply = data.data.showapi_res_body.text;
					console.log(reply);
					//把这个内容存储在li标签里
					var oLi1  = document.createElement('li');
					oLi1.innerHTML = "<span style='font-size:15px;color:#26a2ff'>美食小专家: </span>"+ reply;
					oLi1.style.borderBottom = '1px solid #ddd';
					oLi1.style.lineHeight   = '35px';
					oLi1.style.textAlign    = 'right';
					oBox.appendChild(oLi1);
				})
			}
		},
		mounted(){
			this.$emit('to-parent',this.str);
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.jqr {
		width: 95%;
	    margin: 0 auto;
	    padding: 5px 0;
	    ul {
	        height: 520px;
		    border: 1px solid #ddd;
		    padding: 5px 5px 15px 5px;
		    box-sizing: border-box;
		    overflow: scroll;
		    li{
		    	&:nth-child(2n+1) {
	    		    text-align: left;
				    line-height: 25px;
				    border-bottom: 1px solid #ccc;
		    	}
		    	&:nth-child(2n) {
	    		    text-align: right;
		    	}
		    }
	    }
	    .msg {
	    	margin-top:5px;
	    	
	    	input {
    		    width: 80%;
			    border: 0;
			    border: 1px solid #ccc;
			    height: 30px;
			    padding:2px;
	    	}
	    	button {
	    		border: 0;
			    background: #26a2ff;
			    width: 17%;
			    border-radius: 8px;
			    height: 30px;
			    color: #fff;
	    	}
	    }
	}
</style>