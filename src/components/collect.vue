<template>
	<div id="collect">
		<!--头部-->
		<mt-header fixed :title="str" style="z-index: 3;">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<ul class="coldetail">
			<li v-for='(item,i) in arr'>
				<img :src="item.pic" alt="" />
				<div>
					<h3>{{item.name}}</h3>
					<span v-html="item.content"></span>
				</div>
				<router-link :to="{path:'/detail',query:{sid:item.id}}" class='more'>更多</router-link>
			</li>
		</ul>
		
		<mt-spinner type="double-bounce" color="#26a2ff" :size="60" style='position: relative;left: 45%;' class='circle'></mt-spinner>
	</div>
</template>

<script>
	export default {
		name:'collect',
		data:function(){
			return {
				str:'收藏',
				arr:[]
			}
		},
		mounted(){
			var _this = this;
			this.$emit('to-parent',this.str);
			
			
			//获取圆圈的节点
			var sCircle = document.getElementsByClassName('circle')[0];
			
			//先加载小图标
			setInterval(function(){
				//修改属性
				sCircle.style.display = 'none';
			},5000)
			
			//接收state的存放的数据
			var arr = this.$store.state.count;
			arr.map(function(el,i){
				//遍历输出所存放的信息
				var surl = 'http://api.jisuapi.com/recipe/detail?id='+el+'&appkey=efc2ab8cfc753101';
				_this.$http.jsonp(surl)
				.then(function(res){
					var sData = res.body.result;
					_this.arr.push(sData);
				})
			})
			console.log(_this.arr);
		}
	}
</script>

<style lang='scss' scoped="scoped">
	.coldetail {
		li {
		    padding: 15px;
    		overflow: hidden;
    		border-bottom: 1px dashed #ddd;
    		img {
			    float: left;
    			width: 20%;
    		}
    		div {
			    float: left;
			    width: 75%;
			    margin-left: 10px;
			    h3 {
			    	line-height: 25px;
			    }
			    span {
			    	display: block;
		    	    width: 100%;
				    text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
			    }
    		}
    		.more {
			    position: relative;
				left: 220px;
				line-height: 33px;
				padding: 4px 10px;
				border-radius: 4px;
				background: #26a2ff;
				color: #fff;
    		}
		}
	}
</style>