import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Location } from 'src/app/Classes/location';
import { MemberListService } from 'src/app/services/member-list.service';
import { Member } from 'src/app/Classes/member';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { LocService } from 'src/app/services/loc.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { SchedularComponent } from '../schedular/schedular.component';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { LoginService } from 'src/app/services/login.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

constructor(
  private router: Router,
  private memberListService: MemberListService,
  private locService: LocService,
  private scheduleDataService : ScheduleDataService,
  private login : LoginService,
  private userDataService: UserDataService
){}

  defaultLocations: Location[] = [];
  defaultMembers: Member[] = [];
  locdata:any[]=[];
  defaultSchedular:any [] =[];

  locationCount: number ;
  memberCount: number ;
  locCount: number ;
  scheduleCount: number;

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
      }, 600000);
    }


  //get active member data
  private getMemberList(){
    this.memberListService.getMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers =data;
        this.memberCount=this.defaultMembers.length;
      
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
          this.locCount=this.locdata.length;
          console.log(data)
         } )
    }


    // generatePDFReport() {
    //   // Create a new jsPDF instance with A3 page size (you can set other options as needed)
    //   const doc = new jsPDF('landscape', 'mm', 'a3');
    
    //    // Calculate the center of the page
    //    const centerX = doc.internal.pageSize.width / 2;

       
    //   // Fetch data from your service
    //   this.locService.getLocationList().subscribe(
    //     (data: any[]) => {
    //       console.log(data);
    //       // Generate the PDF content based on your data
    //       doc.text('Children Baithak Report', centerX, 10,{align:'center'});
    //       doc.text('Location Name:', 10, 20); 
    //       doc.text('Add1:', 60, 20); // Add the header
    
    //       // Define cell dimensions
    //       const cellWidth = 40;
    //       const cellHeight = 10;

    //       // Add your data to the PDF content
    //       let yPos = 30;     //adjust table height from header
    //       data.forEach((location) => {

    //          // Add borders
    //         doc.rect(10, yPos, cellWidth, cellHeight); // for column size
    //         doc.rect(50, yPos, cellWidth, cellHeight);
    //         doc.rect(90, yPos, cellWidth, cellHeight);

    //         // Add data to the cells
    //         doc.text(location.locationName, 15, yPos+5);    //10 for text right-align       
    //         doc.text(location.add1, 55, yPos+5); // add 50 for next column


    //         yPos += cellHeight; // Increase the y-position to move to the next line
    //       });
    
    //       // Save or open the PDF
    //       doc.save('report.pdf');
    //     }
    //   );
    // }


  
  //   title = 'htmltopdf';
  //   spac = ' ';
  //   space ='                                               .';

  //   @ViewChild('pdfTable') pdfTable: ElementRef;
  //   serialNumber: number = 1; 
  //   totalLocations: number = 0; // Initialize the total count
  
  //   public downloadAsPDF() {
  //     const doc = new jsPDF('landscape', 'mm', 'a3'); // Set A3 page size and landscape orientation
  
  //     // Fetch data from your service
      
  //     this.locService.getLocationList().subscribe(
  //       (data: any[]) => {
  //         console.log(data);

  //         // Count the total number of locations
  //       this.totalLocations = data.length;
  //       this.serialNumber = 1;
  
  //         // Create an HTML table to display data
          
  //         let tableHtml = `<table>
  //             <thead style="text-align: center;">
  //               <tr >
  //                <th colspan="2" style="background-color: white; text-center color: black;">Total Location: ${data.length}</th>
  //               <th>
  //                 <table>     
  //                     <tr><th style="background-color: white; color: black; ">${this.spac}</th></tr>              
  //                     <tr><th style="background-color: yellow; color: black;">Date: ${new Date().toLocaleDateString()}${this.space}</th></tr>
  //                     <tr><th style="background-color: white; color: black; ">Section 2 ${this.spac}</th></tr>                    
  //                     <tr><th style="background-color: green; color: black;">${this.spac}</th></tr>  
  //                 </table>                    
  //               </th>                
  //               </tr>
  //               <tr>
  //                 <th>Sr No</th>
  //                 <th>Location Name</th>
  //                 <th>Add1</th>
  //               </tr>
  //             </thead>
  //             <tbody>`;
  //           data.forEach((location) => {
  //             tableHtml += `<tr><td>${this.serialNumber}</td><td>${location.locationName}</td><td>${location.add1}</td></tr>`;
  //             this.serialNumber++; // Increment the serial number for the next row
  //           });
  //           tableHtml += '</tbody></table>';

  //         // Add the total count to the PDF content
  //       // tableHtml = `<p>Total Locations: ${this.totalLocations}</p>` + tableHtml;
  
  //         // Convert the HTML table to PDF using pdfMake
  //         var html = htmlToPdfmake(tableHtml , { defaultStyles: { font: 'Shivaji' } });
  //         // var html = htmlToPdfmake('<p>मराठी टेक्स्ट</p>', { defaultStyles: { font: 'Mangal' } });

  //         const documentDefinition = { content: html };
  //         pdfMake.createPdf(documentDefinition).open();

  //         this.serialNumber = 1;  
  //         this.totalLocations = 0;
  //       }
  //     );
  //   }
    
  }