import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  field1?: string;
  field2?: string;
  // Add other fields as needed
}

@Pipe({
  name: 'baithakSearch'
})
export class BaithakSearchPipe implements PipeTransform {

  transform(items: Item[], 
    searchBaithakType: string, searchBaithakDay: string, searchAllBaithak: string): Item[] {
    if (!items) {
      return [];
    }

    if (!searchBaithakType && !searchBaithakDay && !searchAllBaithak ) {
      return items;
    }


    searchBaithakType = searchBaithakType ? searchBaithakType.toLowerCase() : '';
    searchBaithakDay = searchBaithakDay ? searchBaithakDay.toLowerCase() : '';
    searchAllBaithak = searchAllBaithak ? searchAllBaithak.toLowerCase() : '';

    return items.filter(item => {
      const matchAllFields =

        (searchBaithakType && this.itemMatchesField(item, searchBaithakType, ['baithakType'])) ||
        (searchBaithakDay && this.itemMatchesField(item, searchBaithakDay, ['dayOfWeek'])) ||
        (searchAllBaithak && this.itemMatchesField(item, searchAllBaithak, ['baithakType','dayOfWeek','toTime','fromTime','date','baithakType'])) ;

      return matchAllFields;
    });
  }

  private itemMatchesField(item: Item, searchTerm: string, fields?: string[]): boolean {
    if (fields && fields.length > 0) {
      return fields.some(field => {
        if (typeof item[field] === 'string') {
          return item[field].toLowerCase().includes(searchTerm);
        }
        return false;
      });
    } else {
      const fieldsToSearch = Object.values(item).filter(value => typeof value === 'string');
      return fieldsToSearch.some(value => value.toLowerCase().includes(searchTerm));
    }
  }
}
