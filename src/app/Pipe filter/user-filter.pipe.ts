import { Pipe, PipeTransform } from '@angular/core';
interface Item {
  area?: string;
  name?: string;
}
@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: Item[],searchName:string,searchArea: string,searchAll:string): Item[] {

    if(!items){
      return []
    }
    if(!searchName && !searchArea && !searchAll){{
      return items
    }
    searchName = searchName ? searchName.toLowerCase() : '';
    searchArea = searchArea ? searchArea.toLowerCase() : '';
    searchAll = searchAll ? searchAll.toLowerCase() : '';

   
  }
  }
}
