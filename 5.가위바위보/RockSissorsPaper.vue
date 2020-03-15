<template> 
   <div>
        <div id="computer"  :style="computedStyleObject"></div> <!--background-Imange ->backgroundImage 처럼 - 없애고 대문자                    v:bind =v:bind:style -->
        <div>                                     
            <button @click = "onClickButton('바위')">바위</button>
            <button @click = "onClickButton('가위')">가위</button>
            <button @click = "onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재{{score}}점</div>
    </div>
</template>

<script>
    const rspCodes = {
        바위 : '0',
        가위 : '-142px',
        보   : '-284px', 
    };
    const scores = {
        가위 :1,
        바위 :0,
        보 :-1,
    };

    const computerChoice = (imageCode) =>{
        return Object.entries(rspCodes).find(function(v){
            return v[1] ===imageCode;
        })[0];
    };

    let interval = null;
export default {
    data(){
      return {
          imageCode : rspCodes.바위, 
          result: '',
          score : 0,
      }
    },
    computed :{ //계산이나 비즈니스 로직은 여기에 일반데이터를 가공해서 쓸때
      computedStyleObject (){
          return {
              background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imageCode} 0`,
          }
      }
    },
    methods:{
      changeHand(){
           interval = setInterval(() =>{
               
            if(this.imageCode === rspCodes.바위){
                this.imageCode = rspCodes.가위;
            }else if(this.imageCode === rspCodes.가위){
                this.imageCode = rspCodes.보;
            }else if(this.imageCode === rspCodes.보){
                this.imageCode =rspCodes.바위;
            }
        },100); 
      }
      ,onClickButton(choice){
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imageCode)];
        const diff = myScore - cpuScore;
        if(diff ===0){
            this.result ='비겼습니다.'

        }else if([-1,2].includes(diff)){
            this.result = '이겼습니다.';
            this.score += 1; 
        }else{
             this.result = '졌습니다.';
            this.score -= 1; 
        }
        setTimeout(()=>{
            this.changeHand();
        },1000) 
      },
    },
    beforeCreate(){
        console.log('beforeCreated');
    },
    created(){
        console.log('created');
    },
    beforeMounte(){
        console.log('beforeMounted');
    },
    mounted(){
        console.log('mounted');
        this.changeHand();
       
    },

    updated(){
        console.log('updated');
    },
    destroyed(){
        console.log('destroyed');
    },  
    beforedestroy(){
        console.log('beforedestroy');
        clearInterval(interval); 
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