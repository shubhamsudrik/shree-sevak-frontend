import { Component, OnInit } from "@angular/core";
import { LocationDataService } from "src/app/services/location-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { Baithak } from "src/app/Classes/baithak";
import { HttpClient } from "@angular/common/http";
import { BaithakDataService } from "src/app/services/baithak-data.service";

@Component({
  selector: "app-baithak-list",
  templateUrl: "./baithak-list.component.html",
  styleUrls: ["./baithak-list.component.css"],
})
export class BaithakListComponent implements OnInit {
  baithak: Baithak = new Baithak();

  baithakList: Baithak[] = [];
  status: string;
  public focus;
  searchText: any;

  ngOnInit(): void {
    this.getAllBaithakList();
  }

  constructor(
    private baithakService: BaithakDataService,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    translate.addLangs(["English", "Marathi"]);
    translate.setDefaultLang("English");
  }

  getAllBaithakList() {
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
      this.getAllBaithakList();
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
