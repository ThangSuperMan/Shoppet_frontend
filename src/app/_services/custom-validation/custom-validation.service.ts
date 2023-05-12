import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  constructor(private userService: UserService) {}

  patternCardValidator(): ValidatorFn {
    console.log('patterncardValidator');
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
      const paypalRegex =
        /^(?:5019|5020|5038|6304|6759|6761|6762|6763)[0-9]{12}(?:[0-9]{3})?$/;

      // Remove whitespace characters
      const cardNumber = control.value.replace(/\s/g, '');

      if (visaRegex.test(cardNumber)) {
        return null; // Valid Visa card number
      } else if (paypalRegex.test(cardNumber)) {
        return null; // Valid PayPal card number
      } else {
        return { invalidCard: true }; // Invalid card number
      }
    };
  }

  patternValidator(): ValidatorFn {
    console.log('patternValidator');
    return (control: AbstractControl): ValidationErrors | null => {
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
}
