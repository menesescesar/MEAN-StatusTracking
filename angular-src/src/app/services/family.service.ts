import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Family} from "../models/family.model";

@Injectable()
export class FamilyService {
  families: Family[];
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http){ }

  loadFamilies(): Promise<Family[]> {
    return this._http.get("/api/productfamilies")
        .toPromise()
        .then(response => this.families=response.json() as Family[])
        .catch(this.handleError);
  }

  update(family: Family): Promise<Family> {
    const url = `/api/productfamilies/${family._id}`;
    return this._http
        .put(url, JSON.stringify(family), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Family;
        })
        .catch(this.handleError);
  }

  create(family: Family): Promise<Family> {
    return this._http
        .post("/api/productfamilies", JSON.stringify(family), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Family;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    const url = "/api/productfamilies/"+id;
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
