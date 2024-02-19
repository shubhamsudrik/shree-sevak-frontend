import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
 
import { Router } from "@angular/router";
import { User } from "src/app/Classes/user";
import { UserDataService } from "src/app/services/user-data.service";
  
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  user = new User();
  defaultUsers: User[]= [];
 
  public focus;
  searchText ='';
  searchText1 ='';
  searchText2 ='';
  currentPage: number = 0;
  itemsPerPage: number = 10;
 
  get pagedUser(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultUsers.slice(startIndex, endIndex);
  }
 
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }
 
  // record count
  get pagedUsers(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultUsers.slice(startIndex, endIndex);
  }
  constructor(private router: Router, private userService: UserDataService) {}
 
  ngOnInit(): void {
    this.getActiveUserList()  ;
  }
  statusUsers(status: any) {
 
    if(status==="all"){
      this.getAllUserList();
    }else{
      this.userService.getUserListByStatus(status).subscribe((user) => {
        this.defaultUsers = user;
        console.log("status", this.defaultUsers);
      });
    }
   
  }
 
  onOpen() {
    console.log(this.user);
    this.router.navigate(["/register"]);
  }
 
  getAllUserList() {
    this.userService.getAllUserList().subscribe((users: User[]) => {
      this.defaultUsers = users;
      console.log(this.defaultUsers);
    });
  }
  getActiveUserList() {
    this.userService.getUserListByStatus('1').subscribe((users: User[]) => {
      this.defaultUsers = users;
      console.log(this.defaultUsers);
    },
    (error) => {
      console.error('Error fetching users:', error);
    }
    );
  }
  toggleButtons(operation: string, user: any) {
    if (operation === "edit") {
      user.isEditing = true;
    }
  }
  updateUser(userId: any) {
    this.router.navigate(["/register", userId]);
  }
}