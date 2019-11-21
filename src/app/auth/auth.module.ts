import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
    declarations: [
        SignUpComponent,
        SignInComponent
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