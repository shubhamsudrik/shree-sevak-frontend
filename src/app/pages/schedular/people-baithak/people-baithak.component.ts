import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PeopleBaithak } from "src/app/Classes/people-baithak";
import { DaysService } from "src/app/services/days.service";
import { LocService } from "src/app/services/loc.service";
import { LocationDataService } from "src/app/services/location-data.service";
import { PepoleBaithakService } from "src/app/services/pepole-baithak.service";
import { UserDataService } from "src/app/services/user-data.service";

interface City {
  name: string;
  code: string;
}
@Component({
  selector: "app-people-baithak",
  templateUrl: "./people-baithak.component.html",
  styleUrls: ["./people-baithak.component.css"],
})
export class PeopleBaithakComponent implements OnInit {

  cols: { field: string; header: string }[];

  submited: boolean = false;
  baithakFrom: FormGroup;
  peopleBaithak: PeopleBaithak = new PeopleBaithak();

  selectedCity: City;
  cities: { name: string; code: string; inactive: boolean }[];

  products: any;
  cities1: { label: string; value: string }[];
  updatedDays: { label: string; value: number }[];
  locationList: any[]=[];
  userDetails: import("d:/shree-sevak-fe/shree-sevak-frontend1/shree-sevak-frontend/src/app/Classes/user").User;
  tempLocationList: any=[];
  days: any[];
  baithakTypes: any[];
  constructor(
    private formbuilder: FormBuilder,
    private userDataService: UserDataService,
    private locDataService: LocService,
    private daysService: DaysService,
  private peopleBaithakService: PepoleBaithakService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.userDataService.getUserDetails();
    this.getAllLocationBaseOnUserArea();
    this.retrunlocationlist();
    this.daysInWeek();
    this.baithakFromRecord();
   

    this.baithakTypes = [
      {
        type: "Gents",
        value: "Gents",
      },
      {
        type: "Ladies", value: "Ladies" 
      }
    ];
   
    this.cols = [
      { field: "Monday", header: "Monday" },
      { field: "Tuesday", header: "Tuesday" },
      { field: "Wednesday", header: "Wednesday" },
      { field: "Thursday", header: "Thursday" },
      { field: "Friday", header: "Friday" },
      { field: "Saturday", header: "Saturday" },
      { field: "Sunday", header: "Sunday" },
    ];
  }

  baithakFromRecord() {
    this.baithakFrom = this.formbuilder.group({
      baithakId: [null],
      location:[null,Validators.required],
      baithakType: ["", Validators.required],
      dayOfWeek: ["", Validators.required],
      fromTime: ["", Validators.required],
      status: [null],
      toTime: ["", Validators.required],

    });
  }

  onSubmit() {
    const addBaithak=this.baithakFrom.value
   console.log(this.baithakFrom.value)
   this.peopleBaithakService.saveBaithakDetails(addBaithak).subscribe(data=>{
    console.log("save baithak record",data)
   })

  }
  retrunlocationlist() {
    // this.locationList=[...this.tempLocationList[0],...this.tempLocationList[1]]
    console.log(this.tempLocationList);
  }
  getAllLocationBaseOnUserArea() {
    const areaList = this.userDetails.selectedAreas;
    console.log(areaList);

    for (let i = 0; i < areaList.length; i++) {
      this.locDataService
        .getLocationByAreaId(areaList[i].areaId)
        .subscribe((data) => {
          this.tempLocationList.push(data);
        });
    }
  }
  daysInWeek() {
    this.daysService.getWeekDays().subscribe((data) => {
      console.log(data);
      this.days = data;
    });
  }
  onClickLocation(event: any) {
    console.log(event)
    console.log(event.value);
  console.log(event.target.value);
  
   if(this.locationList.length==0 || this.locationList==null){
    const locationList=[]
    for(let i=0;i<this.tempLocationList.length;i++){
      console.log(this.tempLocationList[i]);
     console.log( locationList.push(...this.tempLocationList[i]))
    }
    this.locationList=locationList
    console.log(this.locationList)
   }
  
  console.log(this.locationList)
  }
}
