import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  area?: string;
  name?: string;
}

@Pipe({
  name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {
  
 
  transform(items: Item[], searchName: string, searchArea: string, searchAll: string): Item[] {
    if (!items) {
      return [];
    }

    if (!searchName && !searchArea && !searchAll) {
      return items;
    }

    searchName = searchName ? searchName.toLowerCase() : '';
    searchArea = searchArea ? searchArea.toLowerCase() : '';
    searchAll = searchAll ? searchAll.toLowerCase() : '';

    return items.filter(item => {
      const matchAllFields =
        (searchName && this.itemMatchesField(item, searchName, ['initial','firstName','middleName','lastName'])) ||
        (searchArea && this.itemMatchesField(item, searchArea, ['area'])) ||
        (searchAll && this.itemMatchesField(item, searchAll, ['memberId','area','initial','firstName','middleName','lastName','gender','eligibleForLadies','eligibleForGents','eligibleForChild','mobile','pincode'])) ;

      return matchAllFields;
    });
  }

  private itemMatchesField(item: Item, searchTerm: string, fields?: string[]): boolean {
    console.log('itemMatchesField', item, searchTerm);
    if (fields && fields.length > 0) {
      return fields.some(field => {
        const nestedProperties = field.split('.');

        let fieldValue: any = item;
        for (const prop of nestedProperties) {
          if (fieldValue && fieldValue.hasOwnProperty(prop)) {
            fieldValue = fieldValue[prop];

            if (Array.isArray(fieldValue)) {
       
              const arrayMatch = fieldValue.some(subItem => this.itemMatchesField(subItem, searchTerm, ['area.areaName']));
              if (arrayMatch) return true;
            } else if (fieldValue && typeof fieldValue === 'object') {
            
              const objectMatch = this.itemMatchesField(fieldValue, searchTerm, ['areaName']);
              if (objectMatch) return true;
            } else {
              if (typeof fieldValue === 'string') {
                return fieldValue.toLowerCase().includes(searchTerm);
              }
            }
          } else {
            return false;
          }
        }

        return false;
      });
    } 
  }
}