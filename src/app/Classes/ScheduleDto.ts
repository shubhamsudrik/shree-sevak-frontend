export class ScheduleDto {
  locationId: Number;
  baithakId: Number;

  vachanGhenara: number;
  hajeriGhenara: number;
  status: String;

  date: Date;
  public ScheduleDto (locationId:0,baithakId:null,vachanGhenara:null,hajeriGhenara:null,status:""

  ){
  this.locationId=locationId;
  this.baithakId=baithakId;
  this.vachanGhenara=vachanGhenara
  this.hajeriGhenara=hajeriGhenara
  this.status=status
  }

}
