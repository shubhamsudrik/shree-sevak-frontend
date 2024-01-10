export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface Area1 {
  id: number;
  value: string;
  country?: string;
  state?: string;
  city?: string;
  division?: string;
}

import { Component, OnInit, SimpleChanges } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Area } from "src/app/Classes/Area";
import { User } from "src/app/Classes/User";

import { AreaDataService } from "src/app/services/area-data.service";
import { LocationDataService } from "src/app/services/location-data.service";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  selectedArea!: any[];

  user: User = new User();
  registerform: FormGroup;
  submitted = false;
  id: number;
  defaultAreas: {
    id: number;
    value: string;
  }[];
  userId: number;
  filteredAreas: { id: number; value: string; city?: String; country?: string; division?: string; state?: string; }[];
  filterAreaslist: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private locationDataService: LocationDataService,
    private userdataService: UserDataService,
    private areaDataService: AreaDataService
  ) {
    console.log(this.defaultAreas);
  }

  ngOnInit() {
    // this.getAreaByStatus("1");
    this.route.params.subscribe((params) => {
      this.userId = +params["id"]; // the '+' sign is used to convert the parameter to a number
      console.log(this.userId); // This will log the value "1" from your example URL
    });

    if (!this.userId) {
      this.getAllUnselectedAres();
    } else {
      this.getAllUnselectedAresExceptCurrentUserAreas(this.userId);
    }
    this.registerform = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]],
      photoUrl: [""],
      emailId: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
        ],
      ],
      role: ["", Validators.required],
      selectedAreas: [null],
      confirmPassword: ["", Validators.required],
      status: [""],
    });

    if (this.userId) {
      this.selectedArea = [];
      this.populateForm();
    }
  }
  getAllUnselectedAresExceptCurrentUserAreas(id: number) {
    this.areaDataService
      .getAllUnselectedAreasExceptSingleUser(id)
      .subscribe((data) => {
        const modifydefaultAreas: Area1[] = [];
        data.map((area: Area) => {
          const modifiedValue=`${area.areaName},${area.country},${area.state},${area.city},${area.division},`
          modifydefaultAreas.push({
            id: area.areaId,
            value:modifiedValue
          });
        });
        console.log(data);
        this.defaultAreas = modifydefaultAreas;
        this.filterAreaslist=this.defaultAreas
      });
  }
  getAllUnselectedAres() {
    this.areaDataService.getAllUnselectedAreas().subscribe((data) => {
      const modifydefaultAreas: Area1[] = [];
      data.map((area: Area) => {
        const modifiedValue=`${area.areaName},${area.country},${area.state},${area.city},${area.division},`
        modifydefaultAreas.push({
          id: area.areaId,
          value: modifiedValue,
         
        });
      });
      console.log(data);
      this.defaultAreas = modifydefaultAreas;
      this.filterAreaslist=this.defaultAreas
    });
  }
  customOptionLabel(option: { id: number; value: string; city?: String; country?: string; division?: string; state?: string; }): string {
    return `${option.value},${option.country},${option.state},${option.city},${option.division}`;
  }
  // filterAreas(event: any) {
  //   console.log(event);
  //   const query = event.areaName;
  //   this.filterAreaslist = this.defaultAreas.filter(
  //     (area) => this.customOptionLabel(area).includes(query)
  //   ).slice();
  // }

  // Success msg with info
  showToastr() {
    const message = `      
      Your username: <strong>${this.registerform.value.emailId}</strong> <br>
      Your password: <strong>${this.registerform.value.confirmPassword}<strong>
    `;
    this.toast.success(message, "Register Successfully", {
      enableHtml: true,
      timeOut: 200000,
      progressBar: true,
      closeButton: true,
    });
  }

  get registerFormControl() {
    return this.registerform.controls;
  }
  proceedregistration() {
    this.submitted = true;
    if (!this.userId) {
      if (this.registerform.valid) {
        if (
          this.registerform.get("password").value !==
          this.registerform.get("confirmPassword").value
        ) {
          this.registerform
            .get("confirmPassword")
            .setErrors({ passwordsDoNotMatch: true });
          this.toast.error("Passwords do not match");
          console.log("password not match");
        } else {
          this.locationDataService.signUP(this.registerform.value).subscribe(
            (res: ApiResponse) => {
              if (res.success === false) {
                this.toast.warning(
                  "User Is Already Exit With Same Email,Mobile"
                );
                console.log(this.registerform.value);
                console.log(this.registerform.value.confirmPassword);

                console.log("Response:", res);
              } else {
                // this.toast.success('Register Successfully');
                this.showToastr();
                console.log("Response:", res);
                this.router.navigate(["/login"]);
              }
            },
            (error) => {
              console.error("Error:", error);
              this.toast.error("Error occurred while registering");
            }
          );
        }
      } else {
        this.toast.warning("Fill all mandatory field.");
      }
    } else {
      if (this.registerform.valid) {
        console.log(this.registerform.value);
        this.userdataService
          .updateUserById(this.registerform.value, this.userId)
          .subscribe(
            (data) => {
              console.log("updated user data", data);

              this.router.navigate(["/user-list"]);
            },
            (error) => {
              console.log("Error:", error);
              if (error.status === 409) {
                this.toast.error("Area all ready selected choose another");
              }
            }
          );
      } else {
        this.toast.warning("Fill all mandatory field.");
      }
    }
  }

  validatePhoneNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
  }
  populateForm() {
    this.userdataService.getUserById(this.userId).subscribe((data: any) => {
      // const temp=data
      // const role=temp.roles[0].roleName
      this.user = data;
      // console.log(data)
      const modifiedData: number[] = [];
      this.selectedArea = this.user?.selectedAreas || [];
      this.selectedArea.map((selected) => {
       modifiedData.push(selected.areaId)
      });
      console.log(modifiedData);
      this.registerform.patchValue({
        // selectedAreas: new FormControl<any[]>(modifiedData),
        selectedAreas:modifiedData,
        userId: this.user?.userId,
        name: this.user?.name,
        emailId: this.user?.emailId,
        phoneNumber: this.user?.phoneNumber,
        role: data.roles[0]?.roleName,
        status: this.user?.status,
      });
      // this.getAreaByStatus("1");
    });
  }
  goBack() {
    this.router.navigate(["user-list"]);
  }

  getAreaByStatus(status: string) {
    this.areaDataService.getAreaByStatus(status).subscribe(
      (areaList: Area[]) => {
        const modifydefaultAreas: Area1[] = [];
        areaList.map((area: Area) => {
          modifydefaultAreas.push({
            id: area.areaId,
            value: area.areaName
          });
        });
        console.log(areaList);
        this.defaultAreas = modifydefaultAreas;
        console.log(this.defaultAreas);
      },
      (error) => {
        console.error("fetching area details ", error);
      }
    );
  }
  onMultiSelectChange(event: any) {
    // 'event' parameter contains the selected values
    console.log(event.value.id);
    this.selectedArea = event.value;
    console.log("Selected Cities:", this.selectedArea);
  }
}
