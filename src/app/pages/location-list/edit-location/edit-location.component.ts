import { Component, OnInit } from "@angular/core";

import { Location } from "src/app/Classes/location";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LocService } from "src/app/services/loc.service";
import { ToastrService } from "ngx-toastr";
import { Area } from "src/app/Classes/Area";
import { AreaDataService } from "src/app/services/area-data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDataService } from "src/app/services/user-data.service";
import { User } from "src/app/Classes/user";
import { LocationChangeListener } from "@angular/common";
import { LocationDataService } from "src/app/services/location-data.service";

@Component({
  selector: "app-edit-location",
  templateUrl: "./edit-location.component.html",
  styleUrls: ["./edit-location.component.css"],
})
export class EditLocationComponent implements OnInit {
  locationform: FormGroup;
  submitted = false;
  defaultLocations: Location[] = [];
  location: any = new Location();
  initialAreaId: number;
  arealist: Area[];
  count: number = 0;
  selectedArea: Area = new Area();
  isSelect: boolean = false;
  id: number;
  stateList: any;
  countrylist: any;
  cityId: number;
  stateId: number;
  countryId: number;
  cityList: any[];
  divisionList: any[];
  isCountryRecordListLoaded: boolean = false;
  loginUserDetail: User;

  constructor(
    private locationDataService: LocService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private areaDataService: AreaDataService,
    private userDataService: UserDataService,
    private locationService: LocationDataService
  ) {
    this.location.status = 1;
    // this.location.contact1Email='@gmail.com';
    // this.location.contact2Email='@gmail.com';
    // this.location.contact1Initial='Mr.';
    // this.location.contact2Initial='Mr.';
    // this.location.contact1Occupation='Graduate';
  }

  ngOnInit(): void {
    this.loginUserDetail = this.userDataService.getUserDetails();
    this.getAreas();
    this.getLocations();
    this.addLocationRecord();
    this.id = this.route.snapshot.params["id"];
    console.log("id " + this.id);
    if (this.id) {
      this.getLocations();

      this.locationDataService.getLocationById(this.id).subscribe({
        next: (data: any) => {
          console.log(data);
          this.selectedArea = data.area;
          this.getAllCountryRecord();
          console.log("locationId " + this.id);
          console.log("data.area.areaId ", data.area.areaId);
          this.initialAreaId = data?.area?.areaId;
          console.log("initialAreaId", this.initialAreaId);
          this.areaChange(this.initialAreaId);
          this.location = data;
          this.populateForm();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  addLocationRecord() {
    this.locationform = this.formBuilder.group({
      locationName: ["", Validators.required],
      area: ["", Validators.required],
      add1: ["", Validators.required],
      add2: ["", Validators.required],
      city: ["", Validators.required],
      division: [""],
      state: ["", Validators.required],
      country: ["", Validators.required],
      pincode: ["", [Validators.required, Validators.minLength(6)]],
      status: ["", Validators.required],
      latitude: [""],
      longitude: [""],
      googleMapLink: [""],
      add3: [""],
      add4: [""],
      additionalInfo: [""],
      contact1Email: ["", [Validators.required, Validators.email]],
      contact1Initial: ["", Validators.required],
      contact1Name: ["", Validators.required],
      contact1Occupation: [""],
      contact1Phone1: [""],
      contact1Phone2: [""],
      contact2Email: ["",],
      contact2Initial: [""],
      contact2Name: [""],
      contact2Occupation: [""],
      contact2Phone1: [""],
      contact2Phone2: [""],
      mixedGenderAllow: [false],
    });
  }
  getloginUserDetail() {
    this.loginUserDetail = this.userDataService.getUserDetails();
  }

  populateForm() {
    this.locationform.patchValue({
      locationName: this.location?.locationName,

      area: this.location?.area.areaId,
      add1: this.location?.add1,
      add2: this.location?.add2,
      city: this.location?.city.cityId,
      division: this.location?.division.divisionId,
      state: this.location?.state.stateId,
      country: this.location?.country.countryId,
      pincode: this.location?.pincode,
      status: this.location?.status,
      latitude: this.location?.latitude,
      longitude: this.location?.longitude,
      googleMapLink: this.location?.googleMapLink,
      add3: this.location?.add3,
      add4: this.location?.add4,
      additionalInfo: this.location?.additionalInfo,
      contact1Email: this.location?.contact1Email,
      contact1Initial: this.location?.contact1Initial,
      contact1Name: this.location?.contact1Name,
      contact1Occupation: this.location?.contact1Occupation,
      contact1Phone1: this.location?.contact1Phone1,
      contact1Phone2: this.location?.contact1Phone2,
      contact2Email: this.location?.contact2Email,
      contact2Initial: this.location?.contact2Initial,
      contact2Name: this.location?.contact2Name,
      contact2Occupation: this.location?.contact2Occupation,
      contact2Phone1: this.location?.contact2Phone1,
      contact2Phone2: this.location?.contact2Phone2,
      mixedGenderAllow: this.location?.mixedGenderAllow,
    });
  }
  setFields() {
    this.locationform.patchValue({
      city: this.selectedArea.city.id,
      division: this.selectedArea.division.id,
      state: this.selectedArea.state.id,
      country: this.selectedArea.country.id,
      area: this.selectedArea.areaId,
    });
  }

  getAreas() {
    const areaList = this.loginUserDetail.selectedAreas;
    this.arealist = areaList;
      console.log(this.arealist);
    // this.areaDataService.getAreaByStatus("1").subscribe((data) => {
    //   this.arealist = data;
    // });
  }

  onChange(event: any) {
    console.log("mixedGenderAllow :", event.target.value);
  }

  //
  areaChange(value: any) {
    console.log("area selected ", value);

    this.areaDataService.getAreaById(value).subscribe((data) => {
      this.isSelect = true;
      this.selectedArea = data;

      if (!this.id && this.isCountryRecordListLoaded === false) {
        this.isCountryRecordListLoaded = true;
        this.getAllCountryRecord();
      }
      this.setFields();
      console.log(this.selectedArea);
    });
  }
  get locationFormControl() {
    return this.locationform.controls;
  }

  onsubmit1() {
    this.submitted = true;
    if (this.locationform.valid) {
      return;
    }
    alert("unsuccessful");
  }

  onSubmit() {
    this.submitted = true;

    const isDuplicate = this.isDuplicateData(this.location);

    if (isDuplicate) {
      // Data already exists error message
      alert(
        "Data already exists with the same Location, Division, City and State"
      );
    } else if (this.locationform.valid) {
      // Data doesn't exist and the form is valid, save the location
      console.log(this.location.locationName);
      console.log(this.location);
      if (!this.id) {
        this.saveLocation();
      }
      if (this.id) {
        this.saveUpdateLocation();
      }
    } else {
      this.toast.warning("Fill all mandatory field.");
    }
  }

  saveLocation() {
    this.locationDataService.createLocation(this.locationform.value).subscribe(
      (data) => {
        console.log(data);
        this.toast.success("  Location Info Save Succesfully !");
        this.router.navigate(["/location-list"]);
      },
      (error) => console.log(error)
    );
  }

  saveUpdateLocation() {
    this.locationDataService
      .updateLocation(this.locationform.value, this.id)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/location-list"]);
          this.toast.success("Location Updated Successfully !");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  CancelChanges() {
    this.router.navigate(["/location-list"]);
  }

  Clear() {
    this.locationform.reset();
  }

  getLocations() {
    this.locationDataService.getLocationList().subscribe(
      (data: any[]) => {
        this.defaultLocations = data;
        console.log(this.defaultLocations);
      },
      (error) => {
        console.error("Error fetching locations:", error);
      }
    );
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
    const truncatedValue = allowedCharacters.slice(0, 13); // Truncate input to 13 characters
    input.value = truncatedValue;
  }

  isDuplicateData(newLocation: Location): boolean {
    for (let item of this.defaultLocations) {
      if (item.locationId === newLocation.locationId) {
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
    console.log(newLocation);
  }
  isDuplicateDataInUpdate(newLocation: Location): boolean {
    for (let item of this.defaultLocations) {
      console.log("existing location", item.city);
      console.log("new location", newLocation.city);

      if (item.locationId === newLocation.locationId) {
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

  getAllstate() {
    if (this.countryId) {
      this.locationService
        .getAllStateList(this.countryId)
        .subscribe((state) => {
          this.stateList = state;
          console.log(this.stateList);
        });
    }
  }
  getAllCity() {
    if (this.stateId) {
      this.locationService
        .getAllCityList(this.countryId, this.stateId)
        .subscribe((city) => {
          this.cityList = city;
          console.log(this.stateList);
        });
    }
  }
  getAllCountry() {
    this.locationService.getAllCountryList().subscribe((country) => {
      this.countrylist = country;
      console.log(this.countrylist);
      // this.getAllstate();
    });
  }
  getAllDivisions() {
    if (this.stateId) {
      this.locationService
        .getAllDivisionsList(this.countryId, this.stateId, this.cityId)
        .subscribe((division) => {
          this.divisionList = division;
          console.log(this.divisionList);
        });
    }
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
    this.locationService.getAllCountryesData().subscribe((data) => {
      console.log(data);

      this.countrylist = data;
      console.log("country list", this.countrylist);
      // Assuming this.area.country is an object with an id property
      const selectedCountryId = this.selectedArea.country.id;
      const selectedCountry = this.countrylist.find(
        (country) => country.id === selectedCountryId
      );
      this.stateList = selectedCountry ? selectedCountry.states : [];

      console.log(this.stateList);
      const selectedStateId = this.selectedArea.state.id;
      console.log(selectedStateId);
      const selectedState = this.stateList.find(
        (state) => state.id === selectedStateId
      );
      this.cityList = selectedState.cities;
      console.log(this.cityList);

      const selectedCityId = this.selectedArea.city.id;
      console.log(selectedCityId);
      const selectedCity = this.cityList.find(
        (city) => city.id === selectedCityId
      );
      this.divisionList = selectedCity.divisions;
      console.log(this.divisionList);
    });
  }
}
