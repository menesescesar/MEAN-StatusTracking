import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'productionMachinePipe'
})
export class productionMachinePipe implements PipeTransform{
    transform(production, machine) {
        if(production && machine)
            return production.filter(production => {
                return production.machine == machine && production.status != 'OK' && production.status != 'SCRAP';
            });
        else
            return false;
    }
}