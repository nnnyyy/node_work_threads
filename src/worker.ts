import { parentPort, workerData } from 'worker_threads'; 

async function sleep(ms:number) {
    return new Promise((res=>{
        setTimeout(()=>{
            res(100)
        }, ms)
    }))
}

(async ()=> {
    console.log('worker start')
    //await sleep(10000)    
    parentPort?.postMessage(100);
})()
 
