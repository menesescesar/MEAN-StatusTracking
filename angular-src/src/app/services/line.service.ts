import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from "rxjs";
import {Line} from "../models/line.model";

@Injectable()
export class LineService {
  lines: Line[];
  linesSource: BehaviorSubject<any> = new BehaviorSubject(null);

  private linesURL = '/api/lines/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http: Http) {
  }

  loadLines() {
    return this._http.get(this.linesURL)
        .map(response => this.lines = response.json() as Line[])
        .subscribe((lines) => this.linesSource.next(this.lines));
  }

  update(line: Line) {
    return this._http
        .put(this.linesURL+line._id, JSON.stringify(line), {headers: this.headers})
        .map(res => {
          for(let i in this.lines)
          {
            if(this.lines[i]._id == line._id){
              this.lines[i]=line;
              break;
            }
          }

          return line;
        })
        .subscribe((lines) => this.linesSource.next(this.lines));
  }

  create(line: Line) {
    return this._http
        .post(this.linesURL, JSON.stringify(line), {headers: this.headers})
        .map(res => {
          this.lines.push(res.json());
          return res.json() as Line;
        })
        .subscribe((lines) => this.linesSource.next(this.lines));
  }

  delete(id) {
    return this._http.delete(this.linesURL + id, {headers: this.headers})
        .map(res => {
          this.lines = this.lines.filter((val,i) => val._id!=id);
          return res.json() as Line[];
        })
        .subscribe((lines) => this.linesSource.next(this.lines));
  }
}
