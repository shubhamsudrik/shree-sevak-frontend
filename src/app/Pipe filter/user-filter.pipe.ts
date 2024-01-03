import { Pipe, PipeTransform } from '@angular/core';
interface Item {
  area?: string;
  name?: string;
}
@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

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

        (searchBaithakType && this.itemMatchesField(item, searchBaithakType, ['name'])) ||
        (searchBaithakDay && this.itemMatchesField(item, searchBaithakDay, ['emailId'])) ||
        (searchAllBaithak && this.itemMatchesField(item, searchAllBaithak, ['emailId','name','phoneNumber','roles','status'])) ;
        
      return matchAllFields;
    });
  }

  private itemMatchesField(item: Item, searchTerm: string, fields?: string[]): boolean {
    if (fields && fields.length > 0) {
      return fields.some(field => {
        const nestedProperties = field.split('.');

        let fieldValue: any = item;
        for (const prop of nestedProperties) {
          fieldValue = fieldValue[prop];
          if (fieldValue === undefined) {
            return false;
          }
        }

        if (Array.isArray(fieldValue)) {
          // Check if it's an array before using 'some'
          return fieldValue.some((subItem: any) => this.itemMatchesField(subItem, searchTerm));
        } else if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchTerm);
        }
         
        return false;
      });
    } else {
      const fieldsToSearch = Object.values(item).filter(value => typeof value === 'string');
      return fieldsToSearch.some(value => value.toLowerCase().includes(searchTerm));
    }
  }
}
