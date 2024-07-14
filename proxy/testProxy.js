const { HttpsProxyAgent } = require("https-proxy-agent");
const fs = require("fs-extra");
const fetch = require("node-fetch");
if(!fs.existsSync("./proxy/proxy.json")){
  fs.mkdirSync("./proxy")
  fs.copySync("./node_modules/bezkolejki/proxy/proxy.json","./proxy/proxy.json")
 }
let arr_proxy = fs.readJSONSync("./proxy/proxy.json");
let proxyAgent = [];
let true_proxy = [];
for (let i = 0; i < arr_proxy.length; i++) {
  proxyAgent.push(new HttpsProxyAgent(`http://${arr_proxy[i]}`));
}
async function getProxy(i) {
  try {
    let res = await fetch("https://api64.ipify.org?format=json", {
      agent: proxyAgent[i],
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ru,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
      },
      body: null,
      method: "GET",
    });
    if (res.status == 200) {
      const body = await res.json();
      true_proxy.push(arr_proxy[i]);
      fs.writeJSONSync("./proxy/proxyBeforeTest.json", true_proxy);
    } else {
      console.log(res.status);
      // const err=await res.text();
      // console.log(err);
    }
  } catch (e) {
    console.log(e);
    console.log("ERROR");
  }
}
async function testProxyFull() {
  let allF = [];
  for (let i = 0; i < proxyAgent.length; i++) {
    allF.push(getProxy(i));
  }
  await Promise.all(allF);
  fs.writeJSONSync("./proxy/proxyBeforeTest.json", true_proxy);
  console.log("OK");
  return true_proxy.length;
}
module.exports.testProxyFull = testProxyFull;
