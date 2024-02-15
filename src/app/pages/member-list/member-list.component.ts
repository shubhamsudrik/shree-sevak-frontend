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
  member: Member = new Member();
  defaultMembers: Member[] = [];
  public focus;
  searchText: any;
  searchText1: any;
  searchText2: any;

  currentPage: number = 0;
  itemsPerPage: number = 10;

  get pagedMembers(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultMembers.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
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
    public translate: TranslateService,
    private userDataService: UserDataService,
    private toast: ToastrService
  ) {
    translate.addLangs(["English"]);
    translate.setDefaultLang("English");
  }

  private getMemberList() {
    this.memberListService.getMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers = data;
        console.log(this.defaultMembers);
      },
      (error) => {
        console.error("Error fetching locations:", error);
      }
    );
  }

  //get all member data
  private getAllMemberList() {
    this.memberListService.getAllMemberList().subscribe((data: Member[]) => {
      this.defaultMembers = data;
      console.log(this.defaultMembers);
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.getMemberList();
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
  statusLocation(status: string) {
    if (status === "all") {
      this.getAllMemberList();
    } else {
      this.memberListService.getMemberByStatus(status).subscribe(
        (data: Member[]) => {
          this.defaultMembers = data;
          console.log(data);
        },
        (error) => {
          console.error("fetching baithak detail:", error);
        }
      );
    }
  }
}
