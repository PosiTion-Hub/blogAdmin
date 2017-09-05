<template>
   <div class="flex">
   	 <div class="left">
   	 	<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 标签设置</el-breadcrumb-item>
                <!--<el-breadcrumb-item>文章编辑</el-breadcrumb-item>-->
            </el-breadcrumb>
     	</div>
     
   		<el-table :data="dataTab" border style="width:100%" ref="multipleTable" >
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
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  
                </template>
            </el-table-column>
            
        </el-table>
        <div class="btns"><el-button type="success">添加标签</el-button></div>
   	</div> 
   	<div class="right">
   		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 分类设置</el-breadcrumb-item>
                <!--<el-breadcrumb-item>文章编辑</el-breadcrumb-item>-->
            </el-breadcrumb>
     	</div>
     
   		<el-table :data="dataTab" border style="width:100%" ref="multipleTable" >
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
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  
                </template>
            </el-table-column>
            
        </el-table>
   		
        <div class="btns"><el-button type="info">添加分类</el-button></div>
   		
   	</div> 
   	
   	 
   </div> 
</template>

<script>
    import utils from '../../utils';
    export default {
        data (){
            return {
                dataList:[] 
            }
        },
        
        created:function(){
        	this.getData();
        	var _this = this;
        	var b = this.$loading({fullscreen:false})
        	setTimeout(()=>{b.close()},2000)
        },
        
         computed: {
         	 dataTab(){
                const self = this;
                return self.dataList.filter(function(d){
                	d.creatDate = (new Date(d.creatDate)).format("yyyy-M-d h:m:s")
                    return d;
                })
            }
        	
         },
         methods: {
           getData(){
                let self = this;
                self.$axios.post('/api/tag/get').then((res) => {
                	console.log(res.data.data)
                    self.dataList = res.data.data;
                })
				
            },
        }
    }
</script>
<style type="text/css" scoped >
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
</style>