import { parentPort } from 'worker_threads'; 

async function sleep(ms:number) {
    return new Promise((res=>{
        setTimeout(()=>{
            res(100)
        }, ms)
    }))
}

let isRunning = true;

(async ()=> {
    console.log('worker start')
    parentPort?.on('message', ()=>{
        console.log('[worker] message received')
        isRunning=false
    })
    //await sleep(10000)    
    while(isRunning) {
        console.log('working')
        await sleep(1000)
    }
    parentPort?.postMessage(100);
})()
 
