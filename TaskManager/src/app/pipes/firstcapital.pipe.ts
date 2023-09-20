import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstcapitalpipe'
})
export class FirstcapitalPipe implements PipeTransform {

  transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

}
