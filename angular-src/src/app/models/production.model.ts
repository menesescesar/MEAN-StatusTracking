export interface ProductionInterface {
    _id: string;
    productSerial: string;
    product: string;
    machine:string;
    line:string;
    status:string;
    finished:boolean;
}

export class Production implements ProductionInterface{
    public _id: string;
    public productSerial: string;
    public product: string;
    public machine: string;
    public line: string;
    public status: string;
    public finished: boolean;

    constructor(productSerial: string, _id: string, product:string, machine:string, line:string, status:string, finished:boolean){
        this.productSerial = productSerial;
        this._id = _id;
        this.line = line;
        this.machine = machine;
        this.status = status;
        this.finished = finished;
        this.product = product;
    }
}