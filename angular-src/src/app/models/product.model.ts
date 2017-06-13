export interface ProductInterface {
    _id: string;
    name: string;
    productFamily: string;
}

export class Product implements ProductInterface{
    public name: string;
    public _id: string;
    public productFamily: string;

    constructor(name: string, _id: string, productFamily: string){
        this.name = name;
        this._id = _id;
        this.productFamily = productFamily;
    }
}