import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPopper } from 'angular-popper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrModule } from 'ngx-toastr';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxMaterialTimepickerModule,
    NgxPopper,
    Ng2SearchPipeModule,
    ClipboardModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [LocationDataService],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
  ]
})

export class AdminLayoutModule {}