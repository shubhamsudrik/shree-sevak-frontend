import { Pipe, PipeTransform } from '@angular/core';

interface Item {
  area?: string;
  name?: string;
}

@Pipe({
  name: 'scheduledFilter'
})
export class ScheduledFilterPipe implements PipeTransform {  
   
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
          (searchName && this.itemMatchesField(item, searchName, ['date'])) ||
          (searchArea && this.itemMatchesField(item, searchArea, ['location.locationName'])) ||
          (searchAll && this.itemMatchesField(item, searchAll, ['date','members','scheduleId','baithak','location.locationName','baithak.baithakType'])) ;
  
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



//   import { Pipe, PipeTransform } from '@angular/core';

// interface Location {
//   locationId: number;
//   locationName: string;
//   add1: string;
//   add2: string;
//   division: string;
//   // ... other properties
// }

// interface Member {
//   // Define the properties of a member object
//   memberId: number;
//   area: string;
//   initial: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   gender: string;
//   eligibleForLadies: boolean;
//   eligibleForGents: boolean;
//   eligibleForChild: boolean;
//   mobile: string;
//   pincode: string;
// }

// interface Baithak {
//   bithakId: number;
//   baithakType: string;
//   dayOfWeek: string;
//   date: string;
//   fromTime: string;
//   location: Location;
//   members: Member[];
//   scheduleId: number;
//   status: string | null;
// }

// @Pipe({
//   name: 'scheduledFilter'
// })
// export class ScheduledFilterPipe implements PipeTransform {

//   transform(items: Baithak[], searchName: string, searchArea: string, searchAll: string): Baithak[] {
//     if (!items) {
//       return [];
//     }

//     if (!searchName && !searchArea && !searchAll) {
//       return items;
//     }

//     searchName = searchName ? searchName.toLowerCase() : '';
//     searchArea = searchArea ? searchArea.toLowerCase() : '';
//     searchAll = searchAll ? searchAll.toLowerCase() : '';

//     return items.filter(item => {
//       const matchAllFields =
//         (searchName && this.itemMatchesField(item, searchName, ['location.locationName'])) ||
//         (searchArea && this.itemMatchesField(item, searchArea, ['location.locationName'])) ||
//         (searchAll && this.itemMatchesField(item, searchAll, [
//           'location.locationName',
//           'members.firstName',
//           'members.middleName',
//           'members.lastName',
//           'members.mobile',
//           'members.pincode'
//         ]));

//       return matchAllFields;
//     });
//   }

//   private itemMatchesField(item: Baithak, searchTerm: string, fields?: string[]): boolean {
//     if (fields && fields.length > 0) {
//       return fields.some(field => {
//         const nestedProperties = field.split('.');

//         let fieldValue: any = item;
//         for (const prop of nestedProperties) {
//           fieldValue = fieldValue[prop];
//           if (fieldValue === undefined) {
//             return false;
//           }
//         }

//         if (Array.isArray(fieldValue)) {
//           // Check if it's an array before using 'some'
//           return fieldValue.some((subItem: any) => this.itemMatchesField(subItem, searchTerm));
//         } else if (typeof fieldValue === 'string') {
//           return fieldValue.toLowerCase().includes(searchTerm);
//         }

//         return false;
//       });
//     } else {
//       const fieldsToSearch = Object.values(item).filter(value => typeof value === 'string');
//       return fieldsToSearch.some(value => value.toLowerCase().includes(searchTerm));
//     }
//   }
// }
