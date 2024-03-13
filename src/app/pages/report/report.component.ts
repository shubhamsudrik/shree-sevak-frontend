// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import htmlToPdfmake from 'html-to-pdfmake';
// import jsPDF from 'jspdf';
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import { LocService } from 'src/app/services/loc.service';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html',
//   styleUrls: ['./report.component.css']
// })
// export class ReportComponent implements OnInit {
//   constructor(private locService: LocService) {}

//   totalLocations: number = 0;
//   locations: any[] = [];
//   currentDate: string = new Date().toLocaleDateString();

//   @ViewChild('pdfTable') pdfTable: ElementRef;
//   serialNumber: number = 1;

//   Bhag: string = ''; // Property to store user input
//   Shlok: string = '';
//   inputWidth: number = 100; // Initial width percentage
//   inputHeight: number = 100; // Initial height percentage

//   // // Define font families for both languages
//   //  fonts = {
//   //   Marathi: {
//   //     normal: 'path-to-your-marathi-normal-font.ttf', // Replace with your Marathi font path
//   //     bold: 'path-to-your-marathi-bold-font.ttf', // Replace with your Marathi bold font path
//   //     italics: 'path-to-your-marathi-italics-font.ttf', // Replace with your Marathi italics font path
//   //     bolditalics: 'path-to-your-marathi-bold-italics-font.ttf', // Replace with your Marathi bold-italics font path
//   //   },
//   //   English: {
//   //     normal: 'path-to-your-english-normal-font.ttf', // Replace with your English font path
//   //     bold: 'path-to-your-english-bold-font.ttf', // Replace with your English bold font path
//   //     italics: 'path-to-your-english-italics-font.ttf', // Replace with your English italics font path
//   //     bolditalics: 'path-to-your-english-bold-italics-font.ttf', // Replace with your English bold-italics font path
//   //   },
//   // };

//   // Event handler for when the input is in focus
//   onFocus() {
//     this.inputWidth = 100; // You can adjust the width when in focus
//     this.inputHeight = 100; // You can adjust the height when in focus
//   }

//   // Event handler for when the input loses focus
//   onBlur() {
//     this.inputWidth = 100; // Reset to the original width when focus is lost
//     this.inputHeight = 100; // Reset to the original height when focus is lost
//   }

//   ngOnInit() {
//     this.downloadAsPDF();
//   }

//   generatePDF() {
//     this.downloadAsPDF();
//   }

//   public downloadAsPDF() {
//     const doc = new jsPDF('landscape', 'mm', 'a3');

//     // Fetch data from your service
//     this.locService.getLocationList().subscribe((data: any[]) => {
//       this.locations = data;
//       console.log(data);

//       //  Count the total number of locations
//       this.totalLocations = data.length;
//       console.log(this.totalLocations)
//       this.serialNumber = 1;

//       // Get the HTML content of the table
//       const tableHtml = document.getElementById('pdfTable').innerHTML;

//       // Convert HTML to pdfmake format
//       const pdfMakeContent = htmlToPdfmake(tableHtml, { defaultStyles: { font: 'Arial' } });

//       // pdfMake.fonts = this.fonts; // Use the defined fonts

//       // Create the PDF content
//       const documentDefinition = {
//         content: pdfMakeContent,
//       //   defaultStyle: {
//       //     font: 'Marathi', // Set the default font to Marathi
//       // },
//       };

//       // Create and open the PDF
//       const pdfDoc = pdfMake.createPdf(documentDefinition);
//       pdfDoc.open();

//       this.serialNumber = 1;
//       this.totalLocations = 0;
//     });
//   }
// }
// <!-- your-component.component.html -->
// <div class="container-fluid mt--7 pb-8 pt-5 pt-md-8">
//   <div class="py-7 py-lg-8"></div>
//   <!-- Page content -->
//   <div class="container mt--8 pb-5">
//     <!-- Table -->
//     <div class="row justify-content-center">
//       <div class="col-lg-6 col-md-8">
//         <div class="custom-width">
//           <div class="card bg-secondary shadow border-0 w-500">
//             <div class="card-body px-lg-5 py-lg-5 text-color">
//               <table id="pdfTable" style="text-align: center;" border="1">
//                 <thead>
//                   <tr>
//                     <th colspan="2" style="background-color: white; color: black;">Total Location: {{ totalLocations }}</th>
//                     <th>
//                       <table>
//                         <tr>
//                           <th colspan="2" style="background-color: rgb(221, 223, 65); color: black; width: 200px; height: 28px;"></th>
//                         </tr>
//                         <tr>
//                           <th colspan="2" style="background-color: white; color: black; width: 200px; height: 100%;">
//                             <input [(ngModel)]="Bhag" [style.width.%]="inputWidth" [style.height.%]="inputHeight" (focus)="onFocus()" (blur)="onBlur()" />
//                           </th>
//                         </tr>
//                         <tr>
//                           <th colspan="2" style="background-color:  rgb(221, 223, 65); color: black; width: 200px;">Date: </th>
//                         </tr>
//                         <tr>
//                           <th colspan="2" style="background-color: white; color: black; width: 200px; height: 100%;">
//                             <input [(ngModel)]="Shlok" [style.width.%]="inputWidth" [style.height.%]="inputHeight" (focus)="onFocus()" (blur)="onBlur()" />
//                           </th>
//                         </tr>
//                       </table>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th style="background-color: rgb(29, 25, 25); color: white;">Sr No</th>
//                     <th style="background-color: rgb(29, 25, 25); color: white;">Location Name</th>
//                     <th style="background-color: rgb(69, 69, 129);">Add1</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr *ngFor="let location of locations; let i = index">
//                     <td style="background-color: rgb(64, 105, 28);">{{ i + 1 }}</td>
//                     <td style="background-color: rgb(109, 108, 105);">{{ location.locationName }}</td>
//                     <td style="background-color: rgb(81, 102, 107);">{{ location.add1 }}</td>
//                   </tr>
//                 </tbody>
//               </table>
//               <button (click)="generatePDF()">Generate PDF</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// import { Component, OnInit } from '@angular/core';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { ScheduleDataService } from 'src/app/services/schedule-data.service';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html',
//   styleUrls: ['./report.component.css']
// })
// export class ReportComponent implements OnInit {
//   constructor(private scheduleDataService: ScheduleDataService) {}

//   totalSchedule: number = 0;
//   schedules: any[] = [];
//   currentDate: string = new Date().toLocaleDateString();
//   serialNumber: number = 1;

//   Bhag: string = ''; // Property to store user input
//   Shlok: string = '';
//   inputWidth: number = 100; // Initial width percentage
//   inputHeight: number = 100; // Initial height percentage

//     // Event handler for when the input is in focus
//   onFocus() {
//     this.inputWidth = 100; // You can adjust the width when in focus
//     this.inputHeight = 100; // You can adjust the height when in focus
//   }

//   // Event handler for when the input loses focus
//   onBlur() {
//     this.inputWidth = 100; // Reset to the original width when focus is lost
//     this.inputHeight = 100; // Reset to the original height when focus is lost
//   }

//   ngOnInit(){
//     this.getdata();
//   }

//   getdata(){
//     // Fetch data from your service
//     this.scheduleDataService.getAllData().subscribe((data: any[]) => {
//       this.schedules = data;
//       console.log(data);

//       //  Count the total number of locations
//       this.totalSchedule = data.length;
//       console.log(this.totalSchedule)
//       this.serialNumber = 1;
//   });
//   }

//   public convertToPDF() {

//     html2canvas(document.getElementById("contentToConvert")!).then(canvas =>{

//       const contentDataURL = canvas.toDataURL("image/png")
//       let pdf = new jsPDF('p' , 'mm' , 'a3');
//       var width = pdf.internal.pageSize.getWidth();
//       var height =canvas.height * width / canvas.width;
//       pdf.addImage(contentDataURL, 'PNG', 0, 0, width , height)
//       pdf.save('output.pdf');
//     });
// }
// }

// <!-- your-component.component.html -->
// <div class="container-fluid mt--7 pb-8 pt-5 pt-md-8">
//   <div class="py-7 py-lg-8"></div>
//   <!-- Page content -->
//   <!-- <div class="container mt--8 pb-5"> -->
//     <!-- Table -->
//     <!-- <div class="row justify-content-center">
//       <div class="col-lg-6 col-md-8">
//         <div class="custom-width">
//           <div class="shadow border-0 w-500">
//             <div class="card-body px-lg-5 py-lg-5 text-color">
//               <div class="container-a4">
//               <div class="content"> -->
//               <div id="contentToConvert">
//               <table id="pdfTable" style="text-align: center;" border="1">
//                 <thead>
//                   <tr>
//                     <th colspan="2" style="background-color: white; color: black;">Total Meeting: {{ totalSchedule }}</th>
//                     <th colspan="2">
//                       <table>
//                         <thead>
//                           <!-- <ng-container *ngFor="let schedule of schedules; let i = index"> -->
//                         <tr>
//                           <th style="background-color: white; color: black; width: 550px;  height: 28px;"></th>
//                         </tr>
//                         <tr>
//                           <th  style="background-color:  rgba(193, 166, 47, 0.638); color: black;">date</th>
//                         </tr>
//                         <tr>
//                             <th  style="background-color: white; color: black;  height: 100%;">
//                               <input [(ngModel)]="Bhag" [style.width.%]="inputWidth" placeholder="Enter here section" [style.height.%]="inputHeight" (focus)="onFocus()" (blur)="onBlur()" />
//                             </th>
//                           </tr>

//                         <tr>
//                           <th style=" color: black; height: 100%;">
//                             <input [(ngModel)]="Shlok" [style.width.%]="inputWidth" placeholder="Enter here shlok name" style="background-color: rgb(188, 246, 188);" [style.height.%]="inputHeight" (focus)="onFocus()" (blur)="onBlur()" />
//                           </th>
//                         </tr>
//                           <!-- </ng-container> -->
//                         </thead>
//                       </table>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th style="background-color: rgb(195, 164, 164); color: white;">Sr No</th>
//                     <th style="background-color: rgb(195, 164, 164); color: white;">Location Name</th>
//                     <th style="background-color: rgb(195, 164, 164);">Reading</th>
//                     <th style="background-color: rgb(195, 164, 164);">Attendence</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr *ngFor="let schedule of schedules ; let i = index ">

//                     <td style="background-color: rgb(192, 222, 167);">{{ i + 1 }}</td>
//                     <td style="background-color: rgb(192, 222, 167);">{{schedule.location.locationName}}</td>
//                     <td style="background-color: rgb(192, 222, 167);">{{ schedule.members[0].firstName }}</td>
//                     <td style="background-color: rgb(192, 222, 167);">{{ schedule.members[0].firstName }}</td>
//                   </tr>

//                 </tbody>

//               </table>
//             </div><br><br>
//             <div style="text-align: center;">
//               <input type="button"class="btn-primary" value="Generate Pdf" (click)="convertToPDF()" />
//             </div>
//               <!-- <button (click)="generatePDF()">Generate PDF</button> -->
//             </div>
//               <!-- </div> -->
//             <!-- </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div> -->


//main code
// import { Component, OnInit } from "@angular/core";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
// import { ScheduleDataService } from "src/app/services/schedule-data.service";
// import { ActivatedRoute } from "@angular/router";

// @Component({
//   selector: "app-report",
//   templateUrl: "./report.component.html",
//   styleUrls: ["./report.component.css"],
// })
// export class ReportComponent implements OnInit {
//   constructor(
//     private scheduleDataService: ScheduleDataService,
//     private route: ActivatedRoute
//   ) {}

//   totalSchedule: number = 0;
//   schedules: any[] = [];
//   groupedSchedules: any[] = [];
//   groupedSchedules1: any[] = [];
//   groupDate: any[] = [];
//   a: any[] = [];
//   b: any[] = [];

//   Bhag: string = "";
//   Shlok: string = "";
//   inputWidth: number = 100;
//   inputHeight: number = 100;
//   datelength: number;

//   ngOnInit() {
//     // this.getData();
//     this.route.queryParams.subscribe((params) => {
//       const schduleArray:string=params["schedules"];
    
//       this.schedules = JSON.parse(schduleArray);
//       this.totalSchedule = this.schedules.length;
//       this.groupSchedulesByDate();
//       this.groupSchedulesByLocation();
//       this.groupSchedulesByDate();
//       console.log(this.schedules);
//     });
//   }
//   // getData() {
//   //   // Fetch data from your service
//   //   this.scheduleDataService.getAllData().subscribe((data: any[]) => {
//   //     this.schedules = data;
//   //     this.totalSchedule = data.length;
//   //     // this.groupSchedulesByDate();
//   //     this.groupSchedulesByLocation();
//   //     this.groupSchedulesByDate();
//   //     console.log(data);

//   //   });
//   // }

//   groupSchedulesByLocation() {
//     const groupedSchedules = [];
//     this.schedules.forEach((schedule) => {
//       const existingGroup = groupedSchedules.find(
//         (group) => schedule.location.locationId === group.location?.locationId
//       );
//       if (existingGroup) {
//         existingGroup.schedules.push(schedule);
//         console.log(existingGroup.schedules);
//         // console.log(group)
//         console.log(groupedSchedules[0].date);
//         console.log("groupedSchedules", groupedSchedules);
//         console.log("schedule", schedule);

//         this.groupDate.push(groupedSchedules[0]);
//         console.log(this.groupDate);
//       } else {
//         groupedSchedules.push({
//           location: schedule.location,
//           date: schedule.date,
//           schedules: [schedule],
//         });
//       }
//     });
//     this.groupedSchedules = groupedSchedules;
//     console.log(this.groupedSchedules);
//   }

//   groupSchedulesByDate() {
//     const groupedSchedules1 = [];
//     this.schedules.forEach((schedule) => {
//       const existingGroup = groupedSchedules1.find(
//         (group) => group.date === schedule.date
//       );
//       if (existingGroup) {
//         existingGroup.schedules.push(schedule);
//         console.log(existingGroup.schedules);
//         // console.log(group)
//         console.log(groupedSchedules1[0].date);
//         console.log("groupedSchedules", groupedSchedules1);
//         console.log("schedule", schedule);
//         console.log("existingGroup", existingGroup);

//         this.groupDate.push(groupedSchedules1[0]);
//         console.log(this.groupDate);
//       } else {
//         groupedSchedules1.push({ date: schedule.date, schedules: [schedule] });
//       }
//     });
//     this.groupedSchedules1 = groupedSchedules1;
//     this.a = groupedSchedules1[0].schedules;
//     this.b = this.a[0].date;
//     console.log("a", this.a);
//     console.log("b", this.b);
//   }

//   onFocus() {
//     this.inputWidth = 100;
//     this.inputHeight = 100;
//   }

//   onBlur() {
//     this.inputWidth = 100;
//     this.inputHeight = 100;
//   }

//   convertToPDF() {
//     const pdf = new jsPDF("p", "mm", "a3");
//     html2canvas(document.getElementById("contentToConvert")).then((canvas) => {
//       const contentDataURL = canvas.toDataURL("image/png");
//       const width = pdf.internal.pageSize.getWidth();
//       const height = canvas.height * (width / canvas.width);
//       pdf.addImage(contentDataURL, "PNG", 0, 0, width, height);
//       pdf.save("output.pdf");
//     });
//   }

  
//   //For convert into excel
//   fileName = "ExcelSheet.xlsx";
//   exportexcel(): void {
//     /* Prepare data in the desired format */
//     const excelData = [];
//     let totalMeetings = 0;
    
//       totalMeetings = this.groupedSchedules.length;
    
//   //  // Blank Row
//   //  const blank =  [ ''];
//   //  for (const date of this.groupedSchedules1) {
//   //   blank.push('');
//   //   blank.push('');
//   //  }
//   //  excelData.push(blank);


//     // Create a row for "Total Meeting" and "Location Name" headers
//     const totalMeetingRow =  [ `Total Meeting: ${totalMeetings}`];
//     for (const date of this.groupedSchedules1) {
//       totalMeetingRow.push('');
//       totalMeetingRow.push('');
//     }
//     excelData.push(totalMeetingRow);
  
//     // Create rows for "Date" and "Location Name" headers
//   const dateRow = ['',''];
//   for (const date of this.groupedSchedules1) {
//     dateRow.push(date.date);
//     dateRow.push('');
//   }
//   excelData.push(dateRow);

//    // Create two empty rows with placeholders
//    const placeholderRow1 = ['', ''];
//    const placeholderRow2 = ['', ''];
//    const placeholderRow3 = [];
//    for (const date of this.groupedSchedules1) {
//      placeholderRow1.push('Enter here section number');
//      placeholderRow1.push('');
     
//      placeholderRow2.push('Enter here shlok name');
//      placeholderRow2.push('');

//      placeholderRow3.push('');
//      placeholderRow3.push('');
//    }
//    excelData.push(placeholderRow1);
//    excelData.push(placeholderRow2);
//    excelData.push(placeholderRow3);

//     // Create a row for 
//     const headerRow = ['Sr No', 'Location Name'];
//     for (const date of this.groupedSchedules1) {
//       headerRow.push('Reading');
//       headerRow.push('Attendance');
//     }
//     excelData.push(headerRow);
  
//     // Create rows for each location and its data
//     for (let ind = 0; ind < this.groupedSchedules.length; ind++) {
//       const locationRow = [ind + 1, this.groupedSchedules[ind].location.locationName];
//       for (const schedule of this.groupedSchedules[ind].schedules) {
//         locationRow.push(schedule.members[0]?.firstName + ' ' + schedule.members[0]?.lastName);
//         locationRow.push(schedule.members[1]?.firstName + ' ' + schedule.members[1]?.lastName);
//       }
//       excelData.push(locationRow);
//     }
  
//     /* Create a new workbook and add the worksheet */
//     const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);

//    // Merge only two columns by row wise
//   const numDates = this.groupedSchedules1.length;
//   for (let i = 0; i < numDates; i++) {
//     const startIndex = 2 + i * 2;
//     const endIndex = startIndex + 1;
//     const startCell = { r: 1, c: startIndex };
//     const endCell = { r: 1, c: endIndex };
//     ws['!merges'] = ws['!merges'] || [];
//     ws['!merges'].push({ s: startCell, e: endCell });
//   }
//    const numDates1 = this.groupedSchedules1.length;
//    for (let i = 0; i < numDates1; i++) {
//      const startIndex = 2 + i * 2;
//      const endIndex = startIndex + 1;
//      const startCell = { r: 2, c: startIndex };
//      const endCell = { r: 2, c: endIndex };
//      ws['!merges'] = ws['!merges'] || [];
//      ws['!merges'].push({ s: startCell, e: endCell });
//    }
//    const numDates2 = this.groupedSchedules1.length;
//    for (let i = 0; i < numDates2; i++) {
//      const startIndex = 2 + i * 2;
//      const endIndex = startIndex + 1;
//      const startCell = { r: 3, c: startIndex };
//      const endCell = { r: 3, c: endIndex };
//      ws['!merges'] = ws['!merges'] || [];
//      ws['!merges'].push({ s: startCell, e: endCell });
//    }
//   //  merge column
//      const startCell = { r: 0, c: 0};
//      const endCell = { r: 3, c: 1 };
//      ws['!merges'] = ws['!merges'] || [];
//      ws['!merges'].push({ s: startCell, e: endCell });
    
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
//     /* Save the Excel file */
//     XLSX.writeFile(wb, this.fileName);
//   }
// }  








import { Component, OnInit } from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { ScheduleDataService } from "src/app/services/schedule-data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  dateLength: any;
  Date1: any;
  constructor(
    private scheduleDataService: ScheduleDataService,
    private route: ActivatedRoute
  ) {}

  totalSchedule: number = 0;
  schedules: any[] = [];
  groupedSchedules: any[] = [];
  groupedSchedules1: any[] = [];
  groupDate: any[] = [];
  a: any[] = [];
  b: any[] = [];

  Bhag: string = "";
  Shlok: string = "";
  inputWidth: number = 100;
  inputHeight: number = 100;
  datelength: number;

  ngOnInit() {
    // this.getData();
    this.route.queryParams.subscribe((params) => {
      const schduleArray:string=params["schedules"];
    
      this.schedules = JSON.parse(schduleArray);
    
      this.groupSchedulesByDate();
      this.groupSchedulesByLocation();
      this.groupSchedulesByDate();
      this.totalSchedule = this.schedules.length;
      console.log(this.schedules);
    });
  }
  // getData() {
  //   // Fetch data from your service
  //   this.scheduleDataService.getAllData().subscribe((data: any[]) => {
  //     this.schedules = data;
  //     this.totalSchedule = data.length;
  //     // this.groupSchedulesByDate();
  //     this.groupSchedulesByLocation();
  //     this.groupSchedulesByDate();
  //     console.log(data);

  //   });
  // }

  groupSchedulesByLocation() {
    const groupedSchedules = [];
    this.schedules.forEach((schedule) => {
      const existingGroup = groupedSchedules.find(
        (group) => schedule.location.locationId === group.location?.locationId
      );
      if (existingGroup) {
        existingGroup.schedules.push(schedule);
        console.log(existingGroup.schedules);
        // console.log(group)
        console.log(groupedSchedules[0].date);
        console.log("groupedSchedules", groupedSchedules);
        console.log("schedule", schedule);

        this.groupDate.push(groupedSchedules[0]);
        console.log(this.groupDate);
      } else {
        groupedSchedules.push({
          location: schedule.location,
          date: schedule.date,
          schedules: [schedule],
        });
      }
    });
    this.groupedSchedules = groupedSchedules;
    console.log(this.groupedSchedules);
  }

  groupSchedulesByDate() {
    const groupedSchedules1 = [];
    this.schedules.forEach((schedule) => {
      const existingGroup = groupedSchedules1.find(
        (group) => group.date === schedule.date
      );
      if (existingGroup) {
        existingGroup.schedules.push(schedule);
        console.log(existingGroup.schedules);
        // console.log(group)
        console.log(groupedSchedules1[0].date);
        console.log("groupedSchedules", groupedSchedules1);
        console.log("schedule", schedule);
        console.log("existingGroup", existingGroup);

        this.groupDate.push(groupedSchedules1[0]);
        console.log(this.groupDate);
      } else {
        groupedSchedules1.push({ date: schedule.date, schedules: [schedule] });
      }
    });
    this.groupedSchedules1 = groupedSchedules1;
    this.a = groupedSchedules1[0].schedules;
    this.b = this.a[0].date;
    console.log("a", this.a);
    console.log("b", this.b);
  }

  onFocus() {
    this.inputWidth = 100;
    this.inputHeight = 100;
  }

  onBlur() {
    this.inputWidth = 100;
    this.inputHeight = 100;
  }

  convertToPDF() {
    const pdf = new jsPDF("p", "mm", "a4");
    html2canvas(document.getElementById("contentToConvert")).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      const width = pdf.internal.pageSize.getWidth();
      const height = canvas.height * (width / canvas.width);
      pdf.addImage(contentDataURL, "PNG", 0, 0, width, height);
      let a =this.b.length;
      console.log(a)
      let lname;
      for(let location of this.groupedSchedules){
        lname=location.location.locationName;
      }
      let year;
      year= this.b.slice(a-2,a)
      console.log(year);
      pdf.save(this.b.slice(0,3)+year+"_"+lname+".pdf");
      this.dateLength=this.b.slice(0, 3)
      console.log(this.b.slice(0, 3));

    });
  }

  
  //For convert into excel
  fileName = "ExcelSheet.xlsx";
  exportexcel(): void {
    /* Prepare data in the desired format */
    const excelData = [];
    let totalMeetings = 0;
    
      totalMeetings = this.groupedSchedules.length;
    
  //  // Blank Row
  //  const blank =  [ ''];
  //  for (const date of this.groupedSchedules1) {
  //   blank.push('');
  //   blank.push('');
  //  }
  //  excelData.push(blank);


    // Create a row for "Total Meeting" and "Location Name" headers
    const totalMeetingRow =  [ `Total Meeting: ${totalMeetings}`];
    for (const date of this.groupedSchedules1) {
      totalMeetingRow.push('');
      totalMeetingRow.push('');
    }
    excelData.push(totalMeetingRow);
  
    // Create rows for "Date" and "Location Name" headers
  const dateRow = ['',''];
  for (const date of this.groupedSchedules1) {
    dateRow.push(date.date);
    dateRow.push('');
  }
  excelData.push(dateRow);

   // Create two empty rows with placeholders
   const placeholderRow1 = ['', ''];
   const placeholderRow2 = ['', ''];
   const placeholderRow3 = [];
   for (const date of this.groupedSchedules1) {
     placeholderRow1.push('Enter section');
     placeholderRow1.push('');
     
     placeholderRow2.push('Enter shlok name');
     placeholderRow2.push('');

     placeholderRow3.push('');
     placeholderRow3.push('');
   }
   excelData.push(placeholderRow1);
   excelData.push(placeholderRow2);
   excelData.push(placeholderRow3);

    // Create a row for 
    const headerRow = ['Sr No', 'Location Name'];
    for (const date of this.groupedSchedules1) {
      headerRow.push('Reading');
      headerRow.push('Attendance');
    }
    excelData.push(headerRow);
  
    // Create rows for each location and its data
    for (let ind = 0; ind < this.groupedSchedules.length; ind++) {
      const locationRow = [ind + 1, this.groupedSchedules[ind].location.locationName];
      for (const schedule of this.groupedSchedules[ind].schedules) {
        locationRow.push(schedule.members[0]?.firstName + ' ' + schedule.members[0]?.lastName);
        locationRow.push(schedule.members[1]?.firstName + ' ' + schedule.members[1]?.lastName);
      }
      excelData.push(locationRow);
    }
  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
  // Create a new worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);

   // Merge only two columns by row wise
  const numDates = this.groupedSchedules1.length;
  for (let i = 0; i < numDates; i++) {
    const startIndex = 2 + i * 2;
    const endIndex = startIndex + 1;
    const startCell = { r: 1, c: startIndex };
    const endCell = { r: 1, c: endIndex };
    ws['!merges'] = ws['!merges'] || [];
    ws['!merges'].push({ s: startCell, e: endCell });
  }
   const numDates1 = this.groupedSchedules1.length;
   for (let i = 0; i < numDates1; i++) {
     const startIndex = 2 + i * 2;
     const endIndex = startIndex + 1;
     const startCell = { r: 2, c: startIndex };
     const endCell = { r: 2, c: endIndex };
     ws['!merges'] = ws['!merges'] || [];
     ws['!merges'].push({ s: startCell, e: endCell });
   }
   const numDates2 = this.groupedSchedules1.length;
   for (let i = 0; i < numDates2; i++) {
     const startIndex = 2 + i * 2;
     const endIndex = startIndex + 1;
     const startCell = { r: 3, c: startIndex };
     const endCell = { r: 3, c: endIndex };
     ws['!merges'] = ws['!merges'] || [];
     ws['!merges'].push({ s: startCell, e: endCell });
   }
  //  merge column
     const startCell = { r: 0, c: 0};
     const endCell = { r: 3, c: 1 };
     ws['!merges'] = ws['!merges'] || [];
     ws['!merges'].push({ s: startCell, e: endCell });

const cellStyle = {
  fill: { fgColor: { rgb: 'Yellow' } }, // Yellow 
};

// Loop through your data and apply the style to the 2nd and 3rd rows
for (let row = 0; row < excelData.length; row++) {
  if (row === 1 || row === 2) { // 2nd and 3rd rows
    for (let col = 0; col < excelData[row].length; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row + 1, c: col });
      if (ws[cellAddress]) {
        ws[cellAddress].s = cellStyle;
        console.log(ws[cellAddress].s)
      }
      console.log(cellAddress)
      console.log(row)
      console.log(col)
      console.log(excelData.length)
      console.log(cellStyle)
    }
  }
}

    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    /* Save the Excel file */
    XLSX.writeFile(wb, this.fileName);
  }
} 









// another structure
// import { Component, OnInit } from "@angular/core";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
// import { ScheduleDataService } from "src/app/services/schedule-data.service";
// import { group } from "console";
// import { NgFor } from "@angular/common";
// import { ActivatedRoute } from "@angular/router";
// import { Schedule } from "src/app/Classes/schedule";

// @Component({
//   selector: "app-report",
//   templateUrl: "./report.component.html",
//   styleUrls: ["./report.component.css"],
// })
// export class ReportComponent implements OnInit {
//   constructor(
//     private scheduleDataService: ScheduleDataService,
//     private route: ActivatedRoute
//   ) {}

//   totalSchedule: number = 0;
//   schedules: any[] = [];
//   groupedSchedules: any[] = [];
//   groupedSchedules1: any[] = [];
//   groupDate: any[] = [];
//   a: any[] = [];
//   b: any[] = [];

//   Bhag: string = "";
//   Shlok: string = "";
//   inputWidth: number = 100;
//   inputHeight: number = 100;
//   datelength: number;

//   ngOnInit() {
//     // this.getData();
//     this.route.queryParams.subscribe((params) => {
//       const schduleArray:string=params["schedules"];
    
//       this.schedules = JSON.parse(schduleArray);
//       this.totalSchedule = this.schedules.length;
//       this.groupSchedulesByDate();
//       this.groupSchedulesByLocation();
//       this.groupSchedulesByDate();
//       console.log(this.schedules);
//     });
//   }
//   // getData() {
//   //   // Fetch data from your service
//   //   this.scheduleDataService.getAllData().subscribe((data: any[]) => {
//   //     this.schedules = data;
//   //     this.totalSchedule = data.length;
//   //     // this.groupSchedulesByDate();
//   //     this.groupSchedulesByLocation();
//   //     this.groupSchedulesByDate();
//   //     console.log(data);

//   //   });
//   // }

//   groupSchedulesByLocation() {
//     const groupedSchedules = [];
//     this.schedules.forEach((schedule) => {
//       const existingGroup = groupedSchedules.find(
//         (group) => schedule.location.locationId === group.location?.locationId
//       );
//       if (existingGroup) {
//         existingGroup.schedules.push(schedule);
//         console.log(existingGroup.schedules);
//         // console.log(group)
//         console.log(groupedSchedules[0].date);
//         console.log("groupedSchedules", groupedSchedules);
//         console.log("schedule", schedule);

//         this.groupDate.push(groupedSchedules[0]);
//         console.log(this.groupDate);
//       } else {
//         groupedSchedules.push({
//           location: schedule.location,
//           date: schedule.date,
//           schedules: [schedule],
//         });
//       }
//     });
//     this.groupedSchedules = groupedSchedules;
//     console.log(this.groupedSchedules);
//   }

//   groupSchedulesByDate() {
//     const groupedSchedules1 = [];
//     this.schedules.forEach((schedule) => {
//       const existingGroup = groupedSchedules1.find(
//         (group) => group.date === schedule.date
//       );
//       if (existingGroup) {
//         existingGroup.schedules.push(schedule);
//         console.log(existingGroup.schedules);
//         // console.log(group)
//         console.log(groupedSchedules1[0].date);
//         console.log("groupedSchedules", groupedSchedules1);
//         console.log("schedule", schedule);
//         console.log("existingGroup", existingGroup);

//         this.groupDate.push(groupedSchedules1[0]);
//         console.log(this.groupDate);
//       } else {
//         groupedSchedules1.push({ date: schedule.date, schedules: [schedule] });
//       }
//     });
//     this.groupedSchedules1 = groupedSchedules1;
//     this.a = groupedSchedules1[0].schedules;
//     this.b = this.a[0].date;
//     console.log("a", this.a);
//     console.log("b", this.b);
//   }

//   onFocus() {
//     this.inputWidth = 100;
//     this.inputHeight = 100;
//   }

//   onBlur() {
//     this.inputWidth = 100;
//     this.inputHeight = 100;
//   }

//   convertToPDF() {
//     const pdf = new jsPDF("landscape", "mm", "a3");
//     html2canvas(document.getElementById("contentToConvert")).then((canvas) => {
//       const contentDataURL = canvas.toDataURL("image/png");
//       const width = pdf.internal.pageSize.getWidth();
//       const height = canvas.height * (width / canvas.width);
//       pdf.addImage(contentDataURL, "PNG", 0, 0, width, height);
//       pdf.save("output.pdf");
//     });
//   }

//   //For convert into excel
//   fileName = "ExcelSheet.xlsx";
//   exportexcel(): void {
//     /* pass here the table id */
//     let element = document.getElementById("pdfTable");
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

//     const rowHeight = 100;

//     ws["!rows"] = ws["!rows"] || [];
//     ws["!rows"][0] = { hpt: rowHeight, hpx: rowHeight * 0.75 }; 

//      // Set background color for the 1st row
//      ws["A1"].s = { patternType: 'solid', fgColor: { rgb: 'Red' } }; // Yellow background

//      // Set background color for the 4th row
//      ws["A4"].s = { patternType: 'solid', fgColor: { rgb: 'FF0000' } }; // Red background

//     /* generate workbook and add the worksheet */
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//     /* save to file */
//     XLSX.writeFile(wb, this.fileName);
//   }
// }

// <div class="container-fluid mt--7 pb-8 pt-5 pt-md-8">
//   <div class="py-7 py-lg-8"></div>
//   <div id="contentToConvert">
//     <div class="d-flex">
//       <div *ngFor="let group of groupedSchedules" class="mx-2">
//         <table style="text-align: center;" border="1">
//           <thead>
//             <tr>
//               <th colspan="2" style="background-color: white; color: black;">Total Meeting: {{ totalSchedule }}</th>
//             </tr>
//             <tr>
//               <th colspan="2" style="background-color: rgba(193, 166, 47, 0.638); color: black;">{{ group.date }}</th>
//             </tr>
//             <tr>
//               <th style="background-color: white; color: black; width: 550px; height: 28px;"></th>
//             </tr>
//             <tr>
//               <th style="background-color: white; color: black; height: 100%;">
//                 <input [(ngModel)]="Bhag" [style.width.%]="inputWidth" placeholder="Enter here section" [style.height.%]="inputHeight" (focus)="onFocus()" (blur)="onBlur()" />
//               </th>
//             </tr>
//             <tr>
//               <th style="color: black; height: 100%;">
//                 <input [(ngModel)]="Shlok" [style.width.%]="inputWidth" placeholder="Enter here shlok name" style="background-color: rgb(188, 246, 188);" [style.height.%]="inputHeight" (focus)="onFocus()" (blur)="onBlur()" />
//               </th>
//             </tr>
//             <tr>
//               <th style="background-color: rgb(195, 164, 164); color: white;">Sr No</th>
//               <th style="background-color: rgb(195, 164, 164); color: white;">Location Name</th>
//               <th style="background-color: rgb(195, 164, 164);">Reading</th>
//               <th style="background-color: rgb(195, 164, 164);">Attendance</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr *ngFor="let schedule of group.schedules; let i = index">
//               <td style="background-color: rgb(192, 222, 167);">{{ i + 1 }}</td>
//               <td style="background-color: rgb(192, 222, 167);">{{ schedule.location.locationName }}</td>
//               <td style="background-color: rgb(192, 222, 167);">{{ schedule.members[0]?.firstName }}</td>
//               <td style="background-color: rgb(192, 222, 167);">{{ schedule.members[1]?.firstName }}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div><br><br>
//   <div style="text-align: center;">
//     <input type="button" class="btn-primary" value="Generate Pdf" (click)="convertToPDF()" />
//   </div>
// </div>
