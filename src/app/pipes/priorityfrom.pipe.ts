import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'priorityfrom'
})
export class PriorityFilterPipe implements PipeTransform {
  transform(items: any[], fromPriority: string, label: string): any[] {
    if(!items) return [];
    if(!fromPriority) return items;
    fromPriority = fromPriority.toLowerCase();
    return items.filter( it => {
      return it[label] > fromPriority;
    });
   }
}