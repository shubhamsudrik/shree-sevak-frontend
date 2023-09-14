import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Member } from 'src/app/Classes/member';
import { MemberListService } from 'src/app/services/member-list.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
    member: Member = new Member;
    defaultMembers: Member[] = [];
    public focus;
    searchText: any;
    
    constructor(
      private memberListService: MemberListService,
      private router: Router,
      public translate: TranslateService
    ) {
      translate.addLangs(['English', 'Marathi']);
      translate.setDefaultLang('English');
    }
  
    private getMemberList() {
      this.memberListService.getMemberList().subscribe(
        (data: Member[]) => {
          this.defaultMembers = data;
          console.log(this.defaultMembers);
        },
        (error) => {
          console.error('Error fetching locations:', error);
        }
      );
    }
  
    switchLang(lang: string) {
      this.translate.use(lang);
    }
  
    ngOnInit(): void {
      this.getMemberList();
    }
  
    onOpen() {
      console.log(this.member);
      this.router.navigate(['/add-new-member']);
    }
    
    toggleButtons(operation: string, member: any) {
      if (operation === 'edit') {
        member.isEditing = true;
        member.isDeleting = true;
      }
    }

  
    updateMember(memberIdId: number) {
      this.router.navigate(['/update-member', memberIdId]);
    }
  }
  