<template>
   <div class="app-photocontainer">
   <!--mui card-->
   <!--懒加载图片列表-->
        <div class="mui-card">
		    <div class="mui-card-content">
			    <div class="mui-card-content-inner">
			        <ul  class="photo-list">
                        <li v-for="item in list">
                            <img v-lazy="item.img_url">
                        </li>
                    </ul>
			     </div>
		    </div>		
	    </div>
   </div>
</template>
<script>
     export default{
        data(){
             return{
                 list:[],
             }
        },
        created(){
             this.getImage();
        },
        methods:{
            getImage(){
                 this.$http.get('imagelist').then(result=>{
                 this.list=result.body;
                 })
            },
        },
     }
</script>
<style>
.photo-list{
     list-style:none;
     background:#333;
     padding-left:0px;
}
.photo-list li img{
    width:100%;
}
/*lazyload组件专用样式*/
.photo-list li img[lazy=loading]{
    width:100%;
    height:100px;
    margin:auto;
}
</style>