import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

import {Line} from "../models/line.model";

@Injectable()
export class LineService{
  lines: Line[];
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http){ }

  loadLines(): Promise<Line[]> {
    return this._http.get("/api/lines")
        .toPromise()
        .then(response => this.lines=response.json() as Line[])
        .catch(this.handleError);
  }

  update(line: Line): Promise<Line> {
    const url = `/api/lines/${line._id}`;
    return this._http
        .put(url, JSON.stringify(line), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Line;
        })
        .catch(this.handleError);
  }

  create(line: Line): Promise<Line> {
    return this._http
        .post("/api/lines", JSON.stringify(line), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Line;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    const url = "/api/lines/"+id;
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
