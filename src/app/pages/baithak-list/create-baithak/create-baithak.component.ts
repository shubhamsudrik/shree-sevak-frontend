import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Baithak } from 'src/app/Classes/baithak';
import { BaithakDataService } from 'src/app/services/baithak-data.service';
@Component({
  selector: 'app-create-baithak',
  templateUrl: './create-baithak.component.html',
  styleUrls: ['./create-baithak.component.css']
})
export class CreateBaithakComponent implements OnInit {
  
 
  baithakForm:FormGroup;
  baithak:Baithak=new Baithak();
  

  constructor(
    private baithakService:BaithakDataService,
    private router:Router,
    private formBuilder :FormBuilder,
    private toast :ToastrService
  ) { 
    this.baithak.baithakType='Child';
    this.baithak.dayOfWeek ='Sunday';
    this.baithak.toTime='9:15 AM';
    // this.baithak.date="2023-10-11"
    this.baithak.fromTime='8:00 AM';
    this.baithak.status='1';
  }

  ngOnInit(): void {
     
     // FormValidation
     this.baithakForm = this.formBuilder.group({
      baithakType: ['',Validators.required ],
      dayOfWeek: ['',Validators.required],
      // date: ['',Validators.required],
      toTime: ['',Validators.required],
      fromTime: ['',Validators.required],
      status: ['',Validators.required],
      
  
    })
  }



  onSubmit(){
    
    if (this.baithakForm.valid) {
      console.log(this.baithak);

      this.saveBaithak();
      this.toast.success("Baithak created successfully!");
    } else {
      this.toast.warning("All field is mandatory.");
    }

  }
  CancelChanges(){
    this.router.navigate(["/baithak-list"])
    
  }
  Clear(){
    this.baithakForm.reset();

  }
  saveBaithak(){
    this.baithakService.createBaithak(this.baithakForm.value).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/baithak-list'])
    })
  }

 
}
