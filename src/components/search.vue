<template>
	<div id="search">
		<mt-header fixed :title="str">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<!--图片懒加载-->
		<ul class="searchpics">
		  <li v-for="item in arr">
		  	<router-link :to="{path:'/detail',query:{sid:item.id}}">
			    <img v-lazy="item.pic">
			    <span>{{item.name}}</span>
		  	</router-link>
		  </li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'search',
		data:function(){
			return {
				str:'搜索列表',
				arr:[]
			}
		},
		mounted() {
			//推送一个自定义的事件
//			this.$emit('to-parent',this.str);
			
			
			var 	
				str  = this.$route.query.str,
				surl = 'http://api.jisuapi.com/recipe/search?keyword='+str+'&num=15&appkey=efc2ab8cfc753101';
			var 
				_this = this;
			
			//获取数据
			this.$http.jsonp(surl)
			.then(function(res){
				var aData = res.body.result.list;
				_this.arr = aData;
				console.log(_this.arr);
			})
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.searchpics {
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