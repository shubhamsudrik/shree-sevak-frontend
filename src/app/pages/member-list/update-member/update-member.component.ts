import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/Classes/member';
import { AreaDataService } from 'src/app/services/area-data.service';
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
   arealist: any;
   isInputDisabled=true; 
   weeklyOffs!: any[];
    //multi checkboxes

    WeekOff:any[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
   
    constructor(
      private MemberListService: MemberListService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private toast:ToastrService,
      private areaDataService:AreaDataService
    ) { 
      console.log(this.weeklyOffs)
     }
  
    ngOnInit(): void {
      this.getAreas()
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
        // role: [this.Member?.role, Validators.required],
        addharNumber: [this.Member?.addharNumber, [Validators.minLength(12)]],
        panNo: [this.Member?.panNo],
        // photoBase64: [this.Member?.photoBase64],
        area: [this.Member?.area, Validators.required],

        add1: [this.Member?.add1, Validators.required],
        add2: [this.Member?.add2, Validators.required],
        add3: [this.Member?.add3],
        add4: [this.Member?.add4],
        city: [this.Member?.city, Validators.required],
        division: [this.Member?.division, Validators.required],
        state: [this.Member?.state, Validators.required],
        country: [this.Member?.country, Validators.required],
        pincode: [this.Member?.pincode, [Validators.required, Validators.minLength(6)]],
        latitude: [this.Member?.latitude],
        longitude: [this.Member?.longitude],
        googleMapLink: [this.Member?.googleMapLink],
        status: [this.Member?.state, Validators.required],

        mobile: [this.Member?.mobile, [Validators.required, Validators.minLength(10)]],
        phone: [this.Member?.phoneNumber],
        email: [this.Member?.email, [Validators.required, Validators.email]],
       
        twoWheeler: [this.Member?.twoWheeler], 
        fourWheeler: [this.Member?.fourWheeler], 
        // both: [this.Member?.both], 
        noVehical: [''], 
        twoWheelerDetail: [''],    
        fourWheelerDetail: [''],           
       
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
        eligibleForNone:[''],
        eligibleForGents:[''],
        eligibleForLadies:[''],
        
        ownBaithakDay: [this.Member?.ownBaithakDay, Validators.required],
        // ownBaithakId: [this.Member?.ownBaithakId, Validators.required], 
        // type: [this.Member?.type, Validators.required],         
        hajeriNo: [this.Member?.hajeriNo, Validators.required],
        hajeriNoDetails: [this.Member?.hajeriNoDetails, Validators.required], // hajerinodetails change into Baithak Location it contain baithak location toward
        weeklyOffs: [this.Member?.weeklyOffs ||[], Validators.required],
        additionalInfo: [this.Member?.additionalInfo],
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

    //eligicheckboxes
  handleCheckboxChanges() {
    const eligibleForChild = this.memberform.get('eligibleForChild');
    const eligibleForGents = this.memberform.get('eligibleForGents');
    const eligibleForLadies = this.memberform.get('eligibleForLadies');
    const eligibleForNone = this.memberform.get('eligibleForNone');
  
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
      if(!confirm(
        'Data already exists with the same Aaddhar card Number .\n"Cancel" it for change the addhar card Number'
      )){
        
      
    } else if (this.memberform.valid) {
        // Data doesn't exist and the form is valid, save the Member
        console.log(this.Member);
        this.saveMember();
       this.toast.success("  Member Info Update Succesfully ")
      }} else {
        // alert('Please fill all fields: कृपया सर्व फील्ड भरा');
        this.toast.warning('Fill all mandatory field.')
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
          console.log('Existing Member Aadhar:', item.addharNumber);
          console.log('New Member Aadhar:', newMember.addharNumber);

          if (item.memberId === newMember.memberId) {
            continue;
          }

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
  