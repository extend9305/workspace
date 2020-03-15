<template> <!-- 이부분은 javascript 가 아님 그래서  webpack.config.js 파일의 rules에 vue-loader가 처리해준다.-->
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" maxlength="4" v-model="value"/>
            <button type="submit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
const getNumbers =() =>{
    const candidates = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i= 0 ; i < 4 ; i++){
        const choose = candidates.splice(Math.floor(Math.random()*(9 - i)),1)[0];
        array.push(choose);
    }
    return array;
}

export default {
    data(){
        return{
            answer  : getNumbers(),
            tries   : [ ],
            value   : '',
            result  : '', 
        }
    },
    methods:{
        onSubmitForm(e){
            if(this.value == this.answer.join('')){ // 정답이 맞으면.
                this.tries.push({
                    try : this.value,
                    result : '홈런',
                });
                this.result ='홈런';
                alert("정답!! 게임을 다시시작합니다.");
                this.answer = getNumbers();
                this.value = '';
                this.tries  =[];
                this.$refs.answer.focus();
            } else {
                if(this.tries.length >= 9){
                    this.result =`10번 넘게 틀려서 실패! 답은${this.answer.join(',')} 이였습니다!`;
                    alert("실패!! 게임을 다시시작합니다.");
                    this.answer = getNumbers();
                    this.value = '';
                    this.tries  =[];
                    this.$refs.answer.focus();
                }else{
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for(let i = 0; i < 4 ; i++){
                        if(answerArray[i] === this.answer[i]){
                            strike ++;
                        } else if(answerArray.includes(this.answer[i])){
                            ball++;
                        }
                    }   
                    this.tries.push({
                        try : this.value,
                        result : `${strike} 스트라이크 ,${ball} 볼 입니다`,
                    });
                }
            }
        }
    }
}
</script>

<style>

</style>