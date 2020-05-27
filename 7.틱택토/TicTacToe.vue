<template> 
    <div>
        <table-component :table-data = "tableData"/>
        <div>{{turn}}님의 턴입니다.</div>
    </div>
</template>

<script>
import TableComponent from './TableComponent';

export default {
    components : {
        TableComponent,
    },
    data(){
        return {
         tableData: [
             ['','',''],
             ['','',''],
             ['','','']
         ],
         turn : 'O',

        }
    },
    computed :{  
    },
    methods:{
     
    }
} 
</script>

<style>

</style>