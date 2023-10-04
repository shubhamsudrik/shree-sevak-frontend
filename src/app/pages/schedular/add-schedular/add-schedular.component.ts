import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberListService } from 'src/app/services/member-list.service';
import { Schedule } from 'src/app/Classes/schedule';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Member } from 'src/app/Classes/member';
import { Location } from 'src/app/Classes/location';


@Component({
  selector: 'app-add-schedular',
  templateUrl: './add-schedular.component.html',
  styleUrls: ['./add-schedular.component.css']
})
export class AddSchedularComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

   
  }
  