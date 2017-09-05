<template>
   <div class="flex">
   	 <div class="left">
   	 	<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 标签设置</el-breadcrumb-item>
                <!--<el-breadcrumb-item>文章编辑</el-breadcrumb-item>-->
            </el-breadcrumb>
     	</div>
     
   		<el-table v-loading="isLoading" element-loading-text="拼命加载中" :data="tagDataTab" border style="width:100%" ref="multipleTable" >
            <el-table-column prop="creatDate" header-align="left" align="center" label="日期" sortable width="190">
            	<template scope="scope">
			        <el-icon name="time"></el-icon>
			        <span>{{ scope.row.creatDate }}</span>
			      </template>
            </el-table-column>
            <el-table-column prop="tagName" label="标签名"    align="center" >
            </el-table-column>
           
            <el-table-column label="操作" width="100"  align="center" >
                <template scope="scope">
                    
                    <el-button size="small" type="danger" icon="delete"
                            @click="tagDelete(scope.$index, scope.row,false)">删除</el-button>
                  
                </template>
            </el-table-column>
            
        </el-table>
        <div class="btns"><el-button type="success" @click="addTag(false)">添加标签</el-button></div>
   	</div> 
   	<div class="right">
   		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 分类设置</el-breadcrumb-item>
                <!--<el-breadcrumb-item>文章编辑</el-breadcrumb-item>-->
            </el-breadcrumb>
     	</div>
     
   		<el-table :data="classifyDataTab" border style="width:100%" ref="multipleTable" >
            <el-table-column prop="creatDate" header-align="left" align="center" label="日期" sortable width="190">
            	<template scope="scope">
			        <el-icon name="time"></el-icon>
			        <span>{{ scope.row.creatDate }}</span>
			      </template>
            </el-table-column>
            <el-table-column prop="classIfyName" label="分类名"    align="center" >
            </el-table-column>
           
            <el-table-column label="操作" width="100"  align="center" >
                <template scope="scope">
                    
                    <el-button size="small" type="danger" icon="delete"
                            @click="tagDelete(scope.$index, scope.row,true)">删除</el-button>
                 
                </template>
            </el-table-column>
            
        </el-table>
   		
        <div class="btns"><el-button type="info" @click="addTag(true)">添加分类</el-button></div>
   		
   	</div> 
   	
   	 
   </div> 
</template>

<script>
    import utils from '../../utils';
    export default {
        data (){
            return {
                tagDataList:[],
                classifyDataList:[],
                isLoading:true
            }
        },
        
        created:function(){
        	this.getTagData();
        	this.getCalssifyData();
        	var _this = this;
//      	var b = this.$loading({fullscreen:false})
//      	setTimeout(()=>{b.close()},2000)
        },
        
        computed: {
         	tagDataTab(){
                const self = this;
                return self.tagDataList.filter(function(d){
                	d.creatDate = (new Date(d.creatDate)).format("yyyy-M-d h:m:s")
                    return d;
                })
           	},
           	classifyDataTab(){
                const self = this;
                return self.classifyDataList.filter(function(d){
                	d.creatDate = (new Date(d.creatDate)).format("yyyy-M-d h:m:s")
                    return d;
                })
            }
        	
         },
         methods: {
           	getTagData(){
                let self = this;
                self.$axios.post('/api/tag/get').then((res) => {
                    self.tagDataList = res.data.data;
                    self.isLoading = false
                })
				
            },
            getCalssifyData(){
                let self = this;
                self.$axios.post('/api/classify/get').then((res) => {
                    self.classifyDataList = res.data.data;
                })
				
            },
            tagDelete(a,b,c){
            	//c 为false是标签删除   为true 是分类删除
            	let params = {id:b.tagId}
            	let str = 'tag'
            	if(c){
            		params.id = b.classIfyId
            		str = 'classify'
            	}
            	
            	let self = this;
            	self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
	            	self.$axios.post(`/api/${str}/removeById`,params).then((res) => {
	            	 	if(res.data.status == 1){
	            	 		c ? self.getCalssifyData() : self.getTagData()
	            	 		self.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
	            	 	}else{
	            	 		 self.$message({
					            type: 'error',
					            message: '删除失败！'
					          }); 
	            	 	}
	                })
			    }).catch(()=>{
                	self.$message({
		            	type: 'info',
		            	message: '已取消删除'
		          	});  
                })
            },
            addTag(a){
            	let self = this;
            	
        	  	self.$prompt('请输入标签名', '添加', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/
		        }).then(({ value }) => {
		        	
		        	let params = {tagName:value}
	            	let str = 'tag'
	            	if(a){
	            		params = {classifyName:value}
	            		str = 'classify'
	            	}
		        	
		        	self.$axios.post(`/api/${str}/add`,params).then((res) => {
	            	 	if(res.data.status == 1){
	            	 		a ? self.getCalssifyData() : self.getTagData()
		        			self.$message({
					            type: 'success',
					            message: "添加成功！"
					        });
	            	 	}else{
	            	 		self.$message({
					            type: 'error',
					            message: res.data.data
					        });
	            	 	}
	            	})
		        }).catch(() => {
		          	self.$message({
		            	type: 'info',
		            	message: '取消输入'
		          	});       
		        });
            }
        }
    }
</script>
<style type="text/css"  >
	.markdown-editor{
		margin-top: 12px;
	}
	.flex{
		display: flex;
		justify-content:space-between
	}
	.flex .left,.flex .right{
			width:48%;
		}
	.btns{
		text-align: center;
		padding:30px 0;
	}
	.left .crumbs,.right .crumbs{
		position: relative;
		padding-left:10px;
	}
	.left .el-breadcrumb,.right .el-breadcrumb{
		line-height: 2;
	}
	.left .crumbs:before,.right .crumbs:before{
		content: '';
		width:5px;
		display: inline-block;
		position: absolute;
		left:0;
		height: 25px;
		top:0;
		background-color: #654;
	}
	.right .crumbs:before{
		background-color: salmon;
	}
	.el-message-box__errormsg{
		display: none !important;
	}
</style>