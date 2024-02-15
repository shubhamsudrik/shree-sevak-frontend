import { Component, OnInit } from "@angular/core";

import { Location } from "src/app/Classes/location";
import { TranslateService } from "@ngx-translate/core";
import { LocService } from "src/app/services/loc.service";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";

@Component({
  selector: "app-location-list",
  templateUrl: "./location-list.component.html",
  styleUrls: ["./location-list.component.css"],
})
export class LocationListComponent implements OnInit {

  location: Location = new Location();
  defaultLocations: any[] = [];
  // sortedDefaultLocations: any[] = [];
  public focus;
  searchText = "";
  searchText1 = "";
  searchText2 = "";

  // Pagination
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalRecords: any;
  hasNextPage: any;
  pageSize: any;
searchTextall: any;
query: any;
  status: string;

  //record count
  get pagedLocations(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.defaultLocations;
  }

  getPaginatedLocationsList(currentPage: number, itemsPerPage: number) {
    this.locationDataService
      .getPaginateLocationList(currentPage, itemsPerPage)
      .subscribe(
        (pagination: any) => {
          console.log(pagination);
          this.hasNextPage = pagination.lastPage;
          this.totalRecords = pagination.totoalElement;
          this.defaultLocations = pagination.content;
          this.pageSize = pagination.pageSize;
          console.log(this.defaultLocations);
        },
        (err) => console.log(err)
      );
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    console.log(this.defaultLocations);
    this.locationDataService
      .getPaginateLocationList(this.currentPage, this.itemsPerPage)
      .subscribe(
        (pagination: any) => {
          console.log("current page", this.currentPage);
          this.totalRecords = pagination.totoalElement;
          this.defaultLocations = pagination.content;
          this.hasNextPage = pagination.lastPage;
          this.pageSize = pagination.pageSize;
          console.log(this.defaultLocations);
        },
        (err) => console.log(err)
      );
  }

  constructor(
    private locationDataService: LocService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(["English"]);
    translate.setDefaultLang("English");
  }

  //for location convert to descending order
  // sortDefaultLocationsDescending() {
  //   this.sortedDefaultLocations = this.defaultLocations.slice().sort((a, b) => b.locationId - a.locationId);
  // }

  //get active data
  private getLocationList() {
    this.locationDataService.getLocationList().subscribe(
      (data: any[]) => {
        this.defaultLocations = data;
        console.log(this.defaultLocations);
      },
      (error) => {
        console.error("Error fetching locations:", error);
      }
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    // this.getLocationList();
    this.getPaginatedLocationsList(this.currentPage, this.itemsPerPage);
  }

  onOpen() {
    console.log(this.location);
    this.router.navigate(["/edit-location"]);
  }

  toggleButtons(operation: string, location: any) {
    if (operation === "edit") {
      location.isEditing = true;
      location.isDeleting = true;
    }
  }

  deleteLocation(id: number) {
    const confirmation = confirm("Do you want to delete this location?");
    if (confirmation) {
      this.locationDataService.deleteLocation(id).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/location-list"]);
        },
        (error) => {
          console.error("Error deleting location:", error);
        }
      );
    }
  }

  updateLocation(locationId: number) {
    this.router.navigate(["/edit-location", locationId]);
  }

  //get all location data

  private getAllLocationList() {
    this.locationDataService.getAllLocationList().subscribe((data: any[]) => {
      this.defaultLocations = data;
      console.log(this.defaultLocations);
    });
  }

  // show all data and handl using active inactive through button
  // statusLocation(status: string){
  //   if (status === "all") {
  //     this.getAllLocationList();
  //   }else{

  //   this.locationDataService.getLocationByStatus(status).subscribe(
  //     (data: any[]) => {
  //       this.defaultLocations = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error("fetching baithak detail:", error);
  //     }
  //   );
  //   }
  // }
  search(): void {
    const statusParam = this.status ? this.status : null;
    this.locationDataService.getPaginateLocationListBaseOnSearch(this.query,this.status,this.currentPage,this.pageSize).subscribe((pagination:any) => {
      // Handle response data
      this.hasNextPage = pagination.lastPage;
      this.defaultLocations = pagination.content;
      this.totalRecords = pagination.totoalElement;
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
      // this.getAllLocationList();
      this.getPaginatedLocationsList(this.currentPage, this.itemsPerPage);
    } else {
      this.status=status
      this.locationDataService
        .getPaginateLocationListBaseOnStatus(
          this.currentPage,
          this.itemsPerPage,
          status
        )
        .subscribe(
          (pagination: any) => {
            this.hasNextPage = pagination.lastPage;
            this.defaultLocations = pagination.content;
            this.totalRecords = pagination.totoalElement;
            this.pageSize = pagination.pageSize;
            console.log(pagination);
          },
          (error) => {
            console.error("fetching location detail:", error);
          }
        );
    }
  }
}
