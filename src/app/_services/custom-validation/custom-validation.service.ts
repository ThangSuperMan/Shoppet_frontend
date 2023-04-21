import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  constructor(private userService: UserService) {}

  patternValidator(): ValidatorFn {
    console.log('patternValidator');
    return (control: AbstractControl): any => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  checkUsername(username: string): any {
    console.log('checkUsername triggred!');
    return (formGroup: FormGroup): any => {
      const usernameControl = formGroup.controls[username];
      console.log('usernameControl :>> ', usernameControl);
      let returnResult;
      this.userService.getUserByUsername(usernameControl.value).subscribe({
        next: (response: any) => {
          console.log('response :>> ', response);
          if (response.isUsernameAvailable === true) {
            returnResult = null;
          } else {
            usernameControl.setErrors({ userNameAvailable: true });
          }
        },
        error: (error: any) => {
          console.log(
            'Error when call checkUsernameIsAvailable method :>> ',
            error
          );
        },
      });

      return returnResult;
    };
  }

  matchPassword(password: string, confirmPassword: string): any {
    return (formGroup: FormGroup): any => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMisMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.validateUsername(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      });
    });
  }

  validateUsername(username: string): boolean {
    const users = ['thang', 'nhi', 'ngoc'];
    return users.indexOf(username) > -1;
  }
}
