import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ChangePassword} from '../../model/ChangePassword';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../service/token.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  status = 'Please fill in the form to change your password'
  form: any = {};
  myForm: FormGroup;
  // myForm1: FormGroup;
  // myForm2: FormGroup;
  changePassWord: ChangePassword;
  matcher = new MyErrorStateMatcher();
  // matcher2 = new MyErrorStateMatcher2();
  isChangePassed = false;
  errorMessage = '';
  hide = true;
  data: any = {
    message: "yes"
  };
  // data2: any = {
  //     message: "no"
  // };
  // data2: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService) {
    // this.myForm = this.formBuilder.group({
    //         currentPassword: [''],
    //         newPassword: [''],
    //         confirmPassword: ['']
    //     }
    // );
    this.myForm = this.formBuilder.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['']
      }, {validator: this.checkPasswords},
    );

    // this.myForm1 = this.formBuilder.group({
    //         // currentPassword: ['', [Validators.required]],
    //         newPassword: [''],
    //         confirmPassword: ['', [Validators.required]]
    //
    //     }, {validator: this.checkPasswords}
    // );
  }

  ngOnInit() {
    this.changePassWord = new ChangePassword(
      this.form.currentPassword,
      this.form.newPassword,
      this.form.confirmPassword
    )
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let newpass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return newpass === confirmPass ? null : {notSame: true}
  }

  // checkNewAndCurrentPassword(group: FormGroup) { // here we have the 'passwords' group
  //     let currentPass = group.controls.currentPassword.value;
  //     let oldPass = group.controls.newPassword.value;
  //
  //     return currentPass !== oldPass ? null : {notSameOld: true}
  // }


  ngSubmit() {
    this.authService
      .changePasswordAuth(this.changePassWord)
      .subscribe(
        data => {
          console.log('data', data)

          if (JSON.stringify(data) == JSON.stringify(this.data)) {
            this.isChangePassed = false;
            console.log('data trong if', data)
            console.log('ischangePass', this.isChangePassed)
            // alert('Bạn đã thay đổi Mật Khẩu thành công');
            this.status = 'Change Password success!'
          } else {
            this.isChangePassed = true;
            console.log('xuong else')
            // alert('Mật khẩu không khớp')
          }

          // this.router.navigate(['/home']);
        }, error => {
          alert('khong duoc')
        }
      );
  }

}
