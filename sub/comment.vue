<template>
   <div class="app-comment">
        <h1>评论子组件</h1>
        <hr/>
        <textarea placeholder="请发表您的看法。。。。" maxlength="120" v-model="msg"></textarea>
        <mt-button size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
            <div class="cmt-info">第{{i+1}}楼  用户:{{item.user_name}}发表时间：{{item.ctime}}</div>
            <div class="cmt-body">{{item.content}}}</div>
            </div>
            <mt-button size="large" @click="getMore">加载更多</mt-button>
        </div>
   </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default{
    data(){
        return {
            msg:'',
            pageIndex:0,
            pageSize:4,
            list:[],
        }
    },
    props:['id'],
    methods:{
        getMore(){
            this.pageIndex++;
           // if(!this.hasMore)return
            var p=this.pageIndex;
            var s=this.pageSize;
            var id=this.id;
            console.log(11);
            var url='getcomment?nid='+id+'&pno='+p+'&pageSize='+s;
            this.$http.get(url).then(result=>{
                console.log(result);
                var row=this.list.concat(result.body.data);
                this.list=row;
               // this.pageCount=result.body.pagecount
                
            })
        },
        
        postComment(){
            var nid=this.id;
            var pmsg=this.msg;
            if(pmsg.trim().length==0){
                Toast('评论不能为空');
                return;
                }
                var url='postcomment';
                this.$http.post(url,{nid:nid,msg:pmsg}).then(result=>{
                //console.log(result);
                Toast('评论成功');
                this.pageIndex=0;
                this.list=[];
                this.getMore();
                });
        },
        
    },  
    created(){
           // console.log(456123)
        this.getMore();
        },  
}
</script>
<style>
.app-comment h1{
    font-size:18px;
}
.app-comment textarea{
    font-size:14px;
    height:85px;
    margin:0;
}
.app-comment .cmt-list{
    margin:5px 0; 
}
.app-comment .cmt-list .cmt-info{
    line-height:30px;
    background:#ccc;
}
.app-comment .cmt-list .cmt-body{
    line-height:35px;
    text-indent:2em
}

</style>
