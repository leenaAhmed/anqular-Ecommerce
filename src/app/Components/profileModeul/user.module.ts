import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditprofileComponent } from './editprofile/editprofile.component';


const routes: Routes = [
  { path: 'user/editProfile', redirectTo: '/', pathMatch: 'full' },
  { path: 'editProfile', component: EditprofileComponent },
];

@NgModule({
  declarations: [
     EditprofileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

 
export class UserModule {}
