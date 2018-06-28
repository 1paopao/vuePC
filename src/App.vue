<template>
  <div id="app">
  	<!--头部-->
   <!-- <mt-header fixed :title="str" style="z-index: 3;">
		  <router-link to="/" slot="left">
		   <!-- <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>-->
    
    <!--内容-->
    <section>
    <!--	<router-view @to-parent='getdata'>
    	</router-view>-->
    	
    	<router-view></router-view>
    </section>
    <!--底部-->
    <footer>
    	<!--底部路由-->
    	<span><i>&#xe631;</i><router-link to='/home'>首页</router-link></span>
    	<span><i>&#xe627;</i><router-link to='/collect'>收藏</router-link></span>
    	<span><i>&#xe630;</i><router-link to='/my'>咨询</router-link></span>
    	<!--<span><i>&#xe630;</i><router-link to='/test'>练习</router-link></span>-->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    	str:''
    }
  },
  methods:{
  	//点击底部，进行头部的更换
  	/*getdata(msg) {
  		this.str = msg;
  	}*/
  }
}
</script>

<style lang="scss">
	body,html {
		width:100%;
		height: 100%;
    font-family: 'iconfont'; 
	}
	
	#app {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	footer {
		width: 100%;
		height: 45px;
		background: #26a2ff;
		text-align: center;
		line-height: 45px;
    position: fixed;
    bottom: 0;
		span {
			float:left;
			width:33.33%;
			/*width:21%;*/
			i {
			    display: block;
			    width: 40px;
			    height: 10px;
			    font-family: 'iconfont';
			    margin:-10px 0 10px 43px;
			    color: #fff;
			    font-style: normal;
			    font-size: 20px;
			}
			a {
				color: #fff;
			}
			&:hover {
				a,i {
					font-weight: 600;
				}
			}
		}
	}
	section {
		flex: 1;
		margin-top: 40px;
		margin-bottom: 60px;
	}

</style>
