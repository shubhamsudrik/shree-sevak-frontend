import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/location';
import { LocationDataService } from 'src/app/location-data.service';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  
    location: Location = new Location(); //create class object for use in this component
    id: number;
    
    constructor(private locationDataService: LocationDataService, private router: Router,
      private route: ActivatedRoute) {}
  
      ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.locationDataService.getLocationById(this.id).subscribe({
          next: data => {
            this.location = data;
          },
          error: error => {
            console.log(error);
          }
        });
      }
      
  
      onSubmit() {
      console.log(this.location);
      this.saveLocation();
    }
  
    saveLocation(){
     this.locationDataService.createLocation(this.location).subscribe(data => {
      console.log(data);
      this.router.navigate(['/location-list']);
    },
    error => console.log(error));
  }
  
  CancelChanges(){
      this.router.navigate(['/location-list']);
    }
  }
