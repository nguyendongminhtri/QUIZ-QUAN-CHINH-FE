import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangeProfile} from '../../model/ChangeProfile';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.scss']
})
export class ChangeProfileComponent implements OnInit {
status = 'Please fill in the form to change your Profile!'
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  // changeProfileForm: FormGroup;
  isCheckSuccess = false;
  changeProfile: ChangeProfile = new ChangeProfile();
  form: any = {};
  data1: any = {
    message: "nouser"
  }
  data2: any = {
    message: "noemail"
  }
  data3: any = {
    message: "yes"
  }
  submitted = false;
  // @Output()
  // change = new EventEmitter<string>();
  constructor(private route: Router,
              private authService: AuthService,
              private tokenStorageService: TokenService) {
    // this.changeProfileForm = this.formBuilder.group({
    //     name: ['', Validators.required],
    //     username: ['', Validators.required],
    //     avatar: ['', Validators.required],
    //     email: ['', Validators.required, Validators.email]
    // })
  }

  ngOnInit() {

  }

  ngSubmit() {

    console.log('truyen vaof',this.changeProfile)
    this.authService.changeProfile(this.changeProfile).subscribe(data => {
      console.log('data',data)
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {

        // this.isCheckUser = true;
        // alert('your username has been used')
        this.status = 'Your username has been used! Please try again!'
        this.submitted = true;
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        // this.isCheckEmail = true;
        // alert('your email has been used')
        this.status = 'Your email has been used! Please try again!';
      }
      if(JSON.stringify(data)==JSON.stringify(this.data3)){
        // alert('Change Profile Success!!')
        // this.errormessage = 'Change Profile Success!!'
        this.status = 'Change Profile Success! Please login again with new your profile!'
        this.tokenStorageService.setName(this.form.name);
        this.isCheckSuccess = true;
        alert(this.status);
        this.tokenStorageService.logOut();
      }

      // if(JSON.stringify(data)==JSON.stringify(this.data4)){
      //     this.errormessage = 'Exception kia'
      // }
    }, error1 => {
      alert('Change Profile Failled! Please login before change!');
    })
  }
}
