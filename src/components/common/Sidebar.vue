<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/readme',
                        title: '每日鸡汤',
                    },
                    
                    {
                        icon: 'el-icon-document',
                        index: '/ariticleList',
                        title: '文章列表'
                    },
                    {
                        icon: 'el-icon-edit',
                        index: '/ariticleAdd',
                        title: '文章编写'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/setting',
                        title: '设置',
                        subs: [
                            {
                                index: '/tagify',
                                title: '标签|分类设置'
                            },
//                          {
//                              index: '/classify',
//                              title: '分类设置'
//                          },
                            
                            {
                                index: '/setting',
                                title: '系统设置'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
            	
            	if(this.$route.path.split('/')[1] == 'ariticleEdit'){
            		return '/ariticleList'
            	}
                return `/${this.$route.path.split('/')[1]}`
            }
        },
        created:function(){
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 180px;
        left: 0;
        top: 70px;
        bottom:0;
        overflow: hidden;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
