import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { LocationListComponent } from 'src/app/pages/location-list/location-list.component';
import { EditLocationComponent } from 'src/app/pages/location-list/edit-location/edit-location.component';
import { UpdateLocationComponent } from 'src/app/pages/location-list/update-location/update-location.component';
import { MemberListComponent } from 'src/app/pages/member-list/member-list.component';
import { UpdateMemberComponent } from 'src/app/pages/member-list/update-member/update-member.component';
import { AddNewMemberComponent } from 'src/app/pages/member-list/add-new-member/add-new-member.component';
// import { ComponentComponent } from 'src/app/pages/component/component.component';

export const AdminLayoutRoutes: Routes = [
 
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'location-list', component: LocationListComponent},
    { path: 'edit-location', component: EditLocationComponent },
    { path: 'add-new-member', component: AddNewMemberComponent },
    { path: 'member-list', component: MemberListComponent },
    { path: 'update-location/:id', component: UpdateLocationComponent },
    { path: 'update-member/:id', component: UpdateMemberComponent },
    // {path :'component', component :ComponentComponent}
   
    
];
