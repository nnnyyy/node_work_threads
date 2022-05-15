import {sleep} from '../lib/common'
import { parentPort } from 'worker_threads'; 
let isRunning = true;

(async ()=> {
    console.log('[worker] character recovery start')
    parentPort?.on('message', ()=>{
        console.log('[worker] message received')
        isRunning=false
    })
    //await sleep(10000)    
    while(isRunning) {        
        await sleep(1000)
    }
    parentPort?.postMessage({state: 'exit'});
})()
 
