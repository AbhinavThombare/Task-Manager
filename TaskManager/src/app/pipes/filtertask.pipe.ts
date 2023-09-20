import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertask',
  pure: false
})
export class FiltertaskPipe implements PipeTransform {

  transform(value: any ='', searchTerm: any): any {
    
    if(!searchTerm){
      return value
    }
    return value.filter(function (search :any) {
      return search.task.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    });
  }
}

