import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'lineMachinePipe'
})
export class lineMachinePipe implements PipeTransform{
    transform(machine, line) {
        if(machine && line)
            return machine.filter(machine => {
                return machine.line == line;
            });
        else
            return null;
    }
}