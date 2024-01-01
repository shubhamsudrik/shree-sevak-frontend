import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { error } from "console";
import { ToastrService } from "ngx-toastr";
import { Baithak } from "src/app/Classes/baithak";
import { BaithakDataService } from "src/app/services/baithak-data.service";
@Component({
  selector: "app-update-baithak",
  templateUrl: "./update-baithak.component.html",
  styleUrls: ["./update-baithak.component.css"],
})
export class UpdateBaithakComponent implements OnInit {
  baithak: Baithak = new Baithak();
  id: number;
  baithakForm: any;
  

  constructor(
    private baithakService: BaithakDataService,
    private router: Router,
    private route: ActivatedRoute, 
    private formBuilder :FormBuilder,
    private toast : ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.baithakService.getBaithakById(this.id).subscribe({
      next: (data) => {
        this.baithak = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

     // FormValidation
     this.baithakForm = this.formBuilder.group({
      baithakType: ['',Validators.required ],
      dayOfWeek: ['',Validators.required],
      // date: ['',Validators.required],
      fromTime: ['',Validators.required],
      status: ['',Validators.required],
      toTime: ['',Validators.required]
  
    })
  }
  onSubmit() {
    if(this.baithakForm.valid){
    console.log(this.baithak);
    this.saveBaithak();
    this.toast.success("Baithak update successfully");
    }else{
      this.toast.warning("All field is mandatory.");
    }
  }
  saveBaithak() {
    this.baithakService.createBaithak(this.baithak).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/baithak-list"]);
    }),
      (error) => console.log(error);
  }

  CancelChanges() {
    this.router.navigate(["/baithak-list"]);
  }

  Clear(){
    this.baithakForm.reset();
    }
}
