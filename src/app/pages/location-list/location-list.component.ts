import { Component, OnInit } from '@angular/core';

import { Location } from 'src/app/Classes/location';
import { TranslateService } from '@ngx-translate/core';
import { LocService } from 'src/app/services/loc.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  location: Location = new Location;
  defaultLocations: any[] = [];
  // sortedDefaultLocations: any[] = []; 
  public focus;
  searchText= '';
  searchText1 ='';
  searchText2 ='';
 
  // Pagination
  currentPage: number = 0;
  itemsPerPage: number = 10;

  //record count
  get pagedLocations(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultLocations.slice(startIndex, endIndex);
    console.log(this.pagedLocations)
  }

  onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex ;
}
  
  constructor(
    private locationDataService: LocService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['English']);
    translate.setDefaultLang('English');
  }
  
  //for location convert to descending order
  // sortDefaultLocationsDescending() {
  //   this.sortedDefaultLocations = this.defaultLocations.slice().sort((a, b) => b.locationId - a.locationId);
  // }

  //get active data
  private getLocationList() {
    this.locationDataService.getLocationList().subscribe(
      (data: any[]) => {
        this.defaultLocations = data;
        console.log(this.defaultLocations);
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.getLocationList();   
   
    }
  

  onOpen() {
    console.log(this.location);
    this.router.navigate(['/edit-location']);
  }
  
  toggleButtons(operation: string, location: any) {
    if (operation === 'edit') {
      location.isEditing = true;
      location.isDeleting = true;
    }
  }

  deleteLocation(id: number ) {
    const confirmation = confirm('Do you want to delete this location?');
    if (confirmation) {
      this.locationDataService.deleteLocation(id).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/location-list']);
        },
        (error) => {
          console.error('Error deleting location:', error);
        }
      );
    }
  }

  updateLocation(locationId: number) {
    this.router.navigate(['/edit-location', locationId]);
  }

  //get all location data

  private getAllLocationList(){
    this.locationDataService.getAllLocationList().subscribe(
      (data: any[]) => {
        this.defaultLocations =data;
        console.log(this.defaultLocations)
      },)
  }


  // show all data and handl using active inactive through button 
  statusLocation(status: string){
    if (status === "all") {
      this.getAllLocationList();
    }else{

    this.locationDataService.getLocationByStatus(status).subscribe(
      (data: any[]) => {
        this.defaultLocations = data;       
        console.log(data);
      },
      (error) => {
        console.error("fetching baithak detail:", error);
      }
    );
    }
  }
  }

