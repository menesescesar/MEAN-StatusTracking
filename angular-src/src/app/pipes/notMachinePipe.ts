import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'notMachinePipe'
})
export class notMachinePipe implements PipeTransform{
    transform(machine, id) {
        return machine.filter(machine => {
            return machine._id != id;
        });
    }
}