<template>
    <!--<div class="Editor">
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
                        <el-option key="HTML" label="HTML" value="HTML"></el-option>
                        <el-option key="JS" label="JS" value="JS"></el-option>
                        <el-option key="CSS" label="CSS" value="CSS"></el-option>
                        <el-option key="工具" label="工具" value="工具"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" >
                    <el-switch on-text="" off-text="" v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item label="标签：" prop="tags">
                    <el-checkbox-group v-model="form.tags">
                        <el-checkbox label="js" name="type"></el-checkbox>
                        <el-checkbox label="html" name="type"></el-checkbox>
                        <el-checkbox label="Es6" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="文章描述：" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="文章内容：" prop="actContent">
                	<markdown-editor v-model="form.content" :configs="configs" ref="markdownEditor"></markdown-editor>
                </el-form-item>
                
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
    </div>-->
    <makdown :parentForm = "form" @save = "publish" :isEdit="edit"  @Draft = "onDraft"></makdown>
</template>

<script>
//  import { markdownEditor } from 'vue-simplemde';
    import makdown from '../common/MakDown.vue';
    export default {
        data: function(){
            return {
                form: {
                    title: '',
                    classify: '',
                    status: true,
                    tags: ['html'],
                    desc: '',
                    content:''
                },
                edit: false
            }
        },
        created:function(){
//      	console.log(this.$route.params);
        },
         methods: {
            publish(msg) {
            	var fmD = this.form;
            	let params = {
            		title: fmD.title,
            		content: fmD.content,
            		tag: fmD.tags.join(','),
            		categories: fmD.classify,
            		desc: fmD.desc,
            		status: fmD.status?1:0
            	}
            	console.log(params)
            	this.$axios.post('/api/article/publish',params).then((res) => {
					console.log(res)
                })
            	
            	
            	
            	
                this.$message.success('提交成功！');
            },
            onDraft(msg){
            	var fmD = this.form;
            	let params = {
            		title: fmD.title,
            		content: fmD.content,
            		tag: fmD.tags.join(','),
            		isDraft: 1,
            		categories: fmD.classify,
            		desc: fmD.desc,
            		status: fmD.status?1:0
            	}
            	console.log(params)
            	this.$axios.post('/api/article/publish',params).then((res) => {
					console.log(res)
                })
            	
            	
            	
            	this.$message.success('提2功！');
            }
        },
        components: {
            makdown
        }
    }
</script>
<style type="text/css">
	.markdown-editor{
		margin-top: 12px;
	}
</style>