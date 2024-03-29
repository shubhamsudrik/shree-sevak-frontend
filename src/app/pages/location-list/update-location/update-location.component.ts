import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/Classes/location';
import { AreaDataService } from 'src/app/services/area-data.service';
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
  isSelect: any=true;
  selectedArea: any;
  arealist:any;
  initialAreaId:number;


  constructor(
    private formBuilder: FormBuilder,
    private locationDataService: LocService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster:ToastrService,
    private areaDataService: AreaDataService
  ) {
    
  }

  ngOnInit(): void {
    this.getAreas()
    this.getLocations();
    this.id = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getLocations();
    this.locationDataService.getLocationById(this.id).subscribe({
      next: (data: any) => {
        console.log(data)
        console.log("data.area.areaId", data.area.areaId);
        this.initialAreaId=data.area?.areaId
        console.log("initialAreaId",this.initialAreaId);
        this.areaChange(this.initialAreaId);
        this.location = data;
        this.populateForm();
      },
      error: error => {
        console.log(error);
      }
    });

    // console.log("initialAreaId",this.initialAreaId);
    // this.areaChange(this.initialAreaId);
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
    this.locationform.patchValue({locationName:this.location?.locationName,
      mixedGenderAllow:this.location?.mixedGenderAllow},)
   
  }

  initializeForm() {
    this.locationform = this.formBuilder.group({
      
      locationName: [this.location?.locationName, Validators.required], 
      area: [this.location?.area],          
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
      contact1Email: [this.location?.contact1Email, [Validators.required, Validators.email]],
  
      contact2Initial: [this.location?.contact2Initial],
      contact2Name: [this.location?.contact2Name],    
      contact2Occupation: [this.location?.contact1Occupation], 
      contact2Phone1: [this.location?.contact2Phone1],
      contact2Phone2: ['',],
      contact2Email: [this.location?.contact2Email, [Validators.email]],
     
      additionalInfo: [''],
      mixedGenderAllow:[this.location?.mixedGenderAllow||false]
      
    });
  }

  onChange(event: any){
    console.log("mixedGenderAllow :",event.target.value);

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
      
    } else {
      this.toaster.warning('Fill all mandatory field.');
    }
  }

  saveLocation() {
  
    this.locationDataService.updateLocation(this.location,this.id).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/location-list']);
        this.toaster.success("Location Updated Successfully !")
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
  validatePhoneNumber1(event) {
    const input = event.target;
    const allowedCharacters = input.value.replace(/[^\d\s-]/g, ''); // Allow only digits, spaces, and dashes
    const truncatedValue = allowedCharacters.slice(0, 13); // Truncate input to 12 characters
    input.value = truncatedValue;
}

  CancelChanges() {
    this.router.navigate(['/location-list']);
  }
  getAreas(){
    this.areaDataService.getAreaByStatus("1").subscribe((data)=>{
      this.arealist=data
      console.log(this.arealist)
    })
  
  }


  setFields(){
    this.locationform.patchValue({
      city:this.selectedArea.city,
      division:this.selectedArea.division,
      state: this.selectedArea.state,
      country:this.selectedArea.country,
      area:this.selectedArea.areaId
  
    })
  }
  //
  areaChange(value:any){
    console.log("area selected ",value)
    this.areaDataService.getAreaById(value).subscribe((data)=>{
  this.isSelect  = true;

      this.selectedArea=data;
   this. setFields()
      console.log(this.selectedArea)

    })

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