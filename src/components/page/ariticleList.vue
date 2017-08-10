<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章列表</el-breadcrumb-item>
                <el-breadcrumb-item>全部文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-button type="success" icon="" class="handle-del mr10 mr" @click="delAll">批量发布</el-button>
            <el-select v-model="select_cate" placeholder="选择标签" class="handle-select mr10 ">
                <el-option key="1" label="javascript" value="javascript"></el-option>
                <el-option key="2" label="html" value="html"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="标题关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="dataTab" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"   align="center" ></el-table-column>
            <el-table-column prop="creatDate" header-align="left" align="center" label="日期" sortable width="170">
            	<template scope="scope">
			        <el-icon name="time"></el-icon>
			        <span>{{ scope.row.creatDate }}</span>
			      </template>
            	
            </el-table-column>
           
            <el-table-column prop="categories" label="分类" width="80"   align="center" >
            </el-table-column>
            <el-table-column prop="status" label="状态" width="70"  align="center" >
            </el-table-column>
            
            <el-table-column prop="isDraft" label="草稿" width="70"  align="center" >
            </el-table-column>
            <el-table-column prop="tag" label="标签"   width="180" align="center">
            	<template scope="scope">
		         	<label slot="reference"  v-for="tab in scope.row.tag" class="name-wrapper">
		            <el-tag type="primary">{{ tab }}</el-tag>
		          	</label>
		        
            	 </template>
            </el-table-column>
            <!--:formatter="formatter"-->
            <el-table-column prop="title" label="标题" >
            </el-table-column>
            <el-table-column label="操作" width="180"  align="center" >
                <template scope="scope">
                    <el-button size="small" icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" icon="delete"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  
                </template>
            </el-table-column>
            
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="pageCtr.pageSize"
                    :total="pageCtr.pageCunt">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
	
	
    import utils from '../../utils';
    export default {
        data() {
            return {
                url: '/static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                
                
                pageCtr: {}
            }
        },
        created(){
            this.getData();
        },
        computed: {
            dataTab(){
                const self = this;
                return self.tableData.filter(function(d){
                	
                	d.creatDate = (new Date(d.creatDate)).format("yyyy-M-d h:m:s")
                	d.status = d.status == 1 ? '可见': '不可见'
                	
                	d.isDraft = d.isDraft == 1 ? '是': '否'
//              	var arr = d.tag.split(',')
//              	var obj = {}
//              	for(var i =0; i<arr.length;i++){
//              		obj
//              	}
                	
                	d.tag =  d.tag.split(',')
                    return d;
                })
            }
        },
        methods: {
            handleCurrentChange(val){
            	 let self = this;
                this.cur_page = val;
                self.$axios.post('/api/article/getArticleList',{pageCur:val}).then((res) => {
                    self.tableData = res.data.data;
                    self.pageCtr = res.data.pageParams
                })
            },
            getData(){
                let self = this;
                self.$axios.post('/api/article/getArticleList').then((res) => {
                    self.tableData = res.data.data;
                    self.pageCtr = res.data.pageParams
                })
				
            },
            search(){
                this.is_search = true;
            },
//          formatter(row, column) {
//              return row.address;
//          },
//          filterTag(value, row) {
//              return row.tag === value;
//          },
            handleEdit(index, row) {
            	this.$router.push(`ariticleEdit/${row.articleId}`)
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
            	let self = this;
            	self.$axios.post('/api/article/delArticle',{id:row.articleId}).then((res) => {
                    if(res.data.status==1){
                    	this.$message.error('删除成功');
                    	self.handleCurrentChange(self.cur_page)
                    }else{
                    	this.$message.error('删除失败');
                    }
                })
            	
                
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style >
	
	.el-table .cell{
		padding-left: 10px !important;
		padding-right: 10px !important;
	}
	.name-wrapper+.name-wrapper{
		margin-left: 8px;
	}
	
	.mr{
		margin: 0 10px;
	}
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>