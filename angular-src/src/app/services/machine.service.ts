import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Machine} from "../models/machine.model";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class MachineService  {
    machinesSource: BehaviorSubject<any> = new BehaviorSubject(null);

    private machinesURL = '/api/machines/';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private _http:Http){ }

    loadMachines() {
        return this._http.get(this.machinesURL)
        .map(response => {
            return response.json() as Machine[];
        })
        .subscribe((machines) => this.machinesSource.next(this.orderMachine(machines)));
    }

    update(machine: Machine) {
        const url = this.machinesURL+machine._id+'?list=all';
        return this._http
        .put(url, JSON.stringify(machine), {headers: this.headers})
        .map(res => {
          return res.json() as Machine[];
        })
        .subscribe((machines) => this.machinesSource.next(this.orderMachine(machines)));
    }

    create(machine: Machine) {
        return this._http
        .post(this.machinesURL+"?list=all", JSON.stringify(machine), {headers: this.headers})
        .map(res => {
          return res.json() as Machine[];
        })
        .subscribe((machines) => this.machinesSource.next(this.orderMachine(machines)));
    }

    delete(id) {
        const url = this.machinesURL+id+"?list=all";
        return this._http.delete(url, {headers: this.headers})
        .map(res => {
          return res.json() as Machine[];
        })
        .subscribe((machines) => this.machinesSource.next(this.orderMachine(machines)));
    }

    orderMachine(machines)
    {
        //find all lines
        var lines = [];

        for(let i in machines)
        {
            if( machines[i].line && lines.indexOf(machines[i].line)<0 )
            {
                lines.push(machines[i].line);
            }
        }

        //extract machine lines and order
        var orderedmachines = [];
        for(let i in lines)
        {
            var arr = machines.filter(machine => {
                return machine.line == lines[i];
            });

            //order line
            var ordered_arr = this.orderMachineLine(arr);
            for(let j in ordered_arr)
            {
                orderedmachines.push(ordered_arr[j]);
            }
        }

        return orderedmachines;
    }

    orderMachineLine(machines)
    {
        //find machine with previous null, change to first
        for(let i in machines)
        {
            if(machines[i].previous == null)
            {
                var temp = machines[0];
                machines[0] = machines[i];
                machines[i] = temp;
            }
        }

        for(let i in machines)
        {
            var prev = this.findNext(machines,machines[i]._id);
            if(prev)
            {
                var ind = parseInt(i)+1;
                var temp = machines[ind];
                machines[ind] = machines[prev];
                machines[prev] = temp;
            }
        }

        return machines;
    }

    findNext(machines,id)
    {
        for(let j in machines)
        {
            if(machines[j].previous == id)
            {
                return j;
            }
        }
        return false;
    }
}
