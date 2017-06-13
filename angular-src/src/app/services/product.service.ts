import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Product} from "../models/product.model";

@Injectable()
export class ProductService {
  products: Product[];
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private _http:Http){ }

  loadProducts(): Promise<Product[]> {
    return this._http.get("/api/products")
        .toPromise()
        .then(response => this.products=response.json() as Product[])
        .catch(this.handleError);
  }

  update(product: Product): Promise<Product> {
    const url = `/api/products/${product._id}`;
    return this._http
        .put(url, JSON.stringify(product), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Product;
        })
        .catch(this.handleError);
  }

  create(product: Product): Promise<Product> {
    return this._http
        .post("/api/products", JSON.stringify(product), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Product;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    const url = "/api/products/"+id;
    return this._http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => {})
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
