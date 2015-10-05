/**
 * Created by Tony
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
        },
        masterPassword : {
            demand: true,
            description: 'the master password argument',
            alias: 'm',
            type: 'string'
        }
    }).help('help');
}).command('get','Allows to get an existing account using it name', function(yargs){
    yargs.options({
        name: {
            demand: true,
            description: 'The name of the account',
            alias: 'n'
        },
        masterPassword : {
            demand: true,
            description: 'the master password argument',
            alias: 'm',
            type: 'string'
        }
    }).help('help');
}).help('help')
    .argv;

var crypto = require('crypto-js');

// account.name
// account.username
// account.password

function getAccounts(masterPassword) {
    var encryptedAccount = storage.getItemSync('accounts');
    var accounts = [];
    if(typeof encryptedAccount !== 'undefined'){
        var bytes = crypto.AES.decrypt(encryptedAccount,masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8))
    }
    return accounts;
}

function saveAccounts(accounts, masterPassword) {
    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts),masterPassword);
    storage.setItemSync('accounts',encryptedAccounts.toString());
    return accounts;
}

function createAccount (account, masterPassword) {
    var accounts = getAccounts(masterPassword);
    accounts.push(account);
    saveAccounts(accounts,masterPassword);
    return account;
}

function getAccount(accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
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
    },argv.masterPassword));
}

if(command === 'get'){
    console.log(getAccount(argv.name,argv.masterPassword));
}