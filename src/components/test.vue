<template>
	<div id="test">
		<p>111</p>
		<ul
		  v-infinite-scroll="loadMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10">
		  <li v-for="item in arr">{{ item.name }}</li>
		</ul>
		
		<!--加载之前-->
		<mt-spinner type="double-bounce" color="#26a2ff" :size="60" style='position: relative;left: 45%;' class='circle'></mt-spinner>
	</div>
</template>

<script>
	export default {
		name:'test',
		data : function() {
			return {
//				list:['paopao1','paopao11','paopao111','paopao2','paopao3','paopao4','paopao5','paopao6','paopao7','paopao8','paopao9']
				list:[],
				part:9,
				arr:[]
			}
		},
		methods:{
			loadMore() {
				var  sCircle = document.getElementsByClassName('circle')[0];
			    sCircle.style.display = 'block';
			  
			   var _this = this;
			   _this.loading = true;
			   setTimeout(function() {
			    
			    _this.loading = false;
			    
			    //每次添加10个数据
			    _this.part += 10;
			    //从头截取，然后刷新
			    _this.arr = _this.list.slice(0,_this.part);
			    
			  }, 5000);
			}   
		},
		mounted(){
			var _this = this; 
			
			//获取圆圈的节点
				var sCircle = document.getElementsByClassName('circle')[0];
				sCircle.style.display = 'none';
				var surl = 'http://api.jisuapi.com/recipe/class?appkey=efc2ab8cfc753101';
				
				//页面刚加载时，获取分类的信息
			this.$http.jsonp(surl)
			.then(function(res){
				var aData = res.body.result;
				//遍历数组
				aData.map(function(el,i){
					//取出的id与传入的id相等
					if(el.classid == '1') {
						_this.list = el.list;
						
						//截取前10个,存放在一个数组中
						_this.arr = _this.list.slice(0,_this.part)
						
						console.log(_this.list);
						console.log(_this.arr);
						return false;
					}
				})
			});
		}
	}
</script>

<style lang="scss" scoped="scoped">
	ul {
		li {
			line-height: 30px;
		    padding: 15px;
		    border: 1px solid #ccc;
		}
	}
</style>