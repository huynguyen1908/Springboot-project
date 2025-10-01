import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import {Router, RouterLink} from '@angular/router';
import { LoginRequest } from '../../models/requests/login-request';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';
import {HttpClientModule} from '@angular/common/http';

interface JwtPayload {
  role: string;
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})

export class LoginComponentComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  isSubmitted: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const request: LoginRequest = this.loginForm.value as LoginRequest;

    this.authService.login(request).subscribe({
      next: (response) => {
        this.authService.saveToken(response.accessToken);

        const decodedToken = jwtDecode<JwtPayload>(response.accessToken);
        const role = decodedToken.role;

        if(role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'USER' || role === 'GUEST'){
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(err);
      }
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  trimControl(field: string){
    const control = this.loginForm.get(field);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  }

}
