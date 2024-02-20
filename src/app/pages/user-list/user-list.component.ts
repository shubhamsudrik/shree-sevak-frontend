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
  status: string;

  keyword: String;
  totalElement: any;
  query: any;
  
 
  get pagedUser(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultUsers.slice(startIndex, endIndex);
  }
 
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.getAllUserList();
    console.log(this.status)
  }
 
  // record count
  get pagedUsers(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultUsers.slice(startIndex, endIndex);
  }
  constructor(private router: Router, private userService: UserDataService) {
    console.log("totalElement: ",this.totalElement)
  }
 
  ngOnInit(): void {
    // this.getActiveUserList()  ;
    this.getAllUserList();
  }

  statusUsers(status: any) {
    this.currentPage =0;
    if(status==="all"){
      this.status=null;
      this.getAllUserList();
    }else{
      this.status=status;
      this.userService.getAllUserByPaginatiom(status, this.keyword, this.currentPage, this.itemsPerPage).subscribe((user:any) => {
        this.defaultUsers = user.content;
        this.totalElement=user.totoalElement;
        this.currentPage=user.pageNumber;
        this.itemsPerPage = user.pageSize;
        console.log("status", this.defaultUsers);
      });
    }
   
  }
 
  onOpen() {
    console.log(this.user);
    this.router.navigate(["/register"]);
  }
  search(): void {
    console.log("searched word",this.query)
    const statusParam = this.status ? this.status : null;
    this.userService.getAllUserByPaginatiom(this.status, this.query, this.currentPage, this.itemsPerPage).subscribe((pagination:any) => {
      // Handle response data
      this.defaultUsers = pagination.content;
      this.totalElement = pagination.totoalElement;
      this.currentPage=pagination.pageNumber;
      this.itemsPerPage = pagination.pageSize;
      console.log(pagination);
    },(error) => {
      console.error("error while fetching record base on search", error);
    });
  }
  getAllUserList() {
    this.userService.getAllUserByPaginatiom(this.status, this.keyword, this.currentPage, this.itemsPerPage).subscribe((users: any) => {
      this.defaultUsers = users.content;
      this.totalElement=users.totoalElement;
      this.currentPage=users.pageNumber;
      this.itemsPerPage = users.pageSize;
      console.log(users)
      console.log(this.defaultUsers);
    });
  }
  
  // getActiveUserList() {
  //   this.userService.getUserListByStatus('1').subscribe((users: User[]) => {
  //     this.defaultUsers = users;
  //     console.log(this.defaultUsers);
  //   },
  //   (error) => {
  //     console.error('Error fetching users:', error);
  //   }
  //   );
  // }

  toggleButtons(operation: string, user: any) {
    if (operation === "edit") {
      user.isEditing = true;
    }
  }
  updateUser(userId: any) {
    this.router.navigate(["/register", userId]);
  }
}