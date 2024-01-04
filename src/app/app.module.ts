import { NgFor } from "@angular/common";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { AreaFilterPipe } from "./Pipe filter/area-filter.pipe";
import { BaithakSearchPipe } from "./Pipe filter/baithak-search.pipe";
import { FilterPipe } from "./Pipe filter/filter.pipe";
import { MemberFilterPipe } from "./Pipe filter/member-filter.pipe";
import { ScheduledFilterPipe } from "./Pipe filter/scheduled-filter.pipe";
import { UserFilterPipe } from "./Pipe filter/user-filter.pipe";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";

import { AuthGuard } from "./guard/auth.guard";
import { AuthInterceptor } from "./guard/auth.interceptor";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AreaListComponent } from "./pages/area-list/area-list.component";
import { CreateAreaComponent } from "./pages/area-list/create-area/create-area.component";
import { BaithakListComponent } from "./pages/baithak-list/baithak-list.component";
import { CreateBaithakComponent } from "./pages/baithak-list/create-baithak/create-baithak.component";
import { UpdateBaithakComponent } from "./pages/baithak-list/update-baithak/update-baithak.component";
import { ChangePasswordComponent } from "./pages/forgot-password/change-password/change-password.component";
import { OtpComponentComponent } from "./pages/forgot-password/otp-component/otp-component.component";
import { EditLocationComponent } from "./pages/location-list/edit-location/edit-location.component";
import { LocationListComponent } from "./pages/location-list/location-list.component";
import { UpdateLocationComponent } from "./pages/location-list/update-location/update-location.component";
import { AddNewMemberComponent } from "./pages/member-list/add-new-member/add-new-member.component";
import { MemberListComponent } from "./pages/member-list/member-list.component";
import { UpdateMemberComponent } from "./pages/member-list/update-member/update-member.component";
import {
  AddSchedularComponent,
  ChunkPipe,
} from "./pages/schedular/add-schedular/add-schedular.component";
import { DynamicformComponent } from "./pages/schedular/add-schedular/dynamicform/dynamicform.component";
import { HelloComponent } from "./pages/schedular/add-schedular/hello.component";
import { SchedularComponent } from "./pages/schedular/schedular.component";
import { ScheduleLadiesBaithakComponent } from "./pages/schedular/schedule-ladies-baithak/schedule-ladies-baithak.component";
import { UpdateDynamicFormComponent } from "./pages/schedular/update-schedule/update-dynamic-form/update-dynamic-form.component";
import { UpdateScheduleComponent } from "./pages/schedular/update-schedule/update-schedule.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { LocationDataService } from "./services/location-data.service";
import { LoginService } from "./services/login.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "./components/components.module";
@NgModule
({
  imports: [
  
    Ng2SearchPipeModule,
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    ButtonModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,

    NgxSpinnerModule.forRoot({ type: "ball-scale-multiple" }),
    NgFor,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: "toast-top-center",
      preventDuplicates: true,
    }),
    MatInputModule,

    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
    OtpComponentComponent,
    ChangePasswordComponent,
    AreaListComponent,
    CreateAreaComponent,

    FilterPipe,
    BaithakSearchPipe,
    MemberFilterPipe,
    ScheduledFilterPipe,
    AreaFilterPipe,
    UserListComponent,
    UserFilterPipe,

    // ComponentComponent
  ],

  providers: [
    LocationDataService,
    LoginService,
    AuthGuard,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
