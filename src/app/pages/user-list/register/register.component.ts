export interface ApiResponse {
  success: boolean;
  message: string;
}





import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
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


  user: User = new User();
  registerform: FormGroup;
  submitted = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private locationDataService: LocationDataService,
    private userdataService:UserDataService,
    private areaDataService: AreaDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"]; // the '+' sign is used to convert the parameter to a number
      console.log(this.id); // This will log the value "1" from your example URL
    });
    this.registerform = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]],
      photoUrl: [""],
      emailId: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
        ],
      ],
      role: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      status: ["",],
    });

    if(this.id){
      this.populateForm()
    }
  
  }

 

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
   if(!this.id){
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
              this.toast.warning("User Is Already Exit With Same Email,Mobile");
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

   }else{
    if (this.registerform.valid) {
      this.userdataService.updateUserById(this.registerform.value,this.id).subscribe((data)=>{
        console.log("updated user data",data);

        this.router.navigate(['/user-list']);
      })

    }else{
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
    this.userdataService.getUserById(this.id).subscribe((data:any) => {
      // const temp=data
      // const role=temp.roles[0].roleName
      this.user=data;
     
      this.registerform.patchValue({
        userId: this.user?.userId,
        name: this.user.name,
        emailId: this.user?.emailId,
        phoneNumber: this.user?.phoneNumber,
        role: data.roles[0]?.roleName,
        status: this.user?.status,
      });
    })
  
  }
  goBack(){
    this.router.navigate(['user-list'])
  }
 
  
}
