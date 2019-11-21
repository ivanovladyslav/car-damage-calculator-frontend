import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SignupComponent } from '@app/auth/sign-up/sign-up.component';
// import { LoginComponent } from '@app/auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
