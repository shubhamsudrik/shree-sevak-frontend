import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/Classes/member';
import { MemberListService } from 'src/app/services/member-list.service';


@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {
  
    memberform: FormGroup;
    submitted = false;
    defaultMembers: Member[] = [];
    Member: Member = new Member();
    id: number;
   
    constructor(
      private MemberListService: MemberListService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.initializeForm();
      this.MemberListService.getMemberById(this.id).subscribe({
        next: (data : Member) => {
          console.log(data);
          this.Member = data;
          this.populateForm()
         
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
      populateForm(){
        this.memberform.patchValue({
        firstName:this.Member?.firstName,
        hindiRead: this.Member.hindiRead,
        hindiWrite: this.Member.hindiWrite,
        hindiSpeak: this.Member.hindiSpeak,
        marathiRead: this.Member.marathiRead,
        marathiWrite: this.Member.marathiWrite,
        marathiSpeak: this.Member.marathiSpeak,
        englishRead: this.Member.englishRead,
        englishWrite: this.Member.englishWrite,
        englishSpeak: this.Member.englishSpeak,
        })
      }
      // Validatons
      initializeForm() {
      this.memberform = this.formBuilder.group({
        initial: [this.Member?.initial, Validators.required],
        firstName: [this.Member?.firstName, Validators.required],
        middleName: [this.Member?.middleName, Validators.required],
        lastName: [this.Member?.lastName, Validators.required],
        education: [this.Member?.education, Validators.required],
        occupation: [this.Member?.occupation, Validators.required],
        dob: [this.Member?.dob, Validators.required],
        gender: [this.Member?.gender, Validators.required],
        // eligible: ['', Validators.required],
        role: [this.Member?.role, Validators.required],
        addharNumber: [this.Member?.addharNumber, [Validators.required, Validators.minLength(12)]],
        panNo: [this.Member?.panNo, Validators.required],
        photoBase64: [this.Member?.photoBase64],

        add1: [this.Member?.add1, Validators.required],
        add2: [this.Member?.add2, Validators.required],
        add3: [this.Member?.add3],
        add4: [this.Member?.add4],
        city: [this.Member?.city, Validators.required],
        division: [this.Member?.division, Validators.required],
        state: [this.Member?.state, Validators.required],
        country: [this.Member?.country, Validators.required],
        pincode: [this.Member?.pincode, [Validators.required, Validators.minLength(6)]],
        latitude: [this.Member?.latitude, Validators.required],
        longitude: [this.Member?.longitude, Validators.required],
        googleMapLink: [this.Member?.googleMapLink],
        status: [this.Member?.state, Validators.required],

        mobile: [this.Member?.mobile, [Validators.required, Validators.minLength(10)]],
        phoneNumber: [this.Member?.phoneNumber],
        email: [this.Member?.email, Validators.required],
       
        vehicleType: [this.Member?.vehicleType, Validators.required], 
        vehicleDetails: [this.Member?.vehicleDetails, Validators.required],                 
       
        hindiRead:[this.Member?.hindiRead],
        hindiWrite:[this.Member?.hindiWrite],
        hindiSpeak:[this.Member?.hindiSpeak],
        marathiRead:[this.Member?.marathiRead],
        marathiWrite:[this.Member?.marathiWrite],
        marathiSpeak:[this.Member?.marathiSpeak],        
        englishRead:[this.Member?.englishRead],
        englishWrite:[this.Member?.englishWrite],
        englishSpeak:[this.Member?.englishSpeak],

        eligibleForChild:[''],
        eligibleForGents:[''],
        eligibleForLadies:[''],
        
        ownBaithakDay: [this.Member?.ownBaithakDay, Validators.required],
        // ownBaithakId: [this.Member?.ownBaithakId, Validators.required],          
        hajeriNo: [this.Member?.hajeriNo, Validators.required],
        hajeriNoDetails: [this.Member?.hajeriNoDetails],
        weeklyOffs: [this.Member?.weeklyOffs, Validators.required],
        additionalInfo: [this.Member?.additionalInfo],
      });
 
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
    } else 
      if (this.memberform.valid) {
        // Data doesn't exist and the form is valid, save the Member
        console.log(this.Member);
        this.saveMember();
      } else {
        alert('Please fill all fields: कृपया सर्व फील्ड भरा');
      }
    }
  
    saveMember() {
      this.MemberListService.createMember(this.Member).subscribe(
        data => {
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
      const truncatedValue = numericValue.slice(0, 12); // Truncate input to 10 characters
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
  