import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './pages/user-list/register/register.component';
import { HasRoleGuard } from './guard/has-role.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ],
    canActivate:[AuthGuard]
  }, 
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[HasRoleGuard],data:{roles:['ADMIN']}// Apply the canActivate guard to the "Sign Up" route
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
      
      
    ],
    
  }, {
    path: '**',
    redirectTo: 'dashboard'
    
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }