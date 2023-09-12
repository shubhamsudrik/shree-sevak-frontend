import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { LocationListComponent } from './pages/location-list/location-list.component';
import { EditLocationComponent } from './pages/edit-location/edit-location.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UpdateLocationComponent } from './pages/update-location/update-location.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { LocationDataService } from './location-data.service';

// import { ComponentComponent } from './pages/component/component.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatSelectModule, 
    NgFor,
    ToastrModule.forRoot(),
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
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    LocationListComponent,
    EditLocationComponent,
    UpdateLocationComponent,
    
    // ComponentComponent
  ],
 
  providers: [LocationDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }

  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }