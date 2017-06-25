import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'productionMachineStatusPipe'
})
export class productionMachineStatusPipe implements PipeTransform{
    transform(productions, machine,status) {
        if(productions && machine) {
            var prods = productions.filter(production => {
                return production.machine == machine && production.status == status;
            });
            return prods.length;
        }
        else
            return false;
    }
}