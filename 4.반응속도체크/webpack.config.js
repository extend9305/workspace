const VueloaderPlugin = require('vue-loader/lib/plugin'); // vue 환경에서는 import, node 환경에서는 require로 사용한다.
const path = require('path'); // node 에서 절대경로를 알려주는 module 
 // 이건 노드 ... 노드는 require 랑 module.export 로 부루고 import, export default 
module.exports = {
    mode : 'development',
    devtool : 'eval', // 배포할때는 hidden-source-map 많이쓴다.
    resolve:{
        extensions:['.js','.vue'] // 확장자들 처리해주는건데 사용할때 .vue, .js 삭제 할 수 있음
    },
    entry :{ //가장 대표가되는 js 파일  // 웹팩은 가장 처음 돌아갈떄 entry 를 먼저봄.
        app: path.join(__dirname,'main.js'), 
    },
    module :{ //가장 핵심 
        rules :[{ // 파일들을 합칠때 어떻게 합칠건지 어떻게 처리할지를 안에다가 적음.
           test : /\.vue$/, //정규 표현식으로 .vue 파일로 끝나는 파일을 가져오겠다. vue 파일은 js 파일이 아니지만 밑의 vue-loader가 이를 가능하게 해줌 
           use:'vue-loader', // use :'vue-loader'  
        },
        {
            test : /\.css$/
            ,use : [
                'vue-style-loader',
                'css-loader', 
            ]
        }],
    },
    plugins :[
        new VueloaderPlugin(), // loader가 중심이고 plugin 은 부가적인 역활.
    ],
    output : {
        filename :'app.js', //[name].js,
        path: path.join(__dirname,'dist'), // __dirname --> 현재경로를 알려줌 dist 까지.
        publicPath : '/dist', //dev
        
    },
  
};
