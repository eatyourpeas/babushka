import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PasswordMatch } from '../../../validators/password-match';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  public signUpForm: FormGroup;
  public showSpinner: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public toastController: ToastController,
    public router: Router
  ) {
    this.signUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    }, {
        validator: PasswordMatch.passwordMatchValidator
    });
  }

  ngOnInit() {
  }

  signUp() {
    const email = this.signUpForm.controls.email.value;
    const password = this.signUpForm.controls.password.value;

    this.showSpinner = true;

    this.userService.signUpWithEmailAndPassword(email, password)
    .then(newUser => {
      this.showSpinner = false;
      // save new user in profile
      this.presentToast('New Account Created');
      this.router.navigateByUrl('/profile/' + newUser.user.uid);
    })
    .catch(error =>  {
      this.showSpinner = false;
      this.presentToast(error.message);
    });
  }

  signUpWithGoogle() {
    this.showSpinner = true;
    this.userService.signUpWithGoogle()
    .then(newUser => {
      this.showSpinner = false;
      this.clearInputs();
      this.router.navigateByUrl('/profile/' + newUser.user.uid);
    })
    .catch(error => {
      this.showSpinner = false;
      this.clearInputs();
      this.presentToast(error.message);
    });
  }

  signUpWithTwitter() {
    this.showSpinner = true;
    this.userService.signUpWithTwitter()
    .then(newUser => {
      this.showSpinner = false;
      this.clearInputs();
      this.router.navigateByUrl('/profile/' + newUser.user.uid);
    })
    .catch(error => {
      this.showSpinner = false;
      this.clearInputs();
      this.presentToast(error.message);
    });
  }

  signUpWithFacebook() {
    this.showSpinner = true;
    this.userService.signUpWithFacebook()
    .then(newUser => {
      this.showSpinner = false;
      this.clearInputs();
      this.router.navigateByUrl('/profile/' + newUser.user.uid);
    })
    .catch(error => {
      this.showSpinner = false;
      this.clearInputs();
      this.presentToast(error.message);
    })
  }

  clearInputs() {
    this.signUpForm.controls.email.setValue('');
    this.signUpForm.controls.password.setValue('');
    this.signUpForm.controls.confirmPassword.setValue('');
  }

  async presentToast(messageText: string) {
    return await this.toastController.create({
      message: messageText,
      duration: 2000
    }).then(toast => {
      toast.present();
    });
  }
}
