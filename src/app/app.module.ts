import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { LocationListComponent } from './pages/location-list/location-list.component';
import { EditLocationComponent } from './pages/location-list/edit-location/edit-location.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UpdateLocationComponent } from './pages/location-list/update-location/update-location.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { LocationDataService } from './services/location-data.service';
import { MemberListComponent } from './pages/member-list/member-list.component';
import { AddNewMemberComponent } from './pages/member-list/add-new-member/add-new-member.component';
import { UpdateMemberComponent } from './pages/member-list/update-member/update-member.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateBaithakComponent } from './pages/baithak-list/create-baithak/create-baithak.component';
import { UpdateBaithakComponent } from './pages/baithak-list/update-baithak/update-baithak.component';
import { BaithakListComponent } from './pages/baithak-list/baithak-list.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SchedularComponent } from './pages/schedular/schedular.component';
import { AddSchedularComponent, ChunkPipe } from './pages/schedular/add-schedular/add-schedular.component';
import { UpdateScheduleComponent } from './pages/schedular/update-schedule/update-schedule.component';
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './guard/auth.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { HelloComponent } from './pages/schedular/add-schedular/hello.component';
import { ScheduleLadiesBaithakComponent } from './pages/schedular/schedule-ladies-baithak/schedule-ladies-baithak.component';
import { DynamicformComponent } from './pages/schedular/add-schedular/dynamicform/dynamicform.component';
import { UpdateDynamicFormComponent } from './pages/schedular/update-schedule/update-dynamic-form/update-dynamic-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScheduleDataService } from './services/schedule-data.service';

// import { ComponentComponent } from './pages/component/component.component';


@NgModule
({
  imports: [
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatSelectModule, 
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgFor,
    ToastrModule.forRoot(
      {
        timeOut: 3500,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
      }
    ),
    MatInputModule,
    MatButtonModule,
    BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LocationListComponent,
    EditLocationComponent,
    UpdateLocationComponent,
    MemberListComponent,
    AddNewMemberComponent,
    UpdateMemberComponent,
    CreateBaithakComponent,
    UpdateBaithakComponent,
    BaithakListComponent,
    SchedularComponent,
    AddSchedularComponent,
    UpdateScheduleComponent,
    ScheduleLadiesBaithakComponent,
    HelloComponent,
    ChunkPipe,
    ScheduleLadiesBaithakComponent,
    DynamicformComponent,
    UpdateDynamicFormComponent,
  
    // ComponentComponent
  ],
 
  providers: [LocationDataService,LoginService,AuthGuard,[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})

export class AppModule { }

  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }