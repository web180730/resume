const express=require('express');
const pool=require('./pool')
const cors=require('cors');
var app=express();
app.use(express.static(__dirname+'/public'));
app.listen(5000);
app.use(cors({
    origin:["http://127.0.0.1:3001","http://localhost:3001"],
    credentials:true
}))
app.get('/imagelist',(req,res)=>{
    var obj=[{id:1,img_url:'http://127.0.0.1:5000/img/1.jpg'},
    {id:2,img_url:'http://127.0.0.1:5000/img/3.jpg'},
    {id:3,img_url:'http://127.0.0.1:5000/img/6.jpg'},
    {id:4,img_url:'http://127.0.0.1:5000/img/7.jpg'}];
    res.send(obj);
})
app.get('/goodsinfoimagelist',(req,res)=>{
    var obj=[{id:1,img_url:'http://127.0.0.1:5000/img/guo1.jpg'},
    {id:2,img_url:'http://127.0.0.1:5000/img/guo2.jpg'},
    {id:3,img_url:'http://127.0.0.1:5000/img/guo3.jpg'},
    {id:4,img_url:'http://127.0.0.1:5000/img/guo4.jpg'}];
    res.send(obj);
})
app.get('/newslist',(req,res)=>{
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    var sql='select count(id) as c from wds_news';
    var obj={};
    var progress=0;
    pool.query(sql,(err,result)=>{
       if(err)throw err;
       var c=Math.ceil(result[0].c/pageSize);
       obj.pageCount=c;
       progress+=50;
       if(progress==100){res.send(obj);}
    });
    var sql=' select id,title,img_url,ctime,point';
    sql+=' from wds_news';
    sql+=' limit ?,?';
    var offset=parseInt((pno-1)*pageSize);
    pageSize=parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err)throw err;
        obj.data=result;
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
       })
});



app.get("/newsinfo",(req,res)=>{
    var obj={
        title:'海底捞大优惠，白菜价',
        content:'100/位 快快来啊'
    };
    res.send(obj);

})


app.post('/postcomment',(req,res)=>{
     req.on("data",(buf)=>{
         var str=buf.toString();
         var obj=JSON.parse(str);
         var msg=obj.msg;
         var nid=parseInt(obj.nid);
         var sql="insert into wds_comment(content,user_name,ctime,nid) values(?,'匿名',now(),?)";
         pool.query(sql,[msg,nid],(err,result)=>{
             if(err)throw err;
             res.send({code:1,msg:"添加成功"});
         });
     })
   /* var nid=req.body.nid;
    var msg=req.body.msg;
    console.log(nid);
    console.log(msg);*/
})



app.get("/getcomment",(req,res)=>{
    var nid=parseInt(req.query.nid);
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    var sql=" select count(id) as c from wds_comment";
        sql+=" where nid=?";
    var obj={};
    var progress=0;
    pool.query(sql,[nid],(err,result)=>{
        if(err)throw err;
        var c=Math.ceil(result[0].c/pageSize);
        obj.pageCount=c;
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
    });
    var sql='select id,content,ctime,user_name,nid'; 
        sql +=' from wds_comment';
        sql +=' where nid=? order by id desc';
        sql +=' limit ?,?';
    var offset=parseInt((pno-1)*pageSize);
    pageSize=parseInt(pageSize);
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
        if(err)throw err;
        obj.data=result;
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
    })

});

app.get("/goodsinfo",(req,res)=>{
    var id=req.query.id;
    var sql='select title,now,old,pid'; 
        sql +=' from wds_goodsinfo';
        sql +=' where id=? ';
    pool.query(sql,[id],(err,result)=>{
          if(err) throw err;
          res.send(result);
    });
   /* var obj=[{id:id,title:'香浓番茄锅底',now:98,old:258,pid:8888},
             {id:id,title:'鲜香菌汤锅底',now:88,old:158,pid:6666},
             {id:id,title:'经典三鲜锅底',now:78,old:98,pid:5555},
             {id:id,title:'清油麻辣锅底',now:68,old:88,pid:2222},];
    res.send(obj);*/
});




//功能7：购物车数据列表
app.get('/shopCart',(req,res)=>{
    var obj=[];
    obj.push({id:1,title:'香浓番茄锅底',price:98,count:1});
    obj.push({id:2,title:'鲜香菌汤锅底',price:88,count:1});
    obj.push({id:3,title:'经典三鲜锅底',price:78,count:1});
    res.send(obj);
})

app.get('/addCart',(req,res)=>{
    var pid=req.query.pid;
    var count=req.query.count;
    var reg=/^[0-9]{1,}/;
    if(!reg.test(pid)){
        res.send({code:-1,msg:'参数有误'});
        return;
    }
    if(!reg.test(count)){
        res.send({code:-2,msg:'商品数量参数有误'});
        return;
    }
    res.send({code:1,msg:'添加成功'})
})


app.get('/login',(req,res)=>{
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    sql='select count(id) as c from wds_user  where uname=? and upwd=md5(?) ';
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)throw err;
      // res.send(result);
        if(result[0].c==0){
            res.send({code:-1,msg:'用户名或密码有误'})
        }else{
            res.send({code:1,msg:'登陆成功'})
        }
    });
});



