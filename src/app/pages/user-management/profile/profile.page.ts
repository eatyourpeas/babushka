import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public profileForm: FormGroup;
  public showSpinner: boolean;
  public userUid; string;
  public grades;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public toastController: ToastController,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.userUid = activatedRoute.snapshot.paramMap.get('uid');
    this.profileForm = formBuilder.group({
      email: [this.userService.angularFireAuth.auth.currentUser.email],
      screenName: [''],
      grade: [''],
    });
  }

  ngOnInit() {
    this.grades = this.userService.grades;
  }

  updateProfile() {
    const email = this.profileForm.controls.email.value;
    const screenName = this.profileForm.controls.screenName.value;
    const grade = this.profileForm.controls.grade.value;
    this.showSpinner = true;
    this.userService.createProfile(this.userUid, screenName, grade, email)
    .then(newprofile => {
      this.showSpinner = false;
      this.router.navigateByUrl('/');
      this.clearInputs();
    })
    .catch(error => {
      this.showSpinner = false;
      this.presentToast(error.message);
      this.clearInputs();
    })
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
    this.profileForm.controls.email.setValue(this.userService.angularFireAuth.auth.currentUser.email);
    this.profileForm.controls.screenName.setValue('');
    this.profileForm.controls.grade.setValue('');
  }

}
