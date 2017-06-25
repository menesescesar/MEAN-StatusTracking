import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Production} from "../models/production.model";

@Injectable()
export class ProductionService {
  productions: Production[];
  private productionURL = '/api/productions/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http){ }

  loadProductions(): Promise<Production[]> {
    return this._http.get(this.productionURL)
        .toPromise()
        .then(response => this.productions=response.json() as Production[])
        .catch(this.handleError);
  }

  update(production: Production): Promise<Production> {
    return this._http
        .put(this.productionURL+production._id, JSON.stringify(production), {headers: this.headers})
        .toPromise()
        .then(res => {
          if(res.status!=201)
            return res.json() as Production;
          else
            return null;
        })
        .catch(this.handleError);
  }

  create(production: Production): Promise<Production> {
    return this._http
        .post(this.productionURL, JSON.stringify(production), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Production;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    return this._http.delete(this.productionURL+id, {headers: this.headers})
        .toPromise()
        .then(() => {})
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
