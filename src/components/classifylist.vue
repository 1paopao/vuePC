<template>
	<div id="classifylist">
		<!--头部-->
		<mt-header fixed :title="str" style="z-index: 3;">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<!--图片懒加载-->
		<ul class="clistpics">
		  <li v-for="item in list">
		  	<router-link :to="{path:'/detail',query:{sid:item.id}}">
			    <img v-lazy="item.pic">
			    <span>{{item.name}}</span>
		  	</router-link>
		  </li>
		</ul>
		
		<mt-spinner type="double-bounce" color="#26a2ff" :size="60" style='position: relative;left: 45%;' class='circle'></mt-spinner>
	</div>
</template>

<script>
	export default {
		name:'classifylist',
		data:function() {
			return {
				str:'分类详情',
				list:[]
			}
		},
		mounted() {  //页面加载是获取数据
			this.$emit('to-parent',this.str);
			
			var _this = this;
			//根据id获取相对应的列表信息
			var 
				sId  = this.$route.query.id,
				sUrl = 'http://api.jisuapi.com/recipe/byclass?classid='+sId+'&start=0&num=20&appkey=efc2ab8cfc753101',
			    sCircle = document.getElementsByClassName('circle')[0];
			
			setInterval(function(){
				//修改属性
				sCircle.style.display = 'none';
			},5000)
			
			this.$http.jsonp(sUrl)
				.then(function(res){
					//取出的数据
					var aData = res.body.result.list;
					_this.list = aData;
				})
		}
	}
</script>

<style lang="scss" scoped="scoped">
	image[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	
	.clistpics {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-around;
	    li {
    	    width: 150px;
		    height: 160px;
		    overflow: hidden;
		    margin-top: 10px;
		    text-align: center;
		    cursor:pointer;
		    img {
		    	width: 100%;
		    	height: 80%;
		    	border-radius: 10px;
		    }
		    span {
		    	
		    }
	    }
	}
</style>