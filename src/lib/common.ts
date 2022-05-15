export async function sleep(ms:number) {
    return new Promise((res=>{
        setTimeout(()=>{
            res(100)
        }, ms)
    }))
}
