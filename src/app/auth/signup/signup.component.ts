import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required])
        });
    }

    signUp(): Promise<void> {
        if(this.form.invalid) {
            return;
        }

        const { email, password } = this.form.value;

        console.log("email: " + email + " password: " + password);
    }
}