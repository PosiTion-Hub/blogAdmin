<template>
    <div class="main">
        <v-head></v-head>
        <v-sidebar ></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
    	data(){
    		return {
    			
    		}
    	},
        components:{
            vHead, vSidebar
        },
        created:function(){
        	
        }
    }
</script>

<style type="text/css">
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
