import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Type} from "../models/type.model";

@Injectable()
export class TypeService {
  types: Type[];
  private headers = new Headers({'Content-Type': 'application/json'});
  private typesURL = '/api/machineTypes/';
  constructor(private _http:Http){ }

  loadTypes(): Promise<Type[]> {
    return this._http.get(this.typesURL)
        .toPromise()
        .then(response => this.types=response.json() as Type[])
        .catch(this.handleError);
  }

  update(type: Type): Promise<Type> {
    return this._http
        .put(this.typesURL+type._id, JSON.stringify(type), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Type;
        })
        .catch(this.handleError);
  }

  create(type: Type): Promise<Type> {
    return this._http
        .post(this.typesURL, JSON.stringify(type), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Type;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    return this._http.delete(this.typesURL+id, {headers: this.headers})
        .toPromise()
        .then(() => {})
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
