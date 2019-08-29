// express는 nodejs 기반의 웹 프레임 워크다.
// 해당 파일 경로에서 npm install express
// 파일 변경 시 마다 자동으로 서버 재시작을 해주고 싶다면 npm install supervisor -g
const express = require('express');

const app = express();

// EOS
// npm install eosjs
// npm install node-fetch
const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { TextDecoder, TextEncoder } = require('util');

let eos;
let account;
let privatekey;

// express body-parser
app.use(express.urlencoded({extended : false}));

// 템플릿 엔진 선언
// npm install ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// '/' 경로에 Router
app.get('/', function(req, res){
    //res.send('Hi World!');
    res.render('index');
})

// login
app.use('/login', function(req, res){
    var method = req.method;

    if(method == "GET"){
        res.render('login');
    }else{
        var privatekey = req.param('privatekey');
        var apiUrl = req.param('api_url');
        account = req.param('account');

        console.log(privatekey);
        console.log(apiUrl);
        console.log(account);

        const signatureProvider = new JsSignatureProvider([privatekey]);
        const rpc = new JsonRpc(apiUrl, { fetch });
        eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

        res.redirect('/');
    }
})

// 사용자 정보 검색
app.post('/get_account', function(req, res){
    eos.rpc.get_account(account).then(
        result => {
            console.log(result);
            res.json(result);
        }
    )
})

// 전송 페이지
app.use('/transfer', function(req, res){
    var method = req.method;
    if(account){
        res.render('transfer');
    }else{
        res.redirect('/login');
    }        
})

// 전송
app.post('/send_transfer', function(req, res){
    if(!account){
        res.redirect('/login');
    }else{
        var token_txt = req.param('token');
        var to_txt = req.param('to');
        var quantity_txt = req.param('quantity');
        var memo_txt = req.param('memo');
        console.log(token_txt);
        console.log(to_txt);
        console.log(quantity_txt);
        console.log(memo_txt);

        if(!token_txt || !to_txt || !quantity_txt || !memo_txt){
            res.status(202).json({result : false, msg : '값을 올바르게 입력해주세요.'})
        }
        
        eos.transact({
            actions: [{
                // 토큰 발행사
                account: token_txt,
                // epsio.token의 함수명
                name: 'transfer',
                // 액션 날릴 액션 명
                authorization: [{
                actor: account, // 토큰 전송 계정
                // owner 권한, active 권한
                permission: 'active',
                }],
                data: {
                    from : account, // 토큰 전송 계정
                    to : to_txt, // 토큰 전송 받는 계정
                    quantity : quantity_txt, // 토큰 보내는 양
                    memo : memo_txt// memo
                }
            }]
            }, {
            blocksBehind: 3,
            expireSeconds: 30,
            }).then(
                result => {
                    //result.transaction_id
                    console.log(result);
                    if(result.transaction_id){
                        res.status(200).json({result : true, msg : '성공', txtid : result.transaction_id})
                    }else{
                        res.status(201).json({result : false, msg : '실패'})
                    }
                    //res.redirect('/');
                }
            )
    }
})

app.listen(3000, () => {
    console.log('Server running at localhost:3000');
})