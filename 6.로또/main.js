import Vue from 'vue'; //es 2015 모듈 vue 설치했던걸 임포트 시키는 작업.

import LottoGenerator from './LottoGenerator'; // numberBaseball.vue 파일을 연결. export default 가 가져와짐.
 
new Vue(LottoGenerator).$mount('#root'); // el 역활을 한다. const app = new Vue({el : '#root'}) --> 이역활을 한다.
