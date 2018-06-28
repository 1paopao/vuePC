<template>
	<div id="home">
		<!--头部-->
		<mt-header fixed :title="str" style="z-index: 3;">
		  <router-link to="/" slot="left">
		   <!-- <mt-button icon="back"></mt-button>-->
		  </router-link>
		</mt-header>
		
		<!--搜索-->
			<mt-search
			  placeholder='search'
			  v-model="value"
			  cancel-text="取消"
			  @keydown.enter.native="searchval"
			  >
			</mt-search>
		<!--轮播图-->
			<mt-swipe :auto="4000">
			  <mt-swipe-item class='b_red'></mt-swipe-item>
			  <mt-swipe-item class='b_pink'></mt-swipe-item>
			  <mt-swipe-item class='b_orange'></mt-swipe-item>
			  <mt-swipe-item class='b_orange'></mt-swipe-item>
			</mt-swipe>
		<!--菜单分类-->	
			<div class="classify">
				<p>菜谱分类</p>
				<ul id="clsimple">
					<li v-for='item in arr' @click="tap">
						<router-link :to="{path:'/',query:{id:item.classid}}">
							{{item.name}}
						</router-link>
					</li>
				</ul>
			</div>
		
		<!--图片懒加载-->
			<ul  id="classify-pics">
				
			 <li v-for="item in list">
			  	<router-link :to="{path:'/classifylist',query:{id:item.classid}}">
			   		<strong>{{item.name}}<i>&#xe62e;</i></strong>
			  	</router-link>
			  </li>
			</ul>
		<!--加载之前-->
		<mt-spinner type="double-bounce" color="#26a2ff" :size="60" style='position: relative;left: 45%;' class='circle'></mt-spinner>
	</div>
</template>

<script>
	export default {
		name:'home',
		data:function() {
			return {
				str:'首页',
				value:'',
				arr:[],
				list:[]       //要以index.html为目标
			}
		},
		methods:{
			//搜索
			searchval(){
				//输入的值
				var str  = this.value;
				//判断输入的内容
				//先跳转到搜索页面,向页面路径中传值
				this.$router.push({path:'/search',query:{str:str}});
			},
			
			//点击分类标签
			tap(e) {
				var _this = this;
				//取出分类的id
				var 
					sId = this.$route.query.id,
					surl = 'http://api.jisuapi.com/recipe/class?appkey=efc2ab8cfc753101';
				
				//标签点击时，改变样式
				//获取总的父级
				var par = e.target.parentElement.parentElement;
				//遍历所有的li，进行style的背景的消除
				var opar = Array.from(par.childNodes);
				for(var i = 0;i < opar.length;i++) {
					opar[i].style.background = '';
					opar[i].children[0].style.color = '#26a2ff';
				}
				//控制到li上进行样式的控制，否则e.target为a标签
				e.target.parentElement.style.background = '#26a2ff';
				e.target.parentElement.children[0].style.color = '#fff';
				
				//通过id获取分类的信息
				this.$http.jsonp(surl)
				.then(function(res){
					var aData = res.body.result;
					//遍历数组
					aData.map(function(el,i){
						//取出的id与传入的id相等
						if(sId === el.classid) {
							_this.list = el.list;
							return false;
						}
					})
				})
			}
		},
		mounted(){   //页面初始化
			var _this = this;
			
			//将数据推送给父元素
//			this.$emit('to-parent',this.str);
			
			//获取圆圈的节点
			var sCircle = document.getElementsByClassName('circle')[0];
			//先加载小图标
			setTimeout(function(){
				//修改加载圆圈的属性
				sCircle.style.display = 'none';
				//设置初始化的标签颜色
				var firstTag = document.getElementsByTagName('ul')[0].childNodes[0];
				firstTag.style.background = '#26a2ff';
				firstTag.children[0].style.color = '#fff';
			},5000)
			
			//获取商品的分类
			var surl = 'http://api.jisuapi.com/recipe/class?appkey=efc2ab8cfc753101';
			this.$http.jsonp(surl)
			.then(function(res){
				//取出数据，用res.data
				var aData = res.body.result;
				_this.arr = aData;	
			})
			
			
			
			
			//页面刚加载时，获取分类的信息
			this.$http.jsonp(surl)
			.then(function(res){
				var aData = res.body.result;
				//遍历数组
				aData.map(function(el,i){
					//取出的id与传入的id相等
					if(el.classid == '1') {
						_this.list = el.list;
						return false;
					}
				})
			});
			
			//设置标签初始化的颜色
			//控制到li上进行样式的控制，否则e.target为a标签
//			console.log(document.getElementsByTagName('ul')[0].firstChild);
			
			
		}
	}
</script>

<style scoped="scoped" lang="scss">
    /*搜索*/
	.mint-search {
		height:52px;
	}
	.classify ul li .router-link-active {
		background : '#26a2ff';
		color : '#fff';
	}
	/*轮播*/
	.mint-swipe{
	   		width: 100%;
    		height: 190px;
    		div:nth-child(1) {
    			background:url('./../assets/pic1.jpg') no-repeat center center/cover;
    		}
    		div:nth-child(2) {
    			background:url('./../assets/pic2.jpg') no-repeat center center/cover;
    		}
    		div:nth-child(3) {
    			background:url('./../assets/pic3.jpg') no-repeat center center/cover;
    		}
    		div:nth-child(4) {
    			background:url('./../assets/pic4.jpg') no-repeat center center/cover;
    		}
	}
	
	/*菜单分类*/
	.classify {
	    font-size: 14px;
	    padding: 5px;
	    cursor: pointer;
	    box-shadow: 0px 2px 3px #eee;
	    margin-top:15px ;
        p {
        	line-height: 35px;
        	box-shadow: 1px 2px 2px #eee;
		    margin-bottom:10px ;
        }
        ul {
        	display: flex;
        	justify-content: start;
        	flex-wrap: wrap;
        	li {
    		    width: 23.33%;
			    text-align: center;
			    line-height: 30px;
			    border: 1px solid #ccc;
			    border-radius: 8px;
			    margin-bottom:10px ;
			    margin-left: 4px;
			    a {
		    	    display: block;
					border-radius: 8px;
			    }
        	}
        }
	}
	/*图片懒加载*/
	image[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	/*图片显示*/
	#classify-pics {   
	    li {
    	    border-bottom: 1px solid #eee;
    	    line-height: 35px;
    	    a {
    	    	display: block;
    			padding: 10px;
    			strong {
    				position: relative;
    				display: block;
    				i {
    					font-family: 'iconfont';
    					position: absolute;
					    right: 10px;
					    top:3px;
					    font-style: normal;
					    display: block;
					    width:20px;
					    height:20px;
    				}
    			}
    	    }
	    }
	}
</style>