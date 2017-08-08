
// onmessage = function(data){
//     importScripts("workerFakeDOM.js"); //pfm-work around for jquery requiring DOM https://stackoverflow.com/questions/10491448/how-to-access-jquery-in-html-5-web-worker
//     importScripts("../../lib/node_modules/jquery/dist/jquery.js");
//     importScripts("../../lib/node_modules/node-forge/dist/forge.all.min.js");

//     // console.log("forge", forge);

//     let keys = forge.rsa.generateKeyPair({bits:2048, workers: 3}, function(err, keypair){
//         console.log("keypair", keypair);
//         if(err){
//         console.log("err", err);
//         }
//         postMessage(keys);
//     });
// };