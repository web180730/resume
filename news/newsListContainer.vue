<template>
   <div class="app-newslist">
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media"v-for="item in list" :key="item.id" >
					<router-link  :to="'/home/newsinfo?id='+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
                               <span>{{item.ctime | dateTime()}}</span>
                               <span>点击{{item.point}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
   </div>
</template>
<script>
    export  default{
        data(){
            return {
                list:[],
                pageIndex:0,
                pageSize:4,
                hasMore:true,
                pageCount:2,
            }
        },
        methods:{
            getMore(){
            this.pageIndex++;
            this.hasMore=this.pageIndex <= this.pagecount;
            var url="http://127.0.0.1:5000/newslist";
            url+="?pno="+this.pageIndex+"&pageSize="+this.pageSize;
            this.$http.get(url).then(result=>{
                console.log(result);
                var row=this.list.concat(result.body.data);
                this.list=row;
                this.pageCount=result.body.pageCount;
            })
          }
        },
        created(){
            //console.log(123)
            this.getMore();
        }
    } 
</script>
<style>
  .app-newslist  .mui-table-view  .mui-ellipsis{
      font-size:12px;
      color:#226aff;
      display:flex;
      justify-content:space-between;
  }
</style> 
