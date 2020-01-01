import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService} from '../../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  public signInForm: FormGroup;
  public showSpinner: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public toastController: ToastController,
    public router: Router
  ) {
    this.signInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.showSpinner = false;
  }

  ngOnInit() {
  }

  signIn() {
    this.showSpinner = true;
    const email = this.signInForm.controls.email.value;
    const password = this.signInForm.controls.password.value;
    this.userService.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.clearInputs();
      this.router.navigateByUrl('/');
      this.showSpinner = false;
    })
    .catch(error => {
      this.presentToast(error.message).then(() => {
        this.showSpinner = false;
        this.clearInputs();
      });
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
    this.signInForm.controls.email.setValue('');
    this.signInForm.controls.password.setValue('');
  }

}
