import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { LocationListComponent } from 'src/app/pages/location-list/location-list.component';
import { EditLocationComponent } from 'src/app/pages/location-list/edit-location/edit-location.component';
import { UpdateLocationComponent } from 'src/app/pages/location-list/update-location/update-location.component';
import { MemberListComponent } from 'src/app/pages/member-list/member-list.component';
import { UpdateMemberComponent } from 'src/app/pages/member-list/update-member/update-member.component';
import { AddNewMemberComponent } from 'src/app/pages/member-list/add-new-member/add-new-member.component';
import { BaithakListComponent } from 'src/app/pages/baithak-list/baithak-list.component';
import { CreateBaithakComponent } from 'src/app/pages/baithak-list/create-baithak/create-baithak.component';
import { UpdateBaithakComponent } from 'src/app/pages/baithak-list/update-baithak/update-baithak.component';
import { SchedularComponent } from 'src/app/pages/schedular/schedular.component';
import { AddSchedularComponent } from 'src/app/pages/schedular/add-schedular/add-schedular.component';
import { UpdateScheduleComponent } from 'src/app/pages/schedular/update-schedule/update-schedule.component';
import { ScheduleLadiesBaithakComponent } from 'src/app/pages/schedular/schedule-ladies-baithak/schedule-ladies-baithak.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { ReportComponent } from 'src/app/pages/report/report.component';



export const AdminLayoutRoutes: Routes = [
 
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'location-list', component: LocationListComponent},
    { path: 'edit-location', component: EditLocationComponent },
    { path: 'add-new-member', component: AddNewMemberComponent },
    { path: 'member-list', component: MemberListComponent },
    { path: 'update-location/:id', component: UpdateLocationComponent },
    { path: 'update-member/:id', component: UpdateMemberComponent },
    { path: 'baithak-list', component: BaithakListComponent },
    { path: 'create-baithak', component: CreateBaithakComponent },
    { path: 'update-baithak/:id', component: UpdateBaithakComponent },
    { path: 'schedular', component: SchedularComponent },
    { path: 'add-schedular', component: AddSchedularComponent },
    { path: 'update-schedule/:id', component: UpdateScheduleComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'report', component: ReportComponent },
    { path: 'schedule-ladies-baithak', component: ScheduleLadiesBaithakComponent },
   

];
