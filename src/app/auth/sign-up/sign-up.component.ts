import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
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