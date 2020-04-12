<template> 
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
        </div>
</template>

<script>
import LottoBall from './LottoBall';

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.splice(0,6).sort((p,c)=>p-c);
    return [...winNumbers,bonusNumber];
}
const timeOuts = [];
export default {
    components : {
        'lotto-ball':LottoBall,
    },
    data(){
        return {
            winNumbers : getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo: false, 
        }
    },
    computed :{  
    },
    methods:{
      onClickRedo(){
          this.winNumbers = getWinNumbers();
          this.winBalls = [];
          this.bonus =null;
          this.redo = false;
          //this.showBalls();
      },
      showBalls(){
         for(let i = 0; i < this.winNumbers.length -1 ;i++){
            timeOuts[i]=setTimeout(()=>{
                this.winBalls.push(this.winNumbers[i]);
            },(i + 1) * 1000);
        }
        timeOuts[6]=setTimeout(()=>{
            this.bonus = this.winNumbers[6];
            this.redo = true;
        },7000)
      }
    },
    mounted(){
        this.showBalls();
    },
    beforedestroy(){
       timeOuts.forEach((t)=>{
           clearTimeout(t);
       })
    },
    watch :{
        bonus(val,oldVal){ // data bonus 값이 바뀔때마다 호출시킬수있으나 왠만하면 안쓰는게 좋음 ..(최후의 수단.)
            console.log(oldVal);
            if(val===null){
                this.showBalls();
            }
        }
    }
}
</script>

 <style scoped> /*  scoped 를 붙여주면 이 스타일은 여기서만 사용가능- */
  #computer{
      width : 142px;
      height : 200px;
      background-position:0 0;
  }

</style>