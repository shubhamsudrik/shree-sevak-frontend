import { Component, OnInit } from '@angular/core';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Router } from '@angular/router';
import { Location } from 'src/app/Classes/location';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  location: Location = new Location;
  defaultLocations: Location[] = [];
  public focus;
  searchText: any;
  allLocation: Location[]=[]
  
  constructor(
    private locationDataService: LocationDataService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['English', 'Marathi']);
    translate.setDefaultLang('English');

    
  }

  private getLocations() {
    this.locationDataService.getLocationList().subscribe(
      (data: Location[]) => {
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
    this.getLocations();
    this.getAllLocationList()
    this.getAllLocations(event);

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
    this.router.navigate(['/update-location', locationId]);
  }

  //get all location data

  private getAllLocationList(){
    this.locationDataService.getAllLocationList().subscribe(
      (data: Location[]) => {
        this.allLocation =data;
        console.log(this.allLocation)
      },)
  }

  getAllLocations(event){
    this.getAllLocationList=event
    console.log(this.getAllLocationList)
  }
}
