<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 自述鸡汤</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>每日一点心灵鸡汤！！</h3>
            <article>
               <ul>
               	<input type="file" accept="*/jpg" name="" id="" value="测试上传图片" @change="publish" />
               	<li >
               		如果，感到此时的自己很辛苦，那么告诉自己：容易走的都是下坡路。坚持住，因为你正在走上坡路，走过去，你就一定会有进步。如果，你正在埋怨命运不眷顾，开导自己：命，是失败者的借口；运，是成功者的谦词。命运从来都是掌握在自己的手中，埋怨，只是一种懦弱的表现；努力，才是人生的态度。
               	</li>
               		<li>
               			坚持奋斗的人生，在每个人看来，也许很积极，很宝贵。在大街上，每个人为着自己的人生，事业。在奋斗，在努力，在坚持。可是又有几个能成为家喻户晓的人，又有几个能拼搏，奋斗出属于自己的人生。
               	</li>
               		<li>
爱一个人太难，那为什么不等别人爱你呢？什么选择你爱还是爱你，这都是胡扯，人生里只是嫁一个人而已，当然是要选个你爱并且爱你的人，缺一不可。你以为单向的爱情可以，其实错了啊。我们寻寻觅觅那么久的，是找相互热爱的那个人。婚姻是种取暖，必须要相互给温暖。               	</li>
               		<li>
把精力用到学习上和实际的工作中，只有不断的用知识充实自己，武装自己的头脑，同事才能认同你，领导更不会小瞧你，社会也不会淘汰你。               	</li>
               		<li>
【人生交际四定律】1、沉默定律：遇到不该争的人或事，最好的选择是沉默。2、失忆定律：赶上特殊的情境与环境，最没有后果的回答就是“我忘了”。3、微笑定律：谈话或谈判时遇到了难缠的对手又不好回避时，最好的应对是微笑;4、感怀定律：对方烦躁时递给他一支烟或一杯水，气氛就会缓解。               	</li>
               </ul>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        },
        created:function(){
			
        },
        methods: {
//          async publish(msg) {
//          	console.log(111)
//          	var data = await self.$axios.post('/api/upload/file')
//          }
            
             publish(e) {
            	
            	console.log(this)
            	
            	  let file = e.target.files[0];           
		          let param = new FormData(); //创建form对象
		          param.append('file',file,file.name);//通过append向form对象添加数据
		          param.append('chunk','0');//添加form表单中其他数据
		          console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
		          let config = {
		            headers:{'Content-Type':'multipart/form-data'}
		          };  //添加请求头
		          this.$axios.post('/api/upload/file',param,config)
		          .then(response=>{
		            console.log(response.data);
		          })  
            	
            	
            }
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
    .ms-doc li{
    	padding: 10px;
    }
</style>