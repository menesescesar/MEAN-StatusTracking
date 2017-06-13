import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Machine} from "../models/machine.model";

@Injectable()
export class MachineService  {
  machines: Machine[];
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http:Http){ }

  loadMachines(): Promise<Machine[]> {
    return this._http.get("/api/machines")
        .toPromise()
        .then(response => this.machines=response.json() as Machine[])
        .catch(this.handleError);
  }

  update(machine: Machine): Promise<Machine> {
    const url = `/api/machines/${machine._id}`;
    return this._http
        .put(url, JSON.stringify(machine), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Machine;
        })
        .catch(this.handleError);
  }

  create(machine: Machine): Promise<Machine> {
    return this._http
        .post("/api/machines", JSON.stringify(machine), {headers: this.headers})
        .toPromise()
        .then(res => {
          return res.json() as Machine;
        })
        .catch(this.handleError);
  }

  delete(id): Promise<void> {
    const url = "/api/machines/"+id;
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
