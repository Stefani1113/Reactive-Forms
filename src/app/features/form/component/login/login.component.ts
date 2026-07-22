import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


export interface UserSummary {
  fullName: string;
  email: string;
  userName: string;
  age: number;
  tyc: boolean;
}

// Validador de contraseñas a nivel de grupo
function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  showPassword = false;
  showConfirmPassword = false;
  submitted = false;

  @Output() registered = new EventEmitter<UserSummary>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        fullName: [
          { value: null, disabled: false },
          [Validators.required, Validators.minLength(3)],
        ],
        email: [
          { value: null, disabled: false },
          [Validators.required, Validators.email],
        ],
        userName: [
          null,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)],
        ],
        age: [null, [Validators.required, Validators.min(15), Validators.max(90)]],
        tyc: [false, [Validators.requiredTrue]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+/),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      { validators: passwordMatchValidator() }
    );
  }

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { password, confirmPassword, ...userData } = this.form.value;
    this.registered.emit(userData as UserSummary);
    this.submitted = true;
    this.form.reset({ tyc: false });
    this.showPassword = false;
    this.showConfirmPassword = false;
  }
}