const cookieSession = require('cookie-session')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Eos = require('eosjs');
const DecimalPad = Eos.modules.format.DecimalPad;

const app = express();
const config = require('./config/config.js');

let eos;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['secretkey'],
    maxAge: 5 * 60 * 60 * 1000 // 5 hours
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', function(req, res) {
    var method = req.method;

    if (method == 'GET') {
        res.render('login');
    } else {
        let privatKey = req.param('private_key');
        let apiUrl = req.param('api_url');
        let account = req.param('account');
        let eosConfig = config.getConfig();
        eosConfig.privatKey = privatKey;
        eosConfig.httpEndpoint = apiUrl;
        eosConfig.account = account;
        eos = Eos(eosConfig);

        // req.session.privateKey = req.param('private_key');
        // req.session.apiUrl = req.param('api_url');
        res.redirect('/');
    }
});

app.get('/', function(req, res) {
    res.render('index');
});


// api list
app.post('/api/get_account', function(req, res) {
    eos.getAccount({account_name: config.getConfig().account}).then(
        result => {
            res.json(result);
        }
    )
});

app.post('/api/get_history', function(req, res) {

    let pos = 0;
    let offset = 200;
    let account = config.getConfig().account;

    eos.getActions(account, pos, offset).then(result => {
        res.json(result);
    });
});

app.post('/api/transfer', function(req, res) {
    let fromAccount = config.getConfig().account;
    let contract = req.param('contract');
    let amount = req.param('amount');
    let toAccount = req.param('to_account');
    let memo = req.param('memo');
    let symbol = req.param('symbol');

    let amountPayload = DecimalPad(amount, 4) + ' ' + symbol;

    eos.transaction({
        actions: [{
            account: contract,
            name: 'transfer',
            authorization: [{
                actor: fromAccount,
                permission: 'active'
            }],
            data: {
                from: fromAccount,
                to: toAccount,
                quantity: amountPayload,
                memo: memo
            }
        }]
    }).then(result => {
        res.json(result);
    });
});

module.exports = app;
