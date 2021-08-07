import { Component, OnInit } from '@angular/core';
import {ChangeAvatar} from '../../model/ChangeAvatar';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  form: any = {};
  changeAvatar: ChangeAvatar;
  data1: any = {
    message: 'noavatar'
  };
  data2: any = {
    message: 'yes'
  };
  status = 'Please Choose an image and click Upload';
  isChange = false;
  constructor(private authService: AuthService,
              private router: Router,
              private tokenStorageService: TokenService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.changeAvatar = new ChangeAvatar(
      this.form.avatar
    );
    this.authService.changeAvatar(this.changeAvatar).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.status = 'please upload Avatar!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.status = 'Successful Avatar upload!';
        this.tokenStorageService.setAvatar(this.form.avatar);
        // this.router.navigate(['user'])
        window.location.reload();
        // this.tokenStorageService.setAvatar(this.form.avatar)
      }
    }, error => {
      alert('change avatar failled!');

    });
  }

  onAvatar($event) {
    this.isChange = true;
    this.form.avatar = $event;
  }
}
