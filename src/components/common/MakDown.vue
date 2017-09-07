<template>
    <div class="Editor">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 文章列表</el-breadcrumb-item>
                <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :rules="rules" :model="form" label-width="95px">
                <el-form-item label="文章标题：" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="分类：" prop="classify">
                    <el-select v-model="form.classify" placeholder="请选择">
                    	<template v-for="ify in classifyData">
                    		<el-option :key="ify.classIfyName" :label="ify.classIfyName" :value="ify.classIfyName"></el-option>
                    	</template>
                      
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" >
                    <el-switch on-text="" off-text="" v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item label="标签：" prop="tags">
                    <el-checkbox-group v-model="form.tags">
						<template v-for="item in tagData">
	                    	<el-checkbox  :label="item.tagName" name="type" ></el-checkbox>
						</template>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="文章描述：" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="文章内容：" prop="actContent">
                	<markdown-editor v-model="form.content" :configs="configs" ref="markdownEditor"></markdown-editor>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发布</el-button>
                    <el-button  v-show="!isEdit"  @click="onDraft">存为草稿</el-button>
                    <el-button  v-show="!isEdit"  @click="onRest('form')">重置</el-button>
                    <el-button  v-show="isEdit" @click="onCancel('form')">取消</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';
    export default {
    	name: 'markdown',
        props: ['parentForm','isEdit'],
        data: function(){
        	
            return {
                configs: {
                    status: true,
                    initialValue: '',
                    renderingConfig: {
                        codeSyntaxHighlighting: true,
                        highlightingTheme: 'atom-one-light'
                    }
                },
                form: {},
                classifyData:[],
                tagData:[],
                rules: {
		          title: [
//		            { required: true, message: '填写标题！！！', trigger: 'blur' },
//		            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
		          ],
		          classify: [
//		            { required: true, message: '请选择活动区域', trigger: 'blur' }
		          ],
		          tags: [
//		            { type: 'array', required: true, message: '至少选择一个标签性质', trigger: 'change' }
		          ],
		          desc: [
//		          	{ required: true, message: '填写文章描述！！！', trigger: 'blur' },
//		           	{ min: 10, max: 200, message: '长度在 10到 200 个字符', trigger: 'blur' }
		          ],
		          actContent: [
//		            { required: true, message: '请选择活动资源', trigger: 'change' }
		          ]
		        }
            }
        },
        created:function(){
        	this.form = this.parentForm  
        	this.isEdit = this.isEdit
        	this.tagDataTab();
        	this.classifyDataTab();
        },
        computed: {
        	
        },
         methods: {
            onSubmit() {
            	this.$emit('save',this.form);
            },
            onDraft() {
            	console.log(this.form)
            	this.$emit('Draft',this.form);
            },
            onRest(formName) {
            	this.$refs[formName].resetFields();
            	this.form.content = '';
//          	this.$emit('Rest',this.$refs[formName]);
            },
            onCancel(form){
            	this.$router.push('/ariticleList');
//          	this.$refs[formName].resetFields();
            },
            tagDataTab(){
                const self = this;
                self.$axios.post('/api/tag/get').then((res) => {
                    self.tagData = res.data.data;
                })
                
           	},
           	classifyDataTab(){
           		const self = this;
                self.$axios.post('/api/classify/get').then((res) => {
                    self.classifyData = res.data.data;
                })
            }
            
        },
        components: {
            markdownEditor
        }
    }
</script>
<style type="text/css">
	.markdown-editor{
		margin-top: 12px;
	}
</style>