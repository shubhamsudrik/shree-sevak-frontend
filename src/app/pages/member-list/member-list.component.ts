import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Member } from "src/app/Classes/member";
import { MemberListService } from "src/app/services/member-list.service";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {

    member: Member = new Member;
    defaultMembers: Member[] = [];
    public focus;
    searchText: any;
    searchText1: any;
    searchText2: any;    
    currentPage: number = 0;
    itemsPerPage: number = 10;
    totalElements: any;
    totalPages: any;
  status: any;
  hasNextPage: any;
  pageSize: any;
  query: any;


    get pagedMembers(): any[] {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.defaultMembers;
    }

    onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex ;
    console.log("this.currentPage",this.currentPage);
    console.log("event.pageIndex",event.pageIndex);
    this.getAllMemberList();
    }

    // record count
  get pagedLocations(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultMembers.slice(startIndex, endIndex);
  }

    constructor(
      private memberListService: MemberListService,
      private router: Router,
      public translate: TranslateService
    ) {
      translate.addLangs(['English']);
      translate.setDefaultLang('English');

      console.log("this.defaultMembers.length",this.defaultMembers.length);
      console.log("currentPage",this.currentPage);
      // console.log("itemsPerPage",this.itemsPerPage);
    }
  

  // private getMemberList() {
  //   this.memberListService.getMemberList().subscribe(
  //     (data: Member[]) => {
  //       this.defaultMembers = data;
  //       console.log(this.defaultMembers);
  //     },
  //     (error) => {
  //       console.error("Error fetching member:", error);
  //     }
  //   );
  // }

  // //get all member data
  // private getAllMemberList() {
  //   this.memberListService.getAllMemberList().subscribe((data: Member[]) => {
  //     this.defaultMembers = data;
  //     console.log(this.defaultMembers);
  //   });
  // }
  
      //get all member data
  private getAllMemberList(){
    this.memberListService.getAllMemberListByPagination(this.currentPage, this.itemsPerPage).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.content);
        this.defaultMembers =data.content;
        this.totalElements = data.totoalElement;
        console.log(this.defaultMembers)
        console.log("currentPage",this.currentPage);
        console.log("data.totalElements", this.totalElements)
      },)
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    // this.getAllMemberList();
    this.getPaginateMemberListBaseOnSearch()
  }

  onOpen() {
    console.log(this.member);
    this.router.navigate(["/add-new-member"]);
  }

  toggleButtons(operation: string, member: any) {
    if (operation === "edit") {
      member.isEditing = true;
    }
  }

  updateMember(memberId: number) {

    this.router.navigate(["/add-new-member", memberId]);
    // this.memberListService.getMemberById(memberId).subscribe((member) => {
    //   this.member = member;
    //   console.log(this.member);
    //   const loginUserAreas =
    //     this.userDataService.getUserDetails().selectedAreas;
    //   const isTrue = loginUserAreas.some(
    //     (area) => area.id === this.member.area.areaId
    //   );
    //   if (isTrue) {
    //     this.router.navigate(["/add-new-member", memberId]);
    //   } else {
    //     this.toast.error(
    //       "You can update this member,It not belonging to your area"
    //     );
    //   }
    // });
  }

  // show all data and handl using active in active button
//   statusLocation(status: string) {
//     if (status === "all") {
//       this.getAllMemberList();
//     } else {
//       this.memberListService.getMemberByStatus(status).subscribe(
//         (data: Member[]) => {
//           this.defaultMembers = data;
//           console.log(data);
//         },
//         (error) => {
//           console.error("fetching baithak detail:", error);
//         }
//       );
//     }
// }
//  // show all data and handl using active in active button
//  statusLocation(status: string) {
//   if (status === "all") {
//     this.getAllMemberList();
//   } else {
//     this.memberListService.getPaginateMemberListBaseOnStatus(this.currentPage, this.itemsPerPage,status ).subscribe(
//       (data: Member[]) => {
//         console.log(data);
//         console.log(data.content);
//         this.defaultMembers = data;
//         console.log(data);
//       },
//       (error) => {
//         console.error("fetching baithak detail:", error);
//       }
//     );
//   }
// }
search(): void {
  // const statusParam = this.status ? this.status : null;
  this.currentPage=0
  this.getPaginateMemberListBaseOnSearch();
}

getPaginateMemberListBaseOnSearch(){
  this.currentPage=0
  this.memberListService.getPaginateMemberListBaseOnSearch(this.query,this.status,this.currentPage,this.itemsPerPage).subscribe((pagination:any) => {
    // Handle response data
    this.hasNextPage = pagination.lastPage;
    this.defaultMembers = pagination.content;
    this.totalElements = pagination.totoalElement;
    this.pageSize = pagination.pageSize;
    console.log(pagination);
  },(error) => {
    console.error("error while fetching record base on search", error);
  });

}
statusLocation(status: string) {
  this.currentPage = 0;
  if (status === "all") {
    this.status=null
    this.query=null
    // this.getAllLocationList();
    this.getAllMemberList();
  } else {
    this.status=status
    this.query=null
    this.currentPage=0,
    this.memberListService
      .getPaginateMemberListBaseOnSearch(
        this.query,
          this.status,
          this.currentPage,
          this.itemsPerPage,
      )
      .subscribe(
        (pagination: any) => {
          console.log(pagination);
          this.hasNextPage = pagination.lastPage;
          this.defaultMembers = pagination.content;
          this.totalElements = pagination.totoalElement;
          this.pageSize = pagination.pageSize;
        },
        (error) => {
          console.error("fetching member detail:", error);
        }
      );
  }
}
}
