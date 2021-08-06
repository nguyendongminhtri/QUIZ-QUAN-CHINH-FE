import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from '../../service/token.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar implements OnInit{
  name: string;
  avatar: string;
  isLoggedInt = false;
  constructor(private tokenService: TokenService) {
  }
  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLoggedInt = true;
      this.name = this.tokenService.getName();
      this.avatar =  this.tokenService.getAvatar();
      console.log('avatar = ', this.avatar);
    }
  }
  
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
    MatCardModule,
  ],
  exports: [NavBar],
  declarations: [NavBar],
  providers: [StyleManager, ThemeStorage]
})
export class NavBarModule {}
