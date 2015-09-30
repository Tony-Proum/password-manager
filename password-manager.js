/**
 * Created by tony
 * Inspired by Udemy's NodeJs complete course
 */
console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

// create
//  --name
//  --username
//  --password
var argv = require('yargs').command('create','Allows to create a new account and persist it', function(yargs){
    yargs.options({
        name: {
            demand: true,
            description: 'The name of the account (ex : Facebook, Twitter)',
            alias: 'n',
            type: 'string'
        },
        username: {
            demand: true,
            description: 'The username of the user',
            alias: 'u',
            type: 'string'
        },
        password: {
            demand: true,
            description: 'The user password',
            alias: 'p',
            type: 'string'
        }
    }).help('help');
}).command('get','Allows to get an existing account using it name', function(yargs){
    yargs.options({
        name: {
            demand: true,
            description: 'The name of the account',
            alias: 'n'
        }
    }).help('help');
}).help('help')
    .argv;

// account.name
// account.username
// account.password

function createAccount (account) {
    var accounts = storage.getItemSync('accounts');
    if(typeof accounts === 'undefined'){
        accounts = [];
    }
    accounts.push(account);
    storage.setItemSync('accounts',accounts);
    return account;
}

function getAccount(accountName) {
    var accounts = storage.getItemSync('accounts');
    var matchingAccount;
    accounts.forEach(function(account){
        if(account.name === accountName){
            matchingAccount = account;
        }
    });
    return matchingAccount;
}
var command = argv._[0];
if(command === 'create'){
    console.log(createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password
    }));
}

if(command === 'get'){
    console.log(getAccount(argv.name));
}