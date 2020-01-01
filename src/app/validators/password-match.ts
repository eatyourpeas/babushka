import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

export class PasswordMatch {
    static passwordMatchValidator(formGroup: FormGroup) {
        const password: string = formGroup.controls.password.value; // get password from our password form control
        const confirmPassword: string = formGroup.controls.confirmPassword.value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            formGroup.controls.confirmPassword.setErrors({'NoPasswordMatch' : true});
            console.log('not equal');
            return { 'NoPasswordMatch': true };
        }
        return null;
    }
}
