export interface TypeInterface {
    _id: string;
    name: string;
    description?: string;
}

export class Type implements TypeInterface{
    public name: string;
    public description?: string;
    public _id: string;

    constructor(name: string, _id: string, description?: string){
        this.name = name;
        this._id = _id;
        this.description = description;
    }
}