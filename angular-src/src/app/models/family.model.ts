export interface FamilyInterface {
    _id: string;
    name: string;
    description?: string;
}

export class Family implements FamilyInterface{
    public name: string;
    public description?: string;
    public _id: string;

    constructor(name: string, _id: string, description?: string){
        this.name = name;
        this._id = _id;
        this.description = description;
    }
}