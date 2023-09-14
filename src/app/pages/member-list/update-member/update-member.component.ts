import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/Classes/location';
import { LocationDataService } from 'src/app/services/location-data.service';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {

  locationform: FormGroup;
  submitted = false;
  location: Location = new Location();
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private locationDataService: LocationDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.locationDataService.getLocationById(this.id).subscribe({
      next: (data: Location) => {
        this.location = data;
        this.initializeForm();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  initializeForm() {
    this.locationform = this.formBuilder.group({
      locationname: [this.location.locationName, Validators.required],
      address1: [this.location.add1, Validators.required],
      address2: [this.location.add2, Validators.required],
      city: [this.location.city, Validators.required],
      division: [this.location.division, Validators.required],
      state: [this.location.state, Validators.required],
      country: [this.location.country, Validators.required],
      pincode: [this.location.pincode,  [Validators.required, Validators.minLength(6)]],
      number: [this.location.phoneNumber,  [Validators.required, Validators.minLength(10)]],
      latitude: [this.location.latitude, Validators.required],
      longitude: [this.location.longitude, Validators.required],
      status: [this.location.status, Validators.required]
    });
  }

  get locationFormControl() {
    return this.locationform.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.locationform.invalid) {
      return;
    }
    this.saveLocation();
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
  validatePhoneNumber(event){
    const input = event.target;
      const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      const truncatedValue = numericValue.slice(0, 10); // Truncate input to 6 characters
      input.value = truncatedValue;
  }

  CancelChanges() {
    this.router.navigate(['/location-list']);
  }
}