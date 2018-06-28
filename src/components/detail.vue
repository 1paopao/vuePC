<template>
	<div id="detail">
		<!--头部-->
		<mt-header fixed :title="str" style="z-index: 3;">
		  <router-link :to="{path:'/classifylist',query:{id:oMsg.classid}}" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
		
		<div class="detail-box">
			<div class="tit">
				<h3>{{oMsg.name}}</h3>
				<p>标签:<span>{{oMsg.tag}}</span></p>
			</div>
			<div class="pic">
				<img :src="oMsg.pic" alt="" />
				<p @click='save(oMsg.id)' class="colle">&#xe627;&nbsp;</p>
				<mt-popup
					  v-model="popupVisible"
					  popup-transition="popup-fade"
					  position="center">
					     已收藏
				</mt-popup>
			</div>
			<div class="msgs">
				<div class="simple">
					<h4>简介</h4>
					<p v-html='oMsg.content'></p>
				</div>
				<div class="times">
					<h4>时间与份量</h4>
					<table>
						<tr>
							<td><span>制作时常：</span><span>{{oMsg.preparetime}}</span></td>
							<td><span>用餐人数：</span><span>{{oMsg.peoplenum}}</span></td>
						</tr>
					</table>
				</div>
				<div class="sc">
					<h4>食材</h4>
					<div class="zl">
						<p><strong>主料</strong></p>
						<ul>
							<li v-for='item in typeone'><span>{{item.mname}}：</span><span>{{item.amount}}</span></li>
						</ul>
					</div>
					<div class="fl">
						<p><strong><strong>辅料</strong></strong></p>
						<ul>
							<li v-for='item in typezreo'><span>{{item.mname}}：</span><span>{{item.amount}}</span></li>
						</ul>
					</div>
				</div>
				<ul class="step">
					<li v-for='(item,i) in oMsg.process'>
						<img :src="item.pic" alt="" />
						<p>
							<span>{{i+1}}.</span>
							<span v-html="item.pcontent"></span>
						</p>
					</li>
				</ul>
			</div>
		</div>
		<!--加载按钮-->
		<mt-spinner type="double-bounce" color="#26a2ff" :size="60" style='position: absolute;left: 45%;top: 40px;' class='circle'></mt-spinner>
	</div>
</template>

<script>
	
	export default {
		name:'detail',
		data:function() {
			return {
				str:'制作详情',
				oMsg:{},
				typeone:[],
				typezreo:[],
				popupVisible:false
			}
		},
		methods:{
			//收藏
			save(id) {
				var 
					sid = id,   //菜谱的id
					_this = this,
					sColle = document.getElementsByClassName('colle')[0];
				
				//修改字体的颜色
				sColle.style.color = '#26a2ff';
				//将收藏的商品的id存放在数组中	
				this.$store.state.count.push(sid);
				//数组去重，防止点击多次存相同的id
				this.$store.state.count = Array.from(new Set(this.$store.state.count));
				this.popupVisible = true;
				//定时的关闭弹框
				setInterval(function(){
					_this.popupVisible = false;
				},800);
			}
		},
		mounted() {   //页面加载获取id
			//推送事件
			this.$emit('to-parent',this.str);
			
			var 
				_this = this,
				sId   = this.$route.query.sid,
				sCircle = document.getElementsByClassName('circle')[0],  //获取圆圈的节点
				sBox  = document.getElementsByClassName('detail-box')[0],
				surl  = 'http://api.jisuapi.com/recipe/detail?id='+sId+'&appkey=efc2ab8cfc753101';
			
			sBox.style.opacity = 0;
			//先加载小图标
			setInterval(function(){
				//修改属性
				sCircle.style.display = 'none';
				sBox.style.opacity = 1;
			},5000);
			
			
			//加载数据
			this.$http.jsonp(surl)
				.then(function(res) {
					var aData = res.body.result;
					_this.oMsg = aData;
					//遍历数组
					aData.material.forEach(function(el,v){
						if(el.type === '1') {  //主料信息
							//将符合对象的信息放进去
							_this.typeone.push(el);
						} else {
							_this.typezreo.push(el);
						}
					})
				})
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.detail-box {
	    padding: 10px;
    	overflow: hidden;
    	.tit {
    		h3 {
    			line-height: 20px;
    		}
    		p {
    			line-height: 35px;
    		}
    	}
    	.pic {
    		overflow: hidden;
    		img {
    			width: 100%;
    		}
    		p {
    			font-family: 'iconfont';
			    float: right;
			    width:30px;
			    height:30px;
			    text-align: center;
    			line-height: 30px;
			    margin-right: 28px;
    		}
    		.mint-popup{
    			padding: 20px;
			    border-radius: 8px;
			    opacity: 0.7;
			    color: #000;
    		}
    	} 
    	.msgs {
    		div {
    			padding-bottom: 20px;
    			border-bottom: 1px dashed #ddd;
    		}
    		h4 {
    			line-height: 40px;
    		}
    		table {
    			border-collapse: collapse;
			    width: 100%;
				border: 1px solid #ccc;
    		}
    		.simple {
    			
    		}
    		.times {
    			td {
    				border: 1px solid #ddd;
    				line-height: 27px;
    				span:nth-child(1) {
    					float: left;
    				}
    			}
    		}
    		.sc {
    			div {
    				p {
    					line-height: 30px;
					    background: #ccc;
					    padding: 10px;
    				}
    				ul {
					    border: 1px solid #ddd;
					    li {
					    	border-bottom: 1px dashed #ddd;
						    line-height: 25px;
						    padding: 10px;
					    }
    				}
    			}
    		}
    		.step {
    			overflow: hidden;
    			li {
				    padding: 15px 0;
				    overflow: hidden;
				    border-bottom: 1px dashed #ddd;
				    img {
			    	    float: left;
					    width: 45%;
					    height: 150px;
				    }
				    p {
		    	        float: left;
					    margin-left: 20px;
					    font-size: 16px;
					    color: #26a2ff;
					    width: 48%;
				    }
    			}
    		}
    	}
	}
</style>