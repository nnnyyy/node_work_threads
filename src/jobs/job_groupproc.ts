import {sleep} from '../lib/common'
import { parentPort } from 'worker_threads'; 
let isRunning = true;
let g_shared:Int32Array|undefined = undefined;
(async ()=> {
    console.log('[worker] group proc start')
    parentPort?.on('message', (data)=>{
        console.log('message received!', data)
        const { shared } = data
        if( shared ) {
            console.log('exist shared object')
            g_shared = shared
            console.log(g_shared)
        }
    })
    //await sleep(10000)    
    while(isRunning) {
        if( !g_shared ) {
            await sleep(1000)
            continue
        }
        console.log(g_shared![0], g_shared![1])
        await sleep(1000)
    }
    parentPort?.postMessage({state: 'exit'});
})()
 
