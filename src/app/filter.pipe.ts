import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  field1?: string;
  field2?: string;
  // Add other fields as needed
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Item[], searchText: string, searchField1: string, searchField2: string): Item[] {
    if (!items) {
      return [];
    }

    if (!searchText && !searchField1 && !searchField2) {
      return items;
    }

    searchText = searchText ? searchText.toLowerCase() : '';
    searchField1 = searchField1 ? searchField1.toLowerCase() : '';
    searchField2 = searchField2 ? searchField2.toLowerCase() : '';

    return items.filter(item => {
      const matchAllFields =
        (searchText && this.itemMatchesField(item, searchText)) ||
        (searchField1 && this.itemMatchesField(item, searchField1, 'field1')) ||
        (searchField2 && this.itemMatchesField(item, searchField2, 'field2'));

      return matchAllFields;
    });
  }

  private itemMatchesField(item: Item, searchTerm: string, field?: string): boolean {
    if (field && typeof item[field] === 'string') {
      return item[field].toLowerCase().includes(searchTerm);
    } else {
      const fieldsToSearch = Object.values(item).filter(value => typeof value === 'string');
      return fieldsToSearch.some(value => value.toLowerCase().includes(searchTerm));
    }
  }
  
}
