import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Product} from "../models/product.model";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ProductService {
  productsSource: BehaviorSubject<any> = new BehaviorSubject(null);
  products: Product[];
  private productsURL = '/api/products/';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private _http:Http){ }

  loadProducts() {
    return this._http.get(this.productsURL)
        .map(response => this.products=response.json() as Product[])
        .subscribe((products) => this.productsSource.next(this.products));
  }

  update(product: Product) {
    return this._http
        .put(this.productsURL+product._id, JSON.stringify(product), {headers: this.headers})
        .map(res => {
          for(let i in this.products)
          {
            if(this.products[i]._id == product._id){
              this.products[i]=product;
              break;
            }
          }

          return product;
        })
        .subscribe((products) => this.productsSource.next(this.products));
  }

  create(product: Product) {
    return this._http
        .post(this.productsURL, JSON.stringify(product), {headers: this.headers})
        .map(res => {
          this.products.push(res.json());
          return res.json() as Product;
        })
        .subscribe((products) => this.productsSource.next(this.products));
  }

  delete(id) {
    return this._http.delete(this.productsURL+id, {headers: this.headers})
        .map((res) => {
          this.products = this.products.filter((val,i) => val._id!=id);
          return res.json() as Product[];
        })
        .subscribe((products) => this.productsSource.next(this.products));
  }
}
