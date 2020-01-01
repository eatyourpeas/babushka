import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPasswordForm: FormGroup;
  public showSpinner: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public router: Router,
    public userService: UserService
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
   }

  ngOnInit() {
  }

  resetPassword() {
    const email = this.resetPasswordForm.controls.email.value;
    this.showSpinner = true;
    this.userService.resetPassword(email)
    .then(() => {
      this.showSpinner = false;
      this.presentToast('Check your email for a link to reset your password')
      .then(() => {
        this.router.navigateByUrl('/');
        this.clearInputs();
      });
    })
    .catch(error => {
      this.showSpinner = false;
      this.clearInputs();
      this.presentToast(error.message);
    });
  }

  async presentToast(messageText: string) {
    return await this.toastController.create({
      message: messageText,
      duration: 2000
    }).then(toast => {
      toast.present();
    });
  }

  clearInputs() {
    this.resetPasswordForm.controls.email.setValue('');
  }
}
