import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationDataService } from 'src/app/location-data.service';
import { Location } from 'src/app/location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clear } from 'console';


@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
  
})
export class EditLocationComponent implements OnInit {
  
   // FormValidation
  locationform: FormGroup;
  submitted = false;

  location: Location = new Location(); 
  id: number;
  
  constructor(private locationDataService: LocationDataService, private router: Router,
    private route: ActivatedRoute , private formBuilder :FormBuilder) {}

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.locationDataService.getLocationById(this.id).subscribe({
        next: data => {
          this.location = data;
          console.log(this.id);
        },
        error: error => {
          console.log(error);
        }
      });

       // FormValidation
       this.locationform = this.formBuilder.group({
      locationname: ['', Validators.required],
      city: ['', Validators.required],
      division: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      number: ['', Validators.required],
      status: ['', Validators.required],
    });
    }
    
    get locationFormControl() {
      return this.locationform.controls;
    }

    onsubmit1(){
  this.submitted=true;
  if(this.locationform.valid){
    return
  }
  alert("unsuccess");
}
    
onSubmit() {
  this.submitted = true;
  
  if (this.locationform.valid) {
    console.log(this.location);
    this.saveLocation();
  } else {
    alert("Please fill all fields : कृपया सर्व फील्ड भरा");
  }
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

Clear(){
  this.locationform.reset();
  }}