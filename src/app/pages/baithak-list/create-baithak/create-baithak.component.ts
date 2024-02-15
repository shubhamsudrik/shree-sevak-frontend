import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  baithakId: number;
  

  constructor(
    private baithakService:BaithakDataService,
    private router:Router,
    private formBuilder :FormBuilder,
    private toast :ToastrService,
    private route : ActivatedRoute,
  ) { 

    this.baithak.status='1';
  }

  ngOnInit(): void {
    this.baithakId = this.route.snapshot.params["baithakId"];
    console.log("baithakId ", this.baithakId)     
    if(this.baithakId){      
    this.baithakService.getBaithakById(this.baithakId).subscribe({
      next: (data) => {
        this.baithak = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.baithakInfoForm();
    }else{
      this.baithakInfoForm();
    }
  }
    baithakInfoForm(){
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
     
      if(!this.baithakId) {
      this.saveBaithak();
      console.log("im saving new baithak")
      }
      if(this.baithakId){
        this.updateBaithak();
        console.log("im updating new baithak")
      }

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
      this.toast.success("Baithak created successfully!");      
      this.router.navigate(['/baithak-list'])
    })
  }
  updateBaithak(){
    this.baithakService.createBaithak(this.baithak).subscribe(data=>{
      console.log(data);
      this.toast.success("Baithak updated successfully!");      
      this.router.navigate(['/baithak-list'])
    })
  } 
}
