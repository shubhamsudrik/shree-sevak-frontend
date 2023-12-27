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