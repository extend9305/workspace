<template> 
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data = "tableData"/>
        <div v-if="winner">{{winner}}님의 승리입니다.</div>
    </div>
</template>

<script>
import Vue from 'vue';
import TableComponent from './TableComponent';

export default {
    components : {
        TableComponent,
    },
    data(){
        return {
         tableData: [
             ['' ,'' ,''],
             ['' ,'' ,''],
             ['' ,'' ,'']
         ],
         turn : 'O',
         winner : '',

        }
    },
    computed :{  
    },
    methods:{
        onChangeData(){
            Vue.set(this.tableData[1],0,'X'); // import vue 필요없이 this.$set()
        }
    }
} 
</script>

<style>

</style>