import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from 'src/app/Classes/location';
import { MemberListService } from 'src/app/services/member-list.service';
import { Member } from 'src/app/Classes/member';
import { LocService } from 'src/app/services/loc.service';
import { Router } from '@angular/router';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
// import { chartExample1 } from 'src/app/variables/charts';
// import Chart from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ViewChild('chartSalesCanvas', { static: true }) chartSalesCanvas: ElementRef;
  // @ViewChild('chartSalesCanvas1', { static: true }) chartSalesCanvas1: ElementRef;

  // public datasets: any;
  // public data: any;
  // public salesChart;

constructor(
  private router: Router,
  private memberListService: MemberListService,
  private locService: LocService,
  private scheduleDataService : ScheduleDataService,
){}

  defaultLocations: Location[] = [];
  defaultMembers: Member[] = [];
  locdata:any[]=[];
  defaultSchedular:any [] =[];

  locationCount: number ;
  memberCount: number ;
  locCount: number ;
  scheduleCount: number;
  a= 0;
  sum;

  ngOnInit() {
    this.getMemberList();
    this.getloc();
    this.getScheduleRecord();

      // // Set the token in localStorage when the user logs in or obtains the token.
      // const token = this.login.loginUser; // Replace with your actual token
      // localStorage.setItem('token', token);
  
      // Remove the token .
      setTimeout(() => {
        localStorage.removeItem('token');
        console.log('Token removed from localStorage.');
        this.router.navigate(['/login']);
      }, 6000000);


  //   this.datasets = [1,2,3,4,5,14,7,8,9]

  //   console.log(this.datasets)
  //   this.data = this.datasets;
        
  //  const memberIndexToShow = 0;

  //  if (this.chartSalesCanvas) {
  //   var chartSales = this.chartSalesCanvas.nativeElement;

  //   this.salesChart = new Chart(chartSales, {
  //     type: 'line',
  //     options: chartExample1.options,
  //     data: chartExample1.data
  //   });

  //   // Update the chart data
  //   if (this.salesChart) {
  //     this.salesChart.data.datasets[0].data = this.data;
  //     this.salesChart.update();
  //   }
  // }
}


// // Function to update the chart
// updateChart() {
//   if (this.salesChart) {
//     this.salesChart.data.datasets[0].data = this.data;
//     this.salesChart.update();
//   }
// }

  //get active member data
  private getMemberList(){
    this.memberListService.getMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers =data;
        console.log(this.defaultMembers)
        console.log(this.defaultMembers)
        this.memberCount=this.defaultMembers.length;
      
  //       // Print the index numbers of the elements
  //   for (let i = 0; i < this.defaultMembers.length; i++) {
  //    this.sum = this.a+i
  //     console.log(`Index ${i}:`);
  //     console.log(this.sum)
  //   }
      },)
  }

  //get all schedule data
  private getScheduleRecord(){
    this.scheduleDataService.getAllData().subscribe(
      (data: any[]) => {
        this.defaultSchedular =data;
        console.log(this.defaultSchedular)
        this.scheduleCount=this.defaultSchedular.length;
        console.log(this.scheduleCount)
      },)
  }
  
    //active loc data
    getloc(){
      this.locService.getLocationList().subscribe(
        (data:any[]) => {
          this.locdata=data;
          console.log(this.locdata)
          this.locCount=this.locdata.length;
          console.log(data)
         } )
    }
  }




// <div class="header bg-gradient-danger pb-8 pt-5 pt-md-8 custom-header-height">
//   <div class="container-fluid">
//     <div class="header-body custom-header-height1">
//       <!-- Card stats -->
//       <div class="row ">
//         <div class="col-xl-4 col-lg-6" >
//           <div class="card card-stats mb-4 mb-xl-0">
//             <div class="card-body " style="height: 150px;">
//               <div class="row">
//                 <div class="col">
      
//                   <!-- this for export to pdf -->
//                   <!-- <div class="container">
//                     <div id="pdfTable" #pdfTable>
                     
//                     </div>
//                     <button class="btn btn-primary" (click)="downloadAsPDF()">Generate Report</button>
//                   </div> -->
//                   <!-- <div> -->
//                     <!-- ... other content ... -->
//                     <!-- <button (click)="generatePDF()">Generate PDF</button>
//                   </div> -->
//                   <!-- end -->           

                 
//                   <a class="nav-link nav-link-icon" routerLinkActive="active" [routerLink]="['/location-list']">
//                   <!-- <i class="ni ni-key-25"></i>  -->
//                   <span class="nav-link-inner--text" style="font-size: x-large; color: black;">Active Location</span>
//                   </a>
//                   <span class="h2 font-weight-bold mb-0">{{locCount}}</span>
//                 </div>
//                 <div class="col-auto">
//                   <div class="icon icon-shape bg-danger text-white rounded-circle shadow">                    
//                    <i class="fas fa-map-marker-alt"></i>
//                   </div>
//                 </div>
//               </div>
//               <!-- <p class="mt-3 mb-0 text-muted text-sm">
//                 <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
//                 <span class="text-nowrap">Since last month</span>
//               </p> -->
//             </div>
//           </div>
//         </div>
        
//         <div class="col-xl-4 col-lg-6">
//           <div class="card card-stats mb-4 mb-xl-0">
//             <div class="card-body"  style="height: 150px;">
//               <div class="row">
//                 <div class="col">
//                   <a class="nav-link nav-link-icon" routerLinkActive="active" [routerLink]="['/member-list']">
//                     <!-- <i class="ni ni-key-25"></i>  -->
//                     <span class="nav-link-inner--text" style="font-size: x-large; color: black;">Active Member</span>
//                     </a>
//                   <span class="h2 font-weight-bold mb-0">{{memberCount}}</span>
//                 </div>
//                 <div class="col-auto">
//                   <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
//                     <i class="fas fa-users"></i>
//                   </div>
//                 </div>
//               </div>
//               <!-- <p class="mt-3 mb-0 text-muted text-sm">
//                 <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
//                 <span class="text-nowrap">Since last week</span>
//               </p> -->
//             </div>
//           </div>
//         </div>
//         <div class="col-xl-4 col-lg-6">
//           <div class="card card-stats mb-4 mb-xl-0">
//             <div class="card-body"  style="height: 150px;">
//               <div class="row">
//                 <div class="col">
//                   <a class="nav-link nav-link-icon" routerLinkActive="active" [routerLink]="['/schedular']">
//                     <!-- <i class="ni ni-key-25"></i>  -->
//                     <span class="nav-link-inner--text" style="font-size: x-large; color: black;">Scheduled Baithak</span>
//                     </a>
//                   <span class="h2 font-weight-bold mb-0">{{scheduleCount}}</span>
//                 </div>
//                 <div class="col-auto">
//                   <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
//                     <i class="fas fa-calendar-check"></i>
//                   </div>
//                 </div>
//               </div>
//               <!-- <p class="mt-3 mb-0 text-muted text-sm">
//                 <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
//                 <span class="text-nowrap">Since yesterday</span>
//               </p> -->
//             </div>
//           </div>
//         </div>
//       </div>        
//     </div>
//   </div>
// </div>