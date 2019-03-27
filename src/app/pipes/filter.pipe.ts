import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, label: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      if (label == 'frompriority') {
        let from = +searchText;
        return it['priority'] >= from;
      }

      if (label == 'topriority') {
        let to = +searchText;
        return it['priority'] <= to;
      }
      return it[label].toLowerCase().includes(searchText);
    });
   }
}