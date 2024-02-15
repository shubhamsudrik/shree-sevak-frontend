import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { Member } from "src/app/Classes/member";
import { User } from "src/app/Classes/user";
import { AreaDataService } from "src/app/services/area-data.service";
import { LocService } from "src/app/services/loc.service";
import { LocationDataService } from "src/app/services/location-data.service";
import { MemberListService } from "src/app/services/member-list.service";
import { UserDataService } from "src/app/services/user-data.service";

export interface Week {
  id: number;
  value: string;
}
@Component({
  selector: "app-add-new-member",
  templateUrl: "./add-new-member.component.html",
  styleUrls: ["./add-new-member.component.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddNewMemberComponent implements OnInit {
  selectedDays: any[];
  userDetail: User;
  areaId: any;
  memberform: FormGroup;
  submitted = false;
  defaultMembers: Member[] = [];
  Member: Member = new Member();

  arealist: any;
  WeekOff: any;
  loginUserDetail: User;
  baithakLocationList: any;
  memberId: number;
  countryId: number;
  stateId: number;
  cityId: number;
  countrylist: any;
  divisionList: any;
  cityList: any;
  stateList: any;
  selectedArea: any;
  isCountryRecordListLoaded: boolean = false;

  constructor(
    private MemberListService: MemberListService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private areaDataService: AreaDataService,
    private userDataService: UserDataService,
    private locationDataService: LocService,
    private locationService: LocationDataService
  ) {
    if (!this.memberId) {
      this.Member.marathiRead = true;
      this.Member.marathiWrite = true;
      this.Member.marathiSpeak = true;
      this.Member.hindiRead = true;
      this.Member.hindiWrite = true;
      this.Member.hindiSpeak = true;
      this.Member.englishRead = true;
      this.Member.englishWrite = true;
      this.Member.englishSpeak = true;
      this.Member.eligibleForNone = true;
      this.Member.eligibleForChild = false;
      this.Member.eligibleForGents = false;
      this.Member.eligibleForLadies = false;
      this.Member.status = "1";
      this.Member.initial = "Mr.";
      this.Member.education = "Graduate";
      // this.Member.country = "IN";
      // this.Member.state = "Maharashtra";
      // this.Member.division = "A";
    }
  }

  ngOnInit(): void {
    // this.getAllCountry();
  this.getLoginUserDetail()
    this.memberRecord();
    this.getAreas();
    this.memberId = this.route.snapshot.params["memberId"];
    console.log(this.memberId);
    if (this.memberId) {
      console.log("Im in update member");
      this.WeekOff = [
        { id: 1, value: "Sunday" },
        { id: 2, value: "Monday" },
        { id: 3, value: "Tuesday" },
        { id: 4, value: "Wednesday" },
        { id: 5, value: "Thursday" },
        { id: 6, value: "Friday" },
        { id: 7, value: "Saturday" },
      ];

      this.WeekOff = [
        { id: 1, value: "Sunday" },
        { id: 2, value: "Monday" },
        { id: 3, value: "Tuesday" },
        { id: 4, value: "Wednesday" },
        { id: 5, value: "Thursday" },
        { id: 6, value: "Friday" },
        { id: 7, value: "Saturday" },
      ];

      this.MemberListService.getMemberById(this.memberId).subscribe({
        next: (data: Member) => {
          console.log(data);
          this.Member = data;
          this.selectedArea = data.area;
          this.getBaithakLocationList(this.selectedArea.areaId);
          this.getAllCountryRecord();
          this.populateForm();
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.memberform.valueChanges.subscribe(() => {
        this.handleCheckboxChanges();
        this.handleCheckboxForVehical();
      });
    } else {
      console.log("Im in create member");
      this.WeekOff = [
        { id: 1, value: "Sunday" },
        { id: 2, value: "Monday" },
        { id: 3, value: "Tuesday" },
        { id: 4, value: "Wednesday" },
        { id: 5, value: "Thursday" },
        { id: 6, value: "Friday" },
        { id: 7, value: "Saturday" },
      ];

      this.memberform.valueChanges.subscribe(() => {
        this.handleCheckboxChanges();
        this.handleCheckboxForVehical();
      });
    }
  }

  populateForm() {
    const memberDays: Week[] = this.Member.weeklyOffs;
    console.log(memberDays);
    const listofDaysIds: number[] = [];
    memberDays.map((day: any) => {
      listofDaysIds.push(day.id);
    });
    console.log(listofDaysIds);
    this.memberform.patchValue({
      firstName: this.Member?.firstName,
      hindiRead: this.Member.hindiRead,
      hindiWrite: this.Member.hindiWrite,
      hindiSpeak: this.Member.hindiSpeak,
      marathiRead: this.Member.marathiRead,
      marathiWrite: this.Member.marathiWrite,
      marathiSpeak: this.Member.marathiSpeak,
      englishRead: this.Member.englishRead,
      englishWrite: this.Member.englishWrite,
      englishSpeak: this.Member.englishSpeak,
      area: this.Member.area.areaId,
      state: this.Member.state.id,
      country: this.Member.country.id,
      division: this.Member.division.id,
      city: this.Member.city.id,
      weeklyOffs: listofDaysIds,
    });
  }

  memberRecord() {
    // Validatons
    this.memberform = this.formBuilder.group({
      initial: [this.Member?.initial, Validators.required],
      firstName: [this.Member?.firstName, Validators.required],
      middleName: [this.Member?.middleName, Validators.required],
      lastName: [this.Member?.lastName, Validators.required],
      education: [this.Member?.education, Validators.required],
      occupation: [this.Member?.occupation, Validators.required],
      dob: [this.Member?.dob, Validators.required],
      gender: [this.Member?.gender, Validators.required],
      // role: [this.Member?.role, Validators.required],
      area: [this.Member?.area, Validators.required],
      addharNumber: ["", [Validators.minLength(12)]],
      panNo: [""],
      // photoBase64: [''],
      status: [""],
      add1: ["", Validators.required],
      add2: ["", Validators.required],
      add3: [""],
      add4: [""],
      city: [null, Validators.required],
      division: [null, Validators.required],
      state: [null, Validators.required],
      country: [null, Validators.required],
      pincode: ["", [Validators.required, Validators.minLength(6)]],
      latitude: [""],
      longitude: [""],
      googleMapLink: [""],

      mobile: ["", [Validators.required, Validators.minLength(10)]],
      phone: [""],
      email: ["", [Validators.required, Validators.email]],

      twoWheeler: [""],
      fourWheeler: [""],
      // both: [this.Member?.both],
      noVehical: [""],
      twoWheelerDetail: [""],
      fourWheelerDetail: [""],

      marathiRead: [""],
      marathiWrite: [""],
      marathiSpeak: [""],
      hindiRead: [""],
      hindiWrite: [""],
      hindiSpeak: [""],
      englishRead: [""],
      englishWrite: [""],
      englishSpeak: [""],

      eligibleForChild: [""],
      eligibleForGents: [""],
      eligibleForLadies: [""],
      eligibleForNone: [""],

      ownBaithakDay: ["", Validators.required],
      // type: ['', Validators.required],
      hajeriNo: ["", Validators.required],
      baithakLocation: ["", Validators.required], // hajeri no details contain Baithak location from now
      weeklyOffs: ["", Validators.required],
      additionalInfo: [""],
    });
  }
  getBaithakLocationList(id: number) {
    console.log(id);
    this.locationDataService.getLocationByAreaId(id).subscribe((data) => {
      this.baithakLocationList = data;
      console.log(this.baithakLocationList);
    });
  }

  getLoginUserDetail() {
    this.loginUserDetail = this.userDataService.getUserDetails();
  }

  onMultiSelectChange(event: any) {
    this.selectedDays = event.value;
    this.Member.weeklyOffs = this.selectedDays;
    console.log(this.selectedDays);
  }
  // // vehicacheckbox
  handleCheckboxForVehical() {
    const twoWheeler = this.memberform.get("twoWheeler");
    const fourWheeler = this.memberform.get("fourWheeler");
    const noVehical = this.memberform.get("noVehical");
    const twoWheelerDetail = this.memberform.get("twoWheelerDetail");
    const fourWheelerDetail = this.memberform.get("fourWheelerDetail");

    if (
      twoWheeler.value !== this.Member.twoWheeler ||
      fourWheeler.value !== this.Member.fourWheeler
    ) {
      noVehical.setValue(false, { emitEvent: false });
    } else if (noVehical.value !== this.Member.noVehical) {
      twoWheeler.setValue(false, { emitEvent: false });
      fourWheeler.setValue(false, { emitEvent: false });
      twoWheelerDetail.setValue("", { emitEvent: false });
      fourWheelerDetail.setValue("", { emitEvent: false });
    }
  }

  //handel check boxes
  handleCheckboxChanges() {
    const eligibleForChild = this.memberform.get("eligibleForChild");
    const eligibleForGents = this.memberform.get("eligibleForGents");
    const eligibleForLadies = this.memberform.get("eligibleForLadies");
    const eligibleForNone = this.memberform.get("eligibleForNone");

    // Check if the value has changed before making changes
    if (
      eligibleForChild.value !== this.Member.eligibleForChild ||
      eligibleForGents.value !== this.Member.eligibleForGents ||
      eligibleForLadies.value !== this.Member.eligibleForLadies
    ) {
      eligibleForNone.setValue(false, { emitEvent: false });
    } else if (eligibleForNone.value !== this.Member.eligibleForNone) {
      eligibleForChild.setValue(false, { emitEvent: false });
      eligibleForGents.setValue(false, { emitEvent: false });
      eligibleForLadies.setValue(false, { emitEvent: false });
    }

    // Update the Member object
    // this.Member.eligibleForChild = eligibleForChild.value;
    // this.Member.eligibleForGents = eligibleForGents.value;
    // this.Member.eligibleForLadies = eligibleForLadies.value;
  }

  getAreas() {
    const areaList = this.loginUserDetail.selectedAreas;
    console.log(areaList);
    this.arealist = areaList;
      console.log(this.arealist);
    // this.areaDataService.getAreaByStatus("1").subscribe((data) => {
    //   this.arealist = data;
    //   console.log(this.arealist);
    // });
  }
  areaSelected(value: any) {
    console.log("area selected", value);
    this.areaId = value;
    console.log(this.arealist);
    this.getBaithakLocationList(this.areaId);
    // this.selectedArea = this.arealist.find(
    //   (area) => area.areaId == +this.areaId
    // );
    this.areaDataService.getAreaById(value).subscribe((data) => {
      this.selectedArea = data
      if (!this.memberId && this.isCountryRecordListLoaded === false) {
        this.isCountryRecordListLoaded = true;
        this.getAllCountryRecord();
      }
      console.log(this.selectedArea);
      //  this. getAllCountryRecord()
      this.memberform.patchValue({
        state: this.selectedArea.state.id,
        country: this.selectedArea.country.id,
        division: this.selectedArea.division.id,
        city: this.selectedArea.city.id,
        area: this.selectedArea.areaId,
      });
    })

    
  }
  get MemberFormControl() {
    return this.memberform.controls;
  }

  onsubmit1() {
    this.submitted = true;
    if (this.memberform.valid) {
      return;
    }
    alert("unsuccessful");
  }

  onSubmit() {
    this.submitted = true;

    const isDuplicate = this.isDuplicateData(this.Member);

    if (isDuplicate) {
      // Data already exists error message
      alert("Data already exists with the same Aaddhar card Number.");
    } else if (this.memberform.valid) {
      // Data doesn't exist and the form is valid, save the Member
      if (!this.Member.addharNumber) {
        alert("Please provide Addhar card Number");
      }
      console.log(this.Member);
      if (!this.memberId) {
        this.saveMember();
      }
      if (this.memberId) {
        this.updateMemebr();
      }
    } else {
      this.toast.warning("Fill all mandatory field.");
    }
  }

  saveMember() {
    this.MemberListService.createMember(this.Member).subscribe(
      (data) => {
        console.log(data);
        this.toast.success("New Member Created successfully ");
        this.router.navigate(["/member-list"]);
      },
      (error) => console.log(error)
    );
  }
  updateMemebr() {
    this.MemberListService.updateMember(
      this.Member.memberId,
      this.Member
    ).subscribe(
      (data) => {
        console.log("update Memebr", data);
        this.toast.success("  Member Info Update Succesfully ");
        this.router.navigate(["/member-list"]);
      },
      (error) => console.log(error)
    );
  }

  CancelChanges() {
    this.router.navigate(["/member-list"]);
  }

  Clear() {
    this.memberform.reset();
  }

  // getting member data
  getMembers() {
    this.MemberListService.getMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers = data;
        console.log(this.defaultMembers);
      },
      (error) => {
        console.error("Error fetching Members:", error);
      }
    );
  }

  // piccode validation
  validatePincode(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
    input.value = truncatedValue;
  }
  // mobile number validation
  validatePhoneNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
  }
  // phone number validation
  // validatePhoneNumber1(event){
  //   const input = event.target;
  //     // const numericValue = input.value.replace(/[^0-9]/g, '');
  //     const numericValue = input.value.replace(/[^0-9\s-]/g, ''); // Remove non-numeric characters
  //     const truncatedValue = numericValue.slice(0, 12); // Truncate input to 10 characters
  //     input.value = truncatedValue;
  // }

  validatePhoneNumber1(event) {
    const input = event.target;
    const allowedCharacters = input.value.replace(/[^\d\s-]/g, ""); // Allow only digits, spaces, and dashes
    const truncatedValue = allowedCharacters.slice(0, 13); // Truncate input to 12 characters
    input.value = truncatedValue;
  }

  // addhar number validation
  validateAddharNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 12); // Truncate input to 12 characters
    input.value = truncatedValue;
  }
  // addhar number validation
  validateHajeriNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    input.value = numericValue;
  }

  // addhar number validation
  validatePanNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9a-zA-Z]/g, "");

    // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
  }

  isDuplicateData(newMember: Member): boolean {
    for (let item of this.defaultMembers) {
      if (newMember.memberId !== item.memberId) {
        console.log("Existing Member Aadhar:", item.addharNumber);
        console.log("New Member Aadhar:", newMember.addharNumber);
        if (
          item.addharNumber === newMember.addharNumber
          // item.id !== newMember.MemberId
        ) {
          return true; // Data already exists
        }
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
      console.log(this.Member);
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
