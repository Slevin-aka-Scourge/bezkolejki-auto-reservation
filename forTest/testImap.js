const {cod}=require("../imap/imap.js");
const { setTimeout }=require('timers/promises');
async function init(){
    console.log(Date.now());
    await setTimeout(5000);
    console.log(Date.now());
}
init()
cod("1213134@rambler.ru","11111111111")