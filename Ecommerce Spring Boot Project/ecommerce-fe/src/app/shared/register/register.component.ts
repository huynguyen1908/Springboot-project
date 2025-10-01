import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthServiceService} from '../../services/auth-service.service';
import {RegisterRequest} from '../../models/requests/register-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isSubmitted = false;
  generalError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required, Validators.maxLength(255)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', Validators.required],
      address: [''],
      phoneNumber: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  onSubmit() {
    this.isSubmitted = !this.isSubmitted;
    const registerRequest: RegisterRequest = this.registerForm.value;
    this.authService.register(registerRequest).subscribe({
      next: data => {
        this.router.navigate(['/auth/login']);
      },
      error: errorResponse => {
        const apiError = errorResponse.error || errorResponse;
        const field = apiError?.field;
        const message = apiError?.message;
        const code = apiError?.code;
        this.generalError = null;
        if (field && message) {
          this.registerForm.get(field)?.setErrors({apiError: message});
        } else {
          this.generalError = 'Registration failed: ' + (message ? message : 'Unknown error.');
        }
      }
    })
  }

  trimControl(field: string){
    const control = this.registerForm.get(field);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  }
}
