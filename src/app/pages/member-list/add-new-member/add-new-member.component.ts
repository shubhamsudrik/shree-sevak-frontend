import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/Classes/member';
import { AreaDataService } from 'src/app/services/area-data.service';
import { MemberListService } from 'src/app/services/member-list.service';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddNewMemberComponent implements OnInit {
  memberform: FormGroup;
  submitted = false;
  defaultMembers: Member[] = [];
  Member: Member = new Member();
  id: number;
  arealist: any;



  constructor(
    private MemberListService: MemberListService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private areaDataService:AreaDataService
  ) {

    this.Member.marathiRead = true;
    this.Member.marathiWrite = true;
    this.Member.marathiSpeak = true;
    this.Member.hindiRead = true;
    this.Member.hindiWrite = true;
    this.Member.hindiSpeak = true;          
    this.Member.englishRead = true;
    this.Member.englishWrite = true;
    this.Member.englishSpeak = true;
    this.Member.eligibleForChild= true;
	  this.Member.eligibleForGents= true;
	  this.Member.eligibleForLadies= false;
    this.Member.status='1';
    this.Member.initial='Mr.';
    this.Member.education='Graduate';
    this.Member.country='IN';
    this.Member.state='Maharashtra';
    this.Member.division='A';
  }

  ngOnInit(): void {
  
    this.getAreas()
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
      // role: [this.Member?.role, Validators.required],
      area: [this.Member?.area, Validators.required],
      addharNumber: ['', [Validators.minLength(12)]],
      panNo: [''],
      // photoBase64: [''],
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
      phone: ['',],
      email: ['',[Validators.required, Validators.email]],
     
      twoWheeler: [''],
        fourWheeler: [''], 
        // both: [this.Member?.both], 
        noVehical: [''], 
        twoWheelerDetail: [''],   
        fourWheelerDetail: [''],             
     
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
      eligibleForNone:[''],
      
      ownBaithakDay: ['', Validators.required],
      // type: ['', Validators.required],          
      hajeriNo: ['', Validators.required],
      hajeriNoDetails: ['', Validators.required], // hajeri no details contain Baithak location from now
      weeklyOffs: ['', Validators.required],
      additionalInfo: [''],
    });

    this.getMembers();

    this.memberform.valueChanges.subscribe(() => {
      this.handleCheckboxChanges();
      this.handleCheckboxForVehical();
    });
  }

    // // vehicacheckbox
    handleCheckboxForVehical(){
      const twoWheeler = this.memberform.get('twoWheeler');
      const fourWheeler =this.memberform.get("fourWheeler");
      const noVehical = this.memberform.get('noVehical');
      const twoWheelerDetail = this.memberform.get('twoWheelerDetail');
      const fourWheelerDetail = this.memberform.get('fourWheelerDetail');

      if(twoWheeler.value !== this.Member.twoWheeler || fourWheeler.value !== this.Member.fourWheeler){
        noVehical.setValue(false, {emitEvent: false});
      }
      else if(noVehical.value !== this.Member.noVehical){
        twoWheeler.setValue(false, {emitEvent: false});
        fourWheeler.setValue(false, {emitEvent: false});
        twoWheelerDetail.setValue('', {emitEvent: false})
        fourWheelerDetail.setValue('', {emitEvent: false})
      }     
    }

  
  //handel check boxes
  handleCheckboxChanges() {
    const eligibleForChild = this.memberform.get('eligibleForChild');
    const eligibleForGents = this.memberform.get('eligibleForGents');
    const eligibleForLadies = this.memberform.get('eligibleForLadies');
    const eligibleForNone = this.memberform.get('eligibleForNone');
  
    // Check if the value has changed before making changes
    if (eligibleForChild.value !== this.Member.eligibleForChild ||eligibleForGents.value !== this.Member.eligibleForGents || 
      eligibleForLadies.value !== this.Member.eligibleForLadies ) {
        
      eligibleForNone.setValue(false, { emitEvent: false });
   
    } else if (eligibleForNone.value !== this.Member.eligibleForNone) {
      eligibleForChild.setValue(false, { emitEvent: false });
      eligibleForGents.setValue(false, { emitEvent: false });
      eligibleForLadies.setValue(false, { emitEvent: false });
    }
  
    // Update the Member object
    // this.Member.eligibleForChild = eligibleForChild.value;
    // this.Member.eligibleForGents = eligibleForGents.value;
    // this.Member.eligibleForLadies = eligibleForLadies.value;
  }
  

  getAreas(){
    this.areaDataService.getAreaByStatus("1").subscribe((data)=>{
      this.arealist=data
      console.log(this.arealist)
    })
  
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
      if(confirm(
        'Data already exists with the same Aaddhar card Number .\n"Cancel" it for change the addhar card Number'
      )){
      this.saveMember();
      this.toast.success("  Member Info Update Succesfully ")}
    }
     else if (this.memberform.valid) {
      // Data doesn't exist and the form is valid, save the Member
      console.log(this.Member);
      this.saveMember();
      this.toast.success("New Member Created successfully ")
    } else {
      this.toast.warning('Fill all mandatory field.');
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
    // phone number validation
    // validatePhoneNumber1(event){
    //   const input = event.target;
    //     // const numericValue = input.value.replace(/[^0-9]/g, '');
    //     const numericValue = input.value.replace(/[^0-9\s-]/g, ''); // Remove non-numeric characters
    //     const truncatedValue = numericValue.slice(0, 12); // Truncate input to 10 characters
    //     input.value = truncatedValue;
    // }
   
    validatePhoneNumber1(event) {
      const input = event.target;
      const allowedCharacters = input.value.replace(/[^\d\s-]/g, ''); // Allow only digits, spaces, and dashes
      const truncatedValue = allowedCharacters.slice(0, 13); // Truncate input to 12 characters
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
      console.log('Existing Member Aadhar:', item.addharNumber);
      console.log('New Member Aadhar:', newMember.addharNumber);
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
