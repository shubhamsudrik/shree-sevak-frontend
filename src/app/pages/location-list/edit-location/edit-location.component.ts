import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Location } from 'src/app/Classes/location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
})
export class EditLocationComponent implements OnInit {
  locationform: FormGroup;
  submitted = false;
  defaultLocations: Location[] = [];
  location: Location = new Location();
  id: number;

  constructor(
    private locationDataService: LocationDataService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
   

    this.locationform = this.formBuilder.group({
      locationName: ['', Validators.required],
      add1: ['', Validators.required],
      add2: ['', Validators.required],
      city: ['', Validators.required],
      division: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
      status:['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      googleMapLink: [''],
      add3: [''],
      add4: [''],
      additionalInfo: [''],
      contact1Email: ['', Validators.required],
      contact1Initial: ['', Validators.required],
      contact1Name: ['', Validators.required],
      contact1Occupation: [''],
      contact1Phone1: ['', Validators.required],
      contact1Phone2: [''],
      contact2Email: ['', Validators.required],
      contact2Initial: ['', Validators.required],
      contact2Name: ['', Validators.required],
      contact2Phone1: ['', Validators.required],
      contact2Phone2: [''],
     
    });

    this.getLocations();
  }

  get locationFormControl() {
    return this.locationform.controls;
  }

  onsubmit1() {
    this.submitted = true;
    if (this.locationform.valid) {
      return;
    }
    alert('unsuccessful');
  }

  onSubmit() {
    this.submitted = true;

    const isDuplicate = this.isDuplicateData(this.location);

    if (isDuplicate) {
      // Data already exists error message
      alert(
        'Data already exists with the same address, city, state, and division.'
      );
    } else if (this.locationform.valid) {
      // Data doesn't exist and the form is valid, save the location
      console.log(this.location.locationName);
      console.log(this.location);
      this.saveLocation();
    } else {
      alert('Please fill all fields: कृपया सर्व फील्ड भरा');
    }
  }

  saveLocation() {
    this.locationDataService.createLocation(this.location).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/location-list']);
      },
      (error) => console.log(error)
    );
  }

  CancelChanges() {
    this.router.navigate(['/location-list']);
  }

  Clear() {
    this.locationform.reset();
  }

  getLocations() {
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
  validatePincode(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
    input.value = truncatedValue;
}
validatePhoneNumber(event){
  const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
}

  isDuplicateData(newLocation: Location): boolean {
    for (let item of this.defaultLocations) {
      if (
        item.city === newLocation.city &&
        item.state === newLocation.state &&
        item.division === newLocation.division &&
        item.locationName === newLocation.locationName
      ) {
        return true; // Data already exists
      }
      
    }
    return false; // Data does not exist
    console.log(newLocation)
  }
 

}