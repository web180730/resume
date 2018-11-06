<template>
    <div class='app-logincontainer'>
         <form action="#">
             <input type="text"  name="uname" v-model="unameval">
             <input type="password" name="upwd" v-model="upwdval">
             <input type="button" id='btn' value="登录"@click='btnSubmit()'>
         </form>
    </div>
</template>
<script>
import{Toast} from 'mint-ui'
    export default{
        data(){
            return {
                unameval:'',
                upwdval:''
            }
        },
        methods:{
            btnSubmit(){
                var u=this.unameval;
                var p=this.upwdval;
                this.$http.get('login?uname='+u+'&upwd='+p).then(result=>{
                    //console.log(result)
                    if(result.body.msg==1){
                        Toast(result.body.msg)
                        this.$router.push('/');
                    }else{
                        Toast(result.body.msg);
                    }
                })
            },
        },
    }
</script>
<style>
</style>