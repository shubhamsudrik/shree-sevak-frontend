import { Component, OnInit } from '@angular/core';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Location } from 'src/app/Classes/location';
import { MemberListService } from 'src/app/services/member-list.service';
import { Member } from 'src/app/Classes/member';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

constructor(
  private locationDataService: LocationDataService,
  private memberListService: MemberListService,
){}

  defaultLocations: Location[] = [];
  defaultMembers: Member[] = [];

  locationCount: number ;
  memberCount: number ;

  ngOnInit() {
    this.getLocationList();
    this.getMemberList();
  }

  // Get active location
  getLocationList() {
    this.locationDataService.getLocationList().subscribe(
      (data: Location[]) => {
        this.defaultLocations = data;
        this.locationCount = this.defaultLocations.length; // Update the count when data is fetched
        console.log(this.locationCount); // Log the count here
    
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }
   //get active member data
   private getMemberList(){
    this.memberListService.getMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers =data;
        this.memberCount=this.defaultMembers.length;
      
      },)
  }
  }
