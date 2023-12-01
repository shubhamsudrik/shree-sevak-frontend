import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/Classes/location';
import { LocService } from 'src/app/services/loc.service';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  locationform: FormGroup;
  submitted = false;
  location: any = new Location();
  id: number;
  defaultLocations: Location[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private locationDataService: LocService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getLocations();
    this.locationDataService.getLocationById(this.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.location = data;
        this.populateForm();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  // get All location
  getLocations() {
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

  populateForm(){
    this.locationform.patchValue({locationName:this.location?.locationName,})
  }

  initializeForm() {
    this.locationform = this.formBuilder.group({
      
      locationName: [this.location?.locationName, Validators.required], 
      area: [this.location?.area, Validators.required],          
      add1: [this.location?.add1, Validators.required],
      add2: [this.location?.add2, Validators.required],
      add3: [''],
      add4: [''],
      city: [this.location?.city, Validators.required],
      division: [this.location?.division, Validators.required],
      state: [this.location?.state, Validators.required],
      country: [this.location?.country, Validators.required],
      pincode: [this.location?.pincode,  [Validators.required, Validators.minLength(6)]],
      latitude: [this.location?.latitude],
      longitude: [this.location?.longitude],
      googleMapLink: [this.location?.googleMapLink],
      status: [this.location?.status, Validators.required],
      
      contact1Initial: [this.location?.contact1Initial, Validators.required],
      contact1Name: [this.location?.contact1Name, Validators.required],
      contact1Occupation: [this.location?.contact1Occupation],
      contact1Phone1: [this.location?.contact1Phone1, Validators.required],
      contact1Phone2: [''],
      contact1Email: [this.location?.contact1Email, Validators.required],
  
      contact2Initial: [this.location?.contact2Initial, Validators.required],
      contact2Name: [this.location?.contact2Name, Validators.required],     
      contact2Phone1: [this.location?.contact2Phone1, Validators.required],
      contact2Phone2: [''],
      contact2Email: [this.location?.contact2Email, Validators.required],
     
      additionalInfo: [''],
    });
  }

  get locationFormControl() {
    return this.locationform.controls;
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
      this.toaster.success("Location Updated Successfully !")
    } else {
      this.toaster.warning('Fill all mandatory field.');
    }
  }

  saveLocation() {
  
    this.locationDataService.createLocation(this.location).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/location-list']);
      },
      error => {
        console.log(error);
      }
    );
  }

  
  Clear(){
    this.locationform.reset();
    }

    
    validatePincode(event) {
      const input = event.target;
      const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
      input.value = truncatedValue;
  }
  ValidatephoneNumber(event){
    const input = event.target;
      const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const truncatedValue = numericValue.slice(0, 10); // Truncate input to 6 characters
      input.value = truncatedValue;
  }

  CancelChanges() {
    this.router.navigate(['/location-list']);
  }

  isDuplicateData(newLocation: Location): boolean {
    for (let item of this.defaultLocations) {
      console.log('existing location', item.city)
      console.log('new location', newLocation.city)

      if (item.locationId === newLocation.locationId){
        continue;
      }

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
  }

}