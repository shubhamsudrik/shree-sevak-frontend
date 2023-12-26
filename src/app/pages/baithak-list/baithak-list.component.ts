import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Baithak } from "src/app/Classes/baithak";
import { BaithakDataService } from "src/app/services/baithak-data.service";

@Component({
  selector: "app-baithak-list",
  templateUrl: "./baithak-list.component.html",
  styleUrls: ["./baithak-list.component.css"],
})
export class BaithakListComponent implements OnInit {
  baithak: Baithak = new Baithak();

  baithakList: any[] = [];
  status: string;
  public focus;
  searchText: any;
  searchText1: any;
  searchText2: any;


  // Pagination
  currentPage: number = 0;
  itemsPerPage: number = 10;

  get pagedBaithaks(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.baithakList.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex ;
}

  ngOnInit(): void {
    this.statusBaithak("1");
    // this.getBaithakList();
  }

  constructor(
    private baithakService: BaithakDataService,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    translate.addLangs(["English"]);
    translate.setDefaultLang("English");
  }

  // record count
  get pagedLocations(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.baithakList.slice(startIndex, endIndex);
  }

  //get baithak data
  getBaithakList() {
    this.baithakService.getBaithakList().subscribe(
      (data: Baithak[]) => {
        this.baithakList = data;
        console.log(data);
      },
      (error) => {
        console.error("fetching baithak detail:", error);
      }
    );
  }

  //method calling base on baithak status
  statusBaithak(status: string) {
    if (status === "all") {
      this.getBaithakList();
    }
    this.baithakService.getBaithakByStatus(status).subscribe(
      (data: Baithak[]) => {
        this.baithakList = data;
        console.log(data);
      },
      (error) => {
        console.error("fetching baithak detail:", error);
      }
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  onOpen() {
    console.log(this.baithak);
    this.router.navigate(["/create-baithak"]);
  }
  toggleButtons(operation: string, baithaData: any) {
    if (operation === "edit") {
      baithaData.isEditing = true;
      // baithaData.isDeleting = true;
    }
  }
  updateBaithak(baithakId: number) {
    this.router.navigate(["/update-baithak", baithakId]);
  }
}
