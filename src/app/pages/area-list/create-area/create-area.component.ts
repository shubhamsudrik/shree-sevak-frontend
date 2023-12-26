import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Area } from "src/app/Classes/Area";
import { AreaDataService } from "src/app/services/area-data.service";

@Component({
  selector: "app-create-area",
  templateUrl: "./create-area.component.html",
  styleUrls: ["./create-area.component.css"],
})
export class CreateAreaComponent implements OnInit {
  areaForm: FormGroup;
  area: Area = new Area();
  submitted: boolean = false;
  defaultAreas: any[];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private areaDataService: AreaDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"]; // the '+' sign is used to convert the parameter to a number
      console.log(this.id); // This will log the value "1" from your example URL
    });
    this.getAllAreas();
    this.areaForm = this.formBuilder.group({
      areaName: ["", Validators.required],
      contactInitial: ["", Validators.required],
      contactName: ["", Validators.required],
      contactOccupation: [""],
      contactPhone1: ["", Validators.required],
      contactPhone2: [""],
      contactEmail: ["", Validators.required],
      city: ["", Validators.required],
      division: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      status: ["", Validators.required],
    });

    if (!isNaN(this.id)) {
      this.populateForm();
    }
  }

  getAllAreas() {
    this.areaDataService.getAllAreaList().subscribe((data) => {
      this.defaultAreas = data;
      console.log(this.defaultAreas);
    });
  }

  populateForm() {
    this.areaDataService.getAreaById(this.id).subscribe((data) => {
      this.area = data;

      this.areaForm.patchValue({
        areaName: this.area?.areaName,
        contactInitial: this.area?.contactInitial,
        contactName: this.area?.contactName,
        contactOccupation: this.area?.contactOccupation,
        contactPhone1: this.area?.contactPhone1,
        contactPhone2: this.area?.contactPhone2,
        contactEmail: this.area?.contactEmail,
        city: this.area?.city,
        division: this.area?.division,
        state: this.area?.state,
        country: this.area?.country,
        status: this.area?.status,
      });
    });
  }

  checkDublickateAndSave(isDuplicate: boolean) {
    if (isDuplicate) {
      // Data already exists error message
      alert(
        "Data already exists with the same address, city, state, and division."
      );
    } else if (this.areaForm.valid) {
      // Data doesn't exist and the form is valid, save the location
      console.log(this.area.areaName);
      console.log(this.area);
      this.saveArea(this.area);
    } else {
      this.toast.warning("Fill all mandatory field.");
    }
  }
  onSubmit() {
    this.submitted = true;

    const isDuplicate = this.isDuplicateData(this.area);

    this.checkDublickateAndSave(isDuplicate);
  }
  saveArea(area: Area) {
    this.areaDataService.createArea(area).subscribe((data: Area) => {
      console.log(data);
      this.toast.success("Area Added successfully");
      this.router.navigate(["/area-list"]);
    });
  }
  Clear() {
    this.areaForm.reset();
  }
  CancelChanges() {
    this.router.navigate(["/area-list"]);
  }

  get areaFormCotrols() {
    return this.areaForm.controls;
  }
  validatePincode(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
    input.value = truncatedValue;
  }
  validatePhoneNumber(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
    input.value = truncatedValue;
  }

  isDuplicateData(newArea: Area): boolean {
    for (let item of this.defaultAreas) {
      if (
        item.city === newArea.city &&
        item.state === newArea.state &&
        item.division === newArea.division &&
        item.areaName === newArea.areaName
      ) {
        return true; // Data already exists
      }
    }
    return false; // Data does not exist
    console.log(newArea);
  }

  updateArea() {
    if (this.areaForm.valid) {
      const isDuplicate = this.isDuplicateData(this.area);

      this.checkDublickateAndSave(isDuplicate);
     if(!isDuplicate){
      this.areaDataService.updateArea(this.area, this.id).subscribe((data) => {
        console.log("updated data", data);
     

        this.toast.success("update Succesfully");
        this.router.navigate(["/area-list"]);
      });
    } else {
      this.toast.warning("please Feild * feilds");
    }

     }
  }

}
