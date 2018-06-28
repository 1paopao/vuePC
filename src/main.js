import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
//引入mintui
import MintUI from 'mint-ui';
//引入路由
import VueRouter from 'vue-router';
import Resource from 'vue-resource';
//请求数据
import Vuex from 'vuex';
import $ from 'jquery';

import 'mint-ui/lib/style.css';



//底部的tab
import My   from './components/my.vue';
import Home from './components/home.vue';
import Detail from './components/detail.vue';
import Search from './components/search.vue';
import Collect from './components/collect.vue';
import Classifylist from './components/classifylist.vue';
import Test from './components/test.vue';


//用MintUI
Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(Resource);
Vue.use(Vuex);


//配置路由规则
var routes = [
	{path:'/my',component:My},
	{path:'/home',component:Home},
	{path:'/detail',component:Detail},
	{path:'/search',component:Search},
	{path:'/collect',component:Collect},
	{path:'/classifylist',component:Classifylist},
	{path:'/test',component:Test},
	{path:'/',redirect:'/home'}
]


var router = new VueRouter({
	routes:routes
})

//将共享的数据存在store里面
var store = new Vuex.Store({
	state:{        //存放数据
		count:[]
	}
})


new Vue({
  el: '#app',
  store:store,
  router:router,
  render: h => h(App)
})
