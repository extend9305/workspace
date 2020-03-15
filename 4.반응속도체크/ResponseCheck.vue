<template> <!-- 이부분은 javascript 가 아님 그래서  webpack.config.js 파일의 rules에 vue-loader가 처리해준다.-->
    <div> <!--vue는 template 안에 바로 template 못함 -->
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div> <!--v-bind  -->
        <template v-if="result.length"> <!--v-show 는 display:none 처리이고 v-if 는 태그자체가 존재 X  보통은 v-if 를 많이쓴다-->
            <div>평균시간: {{average}}ms</div> <!--만약 이부분에 로직이있으면 message 가 바뀌면 여기도 함께 다시실행됨. 그렇기때문에 분리해서 사용하면 다시실행되지않아..? -->
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
//화면이랑 관련이 없는 것들.
let startTime = 0;
let endTime = 0;
let timeOut = null;

export default {
    data(){
        return{
            result  : [],
            state   : 'waiting',
            message : '클릭해서 시작하세요.', 
        }
    },
    computed :{ //계산이나 비즈니스 로직은 여기에 일반데이터를 가공해서 쓸때
        average(){
           return this.result.reduce((a,c) => a + c ,0)/this.result.length || 0 ; //이값이 cashing 이됨..
        }
    },
    methods:{
        onReset(){
            this.result =[];
        }
        ,onClickScreen(){
            if(this.state == 'waiting'){
                this.state ='ready';
                this.message = '초록색이 되면 클릭하세요.';
              timeOut = setTimeout(() =>{
                    this.state ='now';
                    this.message = '지금 클릭!';
                    startTime = new Date();
                },Math.floor(Math.random()*1000)+2000); //2~3 초 
            }else if(this.state == 'ready'){
                clearTimeout(timeOut);
                this.state ='waiting'
                this.message = '너무 성급, 초록색 된후에 클릭 하세요.';
            }else if(this.state == 'now'){
                endTime = new Date();
                this.state ='waiting'
                this.message ='클릭해서 시작하세요.'
                this.result.push(endTime - startTime); 
            }
        },
    }
}
</script>

 <style scoped> /*  scoped 를 붙여주면 이 스타일은 여기서만 사용가능- */
    #screen {
        width : 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready{
        background-color : red;
        color : white;
    }
    #screen.now{
        background-color : greenyellow;
    }

</style>