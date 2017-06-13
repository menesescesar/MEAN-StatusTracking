import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Type} from "../models/type.model";

@Injectable()
export class TypeService {
  types: Type[];
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http){ }

  loadTypes(): Promise<Type[]> {
    return this._http.get("/api/machineTypes")
        .toPromise()
        .then(response => this.types=response.json() as Type[])
        .catch(this.handleError);
  }

  update(type: Type): Promise<Type> {
    const url = `/api/machineTypes/${type._id}`;
    return this._http
        .put(url, JSON.stringify(type), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Type;
        })
        .catch(this.handleError);
  }

  create(type: Type): Promise<Type> {
    return this._http
        .post("/api/machineTypes", JSON.stringify(type), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Type;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    const url = "/api/machineTypes/"+id;
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
