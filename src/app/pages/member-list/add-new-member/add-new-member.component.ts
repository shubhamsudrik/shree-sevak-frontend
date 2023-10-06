import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.MemberListService.getMemberById(this.id).subscribe({
      next: (data) => {
        this.Member = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // Validatons
    this.memberform = this.formBuilder.group({
      initial: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      education: ['', Validators.required],
      occupation: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      roles: ['', Validators.required],
      addharNumber: ['', [Validators.required, Validators.minLength(12)]],
      panNo: ['', Validators.required],
      photoBase64: ['', Validators.required],

      add1: ['', Validators.required],
      add2: ['', Validators.required],
      add3: [''],
      add4: [''],
      city: ['', Validators.required],
      division: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      googleMapLink: ['', Validators.required],

      mobile: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: [''],
      email: ['', Validators.required],
     
      vehiclesType: ['', Validators.required],
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
      
      ownBaithakDay: ['', Validators.required],
      ownBaithakId: ['', Validators.required],          
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
    } else {
      alert('Please fill all fields: कृपया सर्व फील्ड भरा');
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
