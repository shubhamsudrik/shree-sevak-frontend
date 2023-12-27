import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  area?: string;
  city?: string;
  
  // Add other fields as needed
}

@Pipe({
  name: 'areaFilter'
})
export class AreaFilterPipe implements PipeTransform {

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
        (searchCity && this.itemMatchesField(item, searchCity, ['areaName'])) ||
        (searchArea && this.itemMatchesField(item, searchArea, ['city'])) ||
        (searchAll && this.itemMatchesField(item, searchAll, ['areaName','city','contactEmail','contactName','contactOccupation','contactPhone1','country','division','state','contactInitial'])) ||

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