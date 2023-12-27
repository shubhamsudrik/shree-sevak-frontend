// import { Pipe, PipeTransform } from '@angular/core';

// interface Item {
//   field1?: string;
//   field2?: string;
//   // Add other fields as needed
// }

// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: Item[], searchText: string, searchField1: string, searchField2: string): Item[] {
//     if (!items) {
//       return [];
//     }

//     if (!searchText && !searchField1 && !searchField2) {
//       return items;
//     }

//     searchText = searchText ? searchText.toLowerCase() : '';
//     searchField1 = searchField1 ? searchField1.toLowerCase() : '';
//     searchField2 = searchField2 ? searchField2.toLowerCase() : '';

//     return items.filter(item => {
//       const matchAllFields =
//         (searchText && this.itemMatchesField(item, searchText)) ||
//         (searchField1 && this.itemMatchesField(item, searchField1, 'field1')) ||
//         (searchField2 && this.itemMatchesField(item, searchField2, 'field2'));

//       return matchAllFields;
//     });
//   }

//   private itemMatchesField(item: Item, searchTerm: string, field?: string): boolean {
//     if (field && typeof item[field] === 'string') {
//       return item[field].toLowerCase().includes(searchTerm);
//     } else {
//       const fieldsToSearch = Object.values(item).filter(value => typeof value === 'string');
//       return fieldsToSearch.some(value => value.toLowerCase().includes(searchTerm));
//     }
//   }
  
// }


import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  area?: string;
  city?: string;
  
  // Add other fields as needed
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Item[], searchCity: string, searchArea: string, searchAll: string, 
    searchBaithakType: string, searchBaithakDay: string, searchAllBaithak: string): Item[] {
    if (!items) {
      return [];
    }
  
    if (!searchCity && !searchArea && !searchAll && !searchBaithakType && !searchBaithakDay && !searchAllBaithak ) {
      return items;
    }
    
    searchCity = searchCity ? searchCity.toLowerCase() : '';
    searchArea = searchArea ? searchArea.toLowerCase() : '';
    searchAll = searchAll ? searchAll.toLowerCase() : '';
    searchBaithakType = searchBaithakType ? searchBaithakType.toLowerCase() : '';
    searchBaithakDay = searchBaithakDay ? searchBaithakDay.toLowerCase() : '';
    searchAllBaithak = searchAllBaithak ? searchAllBaithak.toLowerCase() : '';

    return items.filter(item => {
      const matchAllFields =
        (searchCity && this.itemMatchesField(item, searchCity, ['city'])) ||
        (searchArea && this.itemMatchesField(item, searchArea, ['area'])) ||
        (searchAll && this.itemMatchesField(item, searchAll, ['area','city','locationName','state','locationId','country','add1','add2','pincode','division'])) ||

        (searchBaithakType && this.itemMatchesField(item, searchBaithakType, ['baithakType'])) ||
        (searchBaithakDay && this.itemMatchesField(item, searchBaithakDay, ['dayOfWeek'])) ||
        (searchAllBaithak && this.itemMatchesField(item, searchAllBaithak, ['toTime','date','bithakId'])) ;

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
