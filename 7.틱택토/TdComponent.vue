<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>

    export default {
        props :{
            cellData : String,
            rowIndex : Number,
            cellIndex : Number,
        },
        methods:{
            onClickTd(){
                 const rootData = this.$root.$data;  
                 console.log(rootData); // 가장 최상위 컴포넌트를 접근할수있게 $ 씀.
                 console.log(this.$parent.$data);
                 this.$set(rootData.tableData[this.rowIndex],this.cellIndex , rootData.turn); // vue 는 index 를 사용해서 값을 바꾸는건 화면에 반영이안된다.
                 
                 let win = false;

                 if(rootData.tableData[this.rowIndex][0] == rootData.turn && rootData.tableData[this.rowIndex][1] == rootData.turn && rootData.tableData[this.rowIndex][2] == rootData.turn){
                     win = true;
                 }

                 if(rootData.tableData[0][this.cellIndex] == rootData.turn && rootData.tableData[1][this.cellIndex] == rootData.turn && rootData.tableData[2][this.cellIndex] == rootData.turn){
                     win = true;
                 }

                 if(rootData.tableData[0][0] == rootData.turn && rootData.tableData[1][1] == rootData.turn && rootData.tableData[2][2] == rootData.turn){
                     win = true;
                 }
                 if(rootData.tableData[2][0] == rootData.turn && rootData.tableData[1][1] == rootData.turn && rootData.tableData[2][0] == rootData.turn){
                     win = true;
                 }

                 if(win){
                     rootData.winner = rootData.turn;
                     rootData.turn = 'O';
                     rootData.tableData = [['','',''],['','',''],['','','']];
                 }else{
                     let all = true; //  무승부
                     rootData.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if(!cell){
                                all = false;
                            }
                        });
                     });

                     if(all){
                        rootData.winner = '';
                        rootData.turn = 'O';
                        rootData.tableData = [['','',''],['','',''],['','','']];
                     }else{
                        rootData.turn  = rootData.turn === "O" ?  "X"  : "O";
                     }
                 }

                 
                 
            }
        }
    }
</script>