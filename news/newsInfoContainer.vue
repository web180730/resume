<template>
  <div class="app-newsinfo">
      <h3>{{info.title}}</h3>
      <div>{{info.content}}</div>
      <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import comment from '../sub/comment.vue'
export default{
    data(){
        return {
            info:{},
            id:this.$route.query.id
        }
    },
    methods:{
        getNewsInfo(){
            var url="http://127.0.0.1:5000/newsinfo";
            this.$http.get(url).then(result=>{
                console.log(result.body);
                this.info=result.body;
            })
        }
    },
    created(){
        console.log(123)
        this.getNewsInfo();
    },
    components:{
        'comment-box':comment
    },
}
</script>
<style>
</style>