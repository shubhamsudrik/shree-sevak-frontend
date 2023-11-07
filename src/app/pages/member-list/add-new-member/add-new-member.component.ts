import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/Classes/member';
import { MemberListService } from 'src/app/services/member-list.service';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.css']
})
export class AddNewMemberComponent implements OnInit {
  memberform: FormGroup;
  submitted = false;
  defaultMembers: Member[] = [];
  Member: Member = new Member();
  id: number;

  constructor(
    private MemberListService: MemberListService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
  ) {

    this.Member.marathiRead = true;
    this.Member.marathiWrite = true;
    this.Member.marathiSpeak = true;
    this.Member.hindiRead = true;
    this.Member.hindiWrite = true;
    this.Member.hindiSpeak = true;          
    this.Member.englishRead = false;
    this.Member.englishWrite = false;
    this.Member.englishSpeak = false;
    this.Member.eligibleForChild= true;
	  this.Member.eligibleForGents= false;
	  this.Member.eligibleForLadies= false;
    this.Member.status='1';
    this.Member.initial='Mr.';
    this.Member.education='Graduate';
    this.Member.country='IN';
    this.Member.state='Maharashtra';
    this.Member.division='A';
  }

  ngOnInit(): void {
  

    // Validatons
    this.memberform = this.formBuilder.group({
      initial: [this.Member?.initial, Validators.required],
      firstName: [this.Member?.firstName, Validators.required],
      middleName: [this.Member?.middleName, Validators.required],
      lastName: [this.Member?.lastName, Validators.required],
      education: [this.Member?.education, Validators.required],
      occupation: [this.Member?.occupation, Validators.required],
      dob: [this.Member?.dob, Validators.required],
      gender: [this.Member?.gender, Validators.required],
      role: [this.Member?.role, Validators.required],
      area: [this.Member?.area, Validators.required],
      addharNumber: ['', [Validators.required, Validators.minLength(12)]],
      panNo: ['', Validators.required],
      photoBase64: [''],
      status :[''],
      add1: ['', Validators.required],
      add2: ['', Validators.required],
      add3: [''],
      add4: [''],
      city: ['', Validators.required],
      division: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
      latitude: [''],
      longitude: [''],
      googleMapLink: [''],

      mobile: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: [''],
      email: ['', Validators.required],
     
      vehicleType: ['', Validators.required],
      vehicleDetails: ['', Validators.required],                 
     
      marathiRead:[''],
      marathiWrite:[''],
      marathiSpeak:[''],
      hindiRead:[''],
      hindiWrite:[''],
      hindiSpeak:[''],              
      englishRead:[''],
      englishWrite:[''],
      englishSpeak:[''],

      eligibleForChild:[''],
	    eligibleForGents:[''],
	    eligibleForLadies:[''],
      
      ownBaithakDay: ['', Validators.required],
      // type: ['', Validators.required],          
      hajeriNo: ['', Validators.required],
      hajeriNoDetails: [''],
      weeklyOffs: ['', Validators.required],
      additionalInfo: [''],
    });

    this.getMembers();
  }


  get MemberFormControl() {
    return this.memberform.controls;
  }

  onsubmit1() {
    this.submitted = true;
    if (this.memberform.valid) {
      return;
    }
    alert('unsuccessful');
  }

  onSubmit() {
    this.submitted = true;

    const isDuplicate = this.isDuplicateData(this.Member);

    if (isDuplicate) {
      // Data already exists error message
      alert(
        'Data already exists with the same Aaddhar card Number .'
      );
    }
     else if (this.memberform.valid) {
      // Data doesn't exist and the form is valid, save the Member
      console.log(this.Member);
      this.saveMember();
      this.toast.success("New Member Created successfully ")
    } else {
      this.toast.warning('All field is mandatory.');
    }
    
  }

  saveMember() {
    this.MemberListService.createMember(this.Member).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/member-list']);
      },
      (error) => console.log(error)
    );
  }

  CancelChanges() {
    this.router.navigate(['/member-list']);
  }

  Clear() {
    this.memberform.reset();
  }

  // getting member data
  getMembers() {
    this.MemberListService.getMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers = data;
        console.log(this.defaultMembers);
      },
      (error) => {
        console.error('Error fetching Members:', error);
      }
    );
  }

  // piccode validation
  validatePincode(event) {
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 6); // Truncate input to 6 characters
    input.value = truncatedValue;
  }
    // mobile number validation
    validatePhoneNumber(event){
      const input = event.target;
        const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
        input.value = truncatedValue;
    }
    // addhar number validation
    validateAddharNumber(event){
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 12); // Truncate input to 12 characters
    input.value = truncatedValue;
  }
    // addhar number validation
    validateHajeriNumber(event){
    const input = event.target;
    const numericValue = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    input.value = numericValue;
  }



    // addhar number validation
    validatePanNumber(event){
      const input = event.target;
      const numericValue = input.value.replace(/[^0-9a-zA-Z]/g, '');
     
 // Remove non-numeric characters
      const truncatedValue = numericValue.slice(0, 10); // Truncate input to 10 characters
      input.value = truncatedValue;
    }



  isDuplicateData(newMember: Member): boolean {
    for (let item of this.defaultMembers) {
      if (
        
        item.addharNumber === newMember.addharNumber 
        // item.id !== newMember.MemberId
      ) {
        return true; // Data already exists
      }
    }
    return false; // Data does not exist
  }
}
