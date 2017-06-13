export interface LineInterface {
    _id: string;
    name: string;
    description?: string;
}

export class Line implements LineInterface{
    public name: string;
    public description?: string;
    public _id: string;

    constructor(name: string, _id: string, description?: string){
        this.name = name;
        this._id = _id;
        this.description = description;
    }
}