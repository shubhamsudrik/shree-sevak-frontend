import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { Area } from "src/app/Classes/Area";
import { Country } from "src/app/Classes/Country";
import { User } from "src/app/Classes/user";
import { AreaDataService } from "src/app/services/area-data.service";
import { LocationDataService } from "src/app/services/location-data.service";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-create-area",
  templateUrl: "./create-area.component.html",
  styleUrls: ["./create-area.component.css"],
})
export class CreateAreaComponent implements OnInit {
  areaForm: FormGroup;
  area: Area = new Area();
  submitted: boolean = false;
  defaultAreas: any[];
  id: number;
  countrylist: Country[];
  countryId: number;
  stateId: number;
  cityId: number;
  divisionList: any;
  stateList: any[];
  cityList: any[];
  loginUserDetail: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private areaDataService: AreaDataService,
    private router: Router,
    private locationDataService: LocationDataService,
    private userService: UserDataService
  ) {}

  ngOnInit(): void {
    // this.getAllCountryRecord();
    this.loadForm();
    this.getAllAreas() 
    this.route.params.subscribe((params) => {
      this.id = +params["id"]; // the '+' sign is used to convert the parameter to a number
      console.log(this.id); // This will log the value "1" from your example URL
    });
    if (!this.id) {
      this.getAllCountry();
    
     
    } else {
      this.getAreaDetails();
    
    }
  

    
  }

  loadForm(){
    this.areaForm = this.formBuilder.group({
      areaName: ["", Validators.required],
      contactInitial: ["", Validators.required],
      contactName: ["", Validators.required],
      contactOccupation: [""],
      contactPhone1: ["", Validators.required],
      contactPhone2: [""],
      contactEmail: ["", [Validators.required, Validators.email]],
      city: [null, Validators.required],
      division: [null, Validators.required],
      state: [null, Validators.required],
      country: [null, Validators.required],
      status: ["", Validators.required],
    });
  }
  populateForm() {
    this.areaForm.patchValue({
      areaName: this.area?.areaName,
      contactInitial: this.area?.contactInitial,
      contactName: this.area?.contactName,
      contactOccupation: this.area?.contactOccupation,
      contactPhone1: this.area?.contactPhone1,
      contactPhone2: this.area?.contactPhone2,
      contactEmail: this.area?.contactEmail,
      city: this.area.city?.id,
      division: this.area.division?.id,
      state: this.area.state?.id,
      country: this.area.country?.id,
      status: this.area.status,
    });
  }

  getAllAreas() {
    this.areaDataService.getAllAreaList().subscribe((data) => {
      this.defaultAreas = data;
      console.log(this.defaultAreas);
    });
  }

  getAreaDetails() {
    this.areaDataService.getAreaById(this.id).subscribe((data) => {
      this.area = data;
      this.getAllCountryRecord();
     
      // this.setFeild();
    });
  }

  checkDublickateAndSave(isDuplicate: boolean) {
    if (isDuplicate) {
      // Data already exists error message
      alert("Area already exists with the same city, state, and division.");
    } else if (this.areaForm.valid) {
      // Data doesn't exist and the form is valid, save the location
      console.log(this.area.areaName);
      console.log(this.area);
      this.saveArea(this.area);
    } else {
      this.toast.warning("Fill all mandatory field.");
    }
  }

  onSubmit() {
    this.submitted = true;

    const isDuplicate = this.isDuplicateData(this.area);

    this.checkDublickateAndSave(isDuplicate);
  }
  saveArea(area: Area) {
    this.areaDataService.createArea(this.areaForm.value).subscribe((data: Area) => {
      console.log(data);
      this.toast.success("Area Added successfully");
      this.router.navigate(["/area-list"]);
    });
  }
  Clear() {
    this.areaForm.reset();
  }
  CancelChanges() {
    this.router.navigate(["/area-list"]);
  }

  get areaFormCotrols() {
    return this.areaForm.controls;
  }
  validatePincode(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
    input.value = truncatedValue;
  }
  validatePhoneNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
  }
  validatePhoneNumber1(event) {
    const input = event.target;
    const allowedCharacters = input.value.replace(/[^\d\s-]/g, ""); // Allow only digits, spaces, and dashes
    const truncatedValue = allowedCharacters.slice(0, 13); // Truncate input to 12 characters
    input.value = truncatedValue;
  }

  isDuplicateData(newArea: Area): boolean {
    for (let item of this.defaultAreas) {
      // console.log(item,newArea)
      if (item.areaId !== newArea.areaId) {
        if (
          item.city.id === newArea.city.id &&
          item.state.id === newArea.state.id &&
          item.division.id === newArea.division.id &&
          item.areaName === newArea.areaName
        ) {
          return true; // Data already exists
        }
      }
    }
    return false; // Data does not exist
    console.log(newArea);
  }

  updateArea() {
    if (this.areaForm.valid) {
      const isDuplicate = this.isDuplicateData(this.area);

      this.checkDublickateAndUpdate(isDuplicate);
    } else {
      this.toast.warning("Fill all mandatory field.");
    }
  }
  checkDublickateAndUpdate(isDuplicate: boolean) {
    if (isDuplicate) {
      // Data already exists error message
      alert(
        "Area already exists with the same, city, division,state, and country."
      );
    } else if (this.areaForm.valid) {
      // Data doesn't exist and the form is valid, save the location
      console.log(this.area.areaName);
      console.log(this.area);
      this.areaDataService.updateArea(this.areaForm.value, this.id).subscribe(
        (data) => {
          console.log("updated data", data);

          this.toast.success("update Succesfully");
          this.router.navigate(["/area-list"]);
        },
        (error) => this.toast.warning("Fill all mandatory field.")
      );
    }
  }

  getAllstate() {
    if (this.countryId) {
      this.locationDataService
        .getAllStateList(this.countryId)
        .subscribe((state) => {
          this.stateList = state;
          console.log(this.stateList);
        });
    } 
  }
  getAllCity() {
    if (this.stateId) {
      this.locationDataService
        .getAllCityList(this.countryId, this.stateId)
        .subscribe((city) => {
          this.cityList = city;
          console.log(this.stateList);
        });
    } 
  }
  getAllCountry() {
    this.locationDataService.getAllCountryList().subscribe((country) => {
      this.countrylist = country;
      console.log(this.countrylist);
      // this.getAllstate();
    });
  }
  getAllDivisions() {
   
    if (this.cityId) {
      this.locationDataService
        .getAllDivisionsList(this.countryId, this.stateId, this.cityId)
        .subscribe((division) => {
          this.divisionList = division;
          console.log(this.divisionList);
        });
    } 
  }
  setFeild(){
    this.areaForm.patchValue({
      
      city: this.area?.city?.id,
      division: this.area.division?.id,
      state: this.area.state?.id,
      country: this.area.country?.id,
    })
  }
  onCountrySelect(selectedCountry: number) {
    console.log(selectedCountry);
    this.countryId = selectedCountry;
    this.getAllstate();
  }

  onStateSelect(selectedState: number) {
  
    console.log(selectedState);
    this.stateId = selectedState;
    this.getAllCity();
  }
  onCitySelect(selectedCity: number) {
  
    console.log(selectedCity);
    this.cityId = selectedCity;
    this.getAllDivisions();
  }
  getAllCountryRecord() {
    // this.loginUserDetail = this.userService.getUserDetails();
    this.locationDataService.getAllCountryesData().subscribe((data) => {
      console.log(data);
      console.log(this.area);
      this.countrylist = data;
      console.log("country list", this.countrylist);
      // Assuming this.area.country is an object with an id property
      const selectedCountryId = this.area.country.id;
      const selectedCountry = this.countrylist.find(country => country.id === selectedCountryId);
      this.stateList = selectedCountry ? selectedCountry.states : [];
    

      console.log(this.stateList);
      const selectedStateId = this.area.state.id;
      console.log(selectedStateId);
    const selectedState = this.stateList.find(state => state.id ===selectedStateId);
    this.cityList=selectedState.cities
      console.log(this.cityList);

      const selectedCityId = this.area.city.id;
      console.log(selectedCityId);
    const selectedCity = this.cityList
        .find(city=> city.id === selectedCityId);
     this.divisionList=selectedCity.divisions
      console.log(this.divisionList);
      this.populateForm();
    });
  }
}
