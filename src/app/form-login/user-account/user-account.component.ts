import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  info: any;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.info = {
      name: this.tokenService.getName(),
      avatar: this.tokenService.getAvatar()
    };
  }
  logOut(){
    window.sessionStorage.clear();
    window.location.reload();
  }
}
