import { Component, OnInit } from '@angular/core';
import { LocationDataService } from 'src/app/location-data.service'; // Import the service
import { Router } from '@angular/router'; 
import { Location } from 'src/app/location';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
 
  location: Location = new Location;
  
  defaultLocations : Location[];
  public focus;
  searchText: any;
  
  constructor(private locationDataService: LocationDataService, private router: Router,public translate: TranslateService) {
    console.log(Location);
    console.log(locationDataService)


    translate.addLangs(['English','Marathi']);
    translate.setDefaultLang('English');
  }

  private getLocations(){
  this.locationDataService.getLocationList().subscribe(data => {
    this.defaultLocations = data;
  })
  }

  switchLang(lang: string) {
    this.translate.use(lang); // Change the active language
  }



  ngOnInit(): void {
  
   this.getLocations();

  }

  onOpen() {
    console.log(this.location);
    this.router.navigate(['/edit-location']);
  }
  
  toggleButtons(operation: string, location: any) {
    if (operation === 'edit') {
      location.isEditing = true;
      location.isDeleting = true;
    // } else if (operation === 'delete') {
    //   location.isEditing = false;
    //   location.isDeleting = true;
    }
  }
  
    deleteLocation(id: number ) {
  const confirmation = confirm('तुम्ही हे हटवू इच्छिता...');
  if (confirmation) {
   this.locationDataService.deleteLocation(id).subscribe(data => {
    console.log(data);
    this.router.navigate(['/location-list']);
  }, error => {
        console.error('Error deleting location:', error);
      });
    }

  }

  updateLocation(locationId: number){
    this.router.navigate(['/update-location',locationId]);
  }
  

  
}