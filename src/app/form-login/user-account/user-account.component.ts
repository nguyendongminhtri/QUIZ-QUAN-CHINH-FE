import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  info: any;
  admin: any = ["ADMIN"];
  isCheckAdmin = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.info = {
      name: this.tokenService.getName(),
      avatar: this.tokenService.getAvatar()
    };
    if(JSON.stringify(this.tokenService.getRoles())==JSON.stringify(this.admin)){
      this.isCheckAdmin = true;
    }
  }
  logOut(){
    this.tokenService.logOut();
  }
}
