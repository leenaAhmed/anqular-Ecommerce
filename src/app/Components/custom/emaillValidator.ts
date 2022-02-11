import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  AsyncValidator,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/register/user.service';
import { IUser } from '../../Models/iuser';

export function checkEmailValidator(
  userService: UserService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ):  Observable<ValidationErrors | null> => {
    console.log(control.value)
    return userService.checkEmail(control.value).pipe(
      map((users: IUser[]) => {
        console.log('exist');
        return users && users.length > 0 ? { EmailExists: true } : null;
      })
    );
  };
}
