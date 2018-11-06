<template>
   <div  class="app-goodsinfo">
   <!--1商品的轮播区域-->
          <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper-box :list="imglist"></swiper-box>
					</div>
				</div>
			</div>
   <!--2商品的购买区域-->
             <div class="mui-card">
				<div class="mui-card-header">{{info.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                             市场价：<del>￥{{info.old}}</del>
                             销售价：<span class="now">{{info.now}}</span>
                        </p>
                        <p>
                            购买份数：
                            <div class="mui-numbox" >
					           <button class="mui-btn mui-btn-numbox-minus" type="button" @click='goodSub()'>-</button>
					           <input  class="mui-input-numbox" type="number" v-model="val"/>
					           <button class="mui-btn mui-btn-numbox-plus" type="button" @click='goodAdd()'>+</button>
				            </div>
                        </p>
                        <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button  type="danger" size="small" @click="addCartTo()">加入购物车</mt-button>
                        </p>
					</div>
				</div>
				<div class="mui-card-footer"></div>
			</div>
    <!--3商品的参数区域--> 
            <div class="mui-card">
				<div class="mui-card-header">锅底参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                         <p>锅底每天至少热卖：{{info.pid}}份</p>
                         <p>锅底口味：有多好吃就有多好吃</p>
                         <p>锅底配料：绿色天然无公害，都是自家种的好果蔬</p>
					</div>
				</div>
				<div class="mui-card-footer"></div>
			</div>
   </div>
</template>
<script>
import {Toast} from 'mint-ui'
import swiper from '../sub/swiper.vue';
     export default{
         data(){
             return {
                 imglist:[],
                 info:{},
                 val:6
             }
         },
         methods:{
             addCartTo(){
                 var id=this.$route.params.id;
                 var count=this.val;
                 this.$http.get('addCart?pid='+id+'&count='+count).then(result=>{
                     if(result.body.code==1){
                         this.$store.commit('increment',count)
                         Toast(result.body.msg);
                     }else{
                         Toast(result.body.msg)
                     }
                     console.log(result);
                 })
             },
            getImageList(){
                this.$http.get('goodsinfoimagelist').then(result=>{
                this.imglist=result.body;
               })
            },
            getGoodInfo(){
                var id=this.$route.params.id;
                console.log(id);
                this.$http.get('goodsinfo?id='+id).then(result=>{
                        console.log(result.body[0]);
                        this.info=result.body[0];
                   })
            },
            goodSub(){
                if(this.val>1){this.val--}
            },
            goodAdd(){
                if(this.val<999){this.val++}
            },
         },
         created(){
                this.getImageList();
                this.getGoodInfo();

                 
         },
         components:{
                "swiper-box":swiper
         },
     }
</script>
<style>
</style>