import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScheduleDto } from 'src/app/Classes/schedule-dto';

@Component({
  selector: 'app-baithak-card',
  templateUrl: './baithak-card.component.html',
  styleUrls: ['./baithak-card.component.css']
})
export class BaithakCardComponent implements OnInit {
  @Output() valueUpdate: EventEmitter<any> = new EventEmitter();
  @Input() dayBaithakList:any[] = [];
  @Input() day:any

  baithakFormCard:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  onCardClick(baithak:any):void {
    console.log('onCardClick', baithak);
    this.valueUpdate.emit(baithak);

  }
}
