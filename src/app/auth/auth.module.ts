import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule {

}