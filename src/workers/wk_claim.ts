import {WorkerThread} from '../workerthread'

export class Claim extends WorkerThread {
    constructor(sharedView32:Int32Array) {
        super("job_claim", sharedView32)
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}