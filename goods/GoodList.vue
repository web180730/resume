<template>
     <div class="app-goodslist">
         <div class="goods-item" v-for="item in list" :key="item.id">
               <img src="http://127.0.0.1:5000/img/content1.jpg" @click="getDetail(item.id)">
               <h3>{{item.title}}</h3>
               <div class="info">
                     <p class="price">
                         <span class="now">{{item.now}}</span>
                         <span class="old">{{item.old}}</span>
                     </p>
                     <p class="sell">
                          <span>热卖中</span>
                          <span>每天至少热卖{{item.q}}份</span>
                     </p>
               </div>
         </div>
     </div>
</template>
<script>
      export default{
          data(){
             return {
                 list:[
                    {id:1,title:'香浓番茄锅底',now:'98',old:'258',q:500},
                    {id:2,title:'鲜香菌汤锅底',now:'88',old:'158',q:600},
                    {id:3,title:'经典三鲜锅底',now:'78',old:'98',q:220},
                    {id:4,title:'清油麻辣锅底',now:'68',old:'88',q:500},
                 ]
             }
          },
          methods:{
             getDetail(id){
               // console.log(id)
                this.$router.push('/home/goodsinfo/'+id)
             },
             
          },
      }
</script>
<style>
.app-goodslist{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    padding:7px;
}
.app-goodslist .goods-item{
    width:49%;
    border:1px solid #ccc;
    box-shadow:0 0 8px #ccc;
    margin:4px 0;
    padding:2px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    min-height:293px;
}
.app-goodslist .goods-item h3{
     font-size:20px;
}
.app-goodslist .goods-item img{
    width:100%;
}
.app-goodslist .goods-item .now{
    color:red;
    font-weight:bold;
    font-size:16px;
}
.app-goodslist .goods-item .old{
    font-size:12px;
    text-decoration:line-through;
    margin-left:10px;
}
</style>