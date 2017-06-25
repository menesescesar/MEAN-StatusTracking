import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Family} from "../models/family.model";

@Injectable()
export class FamilyService {
  families: Family[];

  private familiesURL = '/api/productfamilies/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http){ }

  loadFamilies(): Promise<Family[]> {
    return this._http.get(this.familiesURL)
        .toPromise()
        .then(response => this.families=response.json() as Family[])
        .catch(this.handleError);
  }

  update(family: Family): Promise<Family> {
    return this._http
        .put(this.familiesURL+family._id, JSON.stringify(family), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Family;
        })
        .catch(this.handleError);
  }

  create(family: Family): Promise<Family> {
    return this._http
        .post(this.familiesURL, JSON.stringify(family), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Family;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    return this._http.delete(this.familiesURL+id, {headers: this.headers})
        .toPromise()
        .then(() => {})
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
