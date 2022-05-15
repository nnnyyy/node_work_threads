import {WorkerThread} from '../workerthread'

export class Claim extends WorkerThread {
    constructor() {
        super("job_claim")
    }

    override onMessage(val:any) {
        super.onMessage(val)
    }
}