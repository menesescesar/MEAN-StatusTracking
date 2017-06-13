export interface MachineInterface {
    _id: string;
    name: string;
    serialNumber: string;
    previous:string;
    line:string;
    machineType:string;
}

export class Machine implements MachineInterface{
    public name: string;
    public serialNumber: string;
    public previous: string;
    public line: string;
    public machineType: string;
    public _id: string;

    constructor(name: string, _id: string, serialNumber:string, previous:string, line:string, machineType:string){
        this.name = name;
        this._id = _id;
        this.line = line;
        this.serialNumber = serialNumber;
        this.machineType = machineType;
        this.previous = previous;
    }
}