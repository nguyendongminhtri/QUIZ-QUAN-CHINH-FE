import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxAudioPlayerModule } from 'projects/ngx-audio-player/src/public_api';
import { MatButtonModule } from '@angular/material/button';

import {NavBarModule} from './shared/navbar';
import {FooterModule} from './shared/footer';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './form-login/register/register.component';
import { LoginComponent } from './form-login/login/login.component';
import { UserAccountComponent } from './form-login/user-account/user-account.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment.prod';
import { UploadAvatarComponent } from './upload/upload-avatar/upload-avatar.component';
import { UploadFileComponent } from './upload/upload-file/upload-file.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {httpInterceptorProviders} from './service/auth.interceptor';
import {AuthGuard} from './service/auth.guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ChangeAvatarComponent } from './manage-profile/change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './manage-profile/change-password/change-password.component';
import { ChangeProfileComponent } from './manage-profile/change-profile/change-profile.component';
import { PageUserComponent } from './admin-manage/page-user/page-user.component';
import {AdminGuard} from './service/admin.guard';
import {MatListModule} from '@angular/material/list';

import {MatDialogModule} from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from './admin-manage/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { ChangeRoleComponent } from './admin-manage/change-role/change-role.component';
import {MatSelectModule} from '@angular/material/select';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: 'user-account', component: UserAccountComponent, canActivate: [AuthGuard], data: { title: 'User-Account'}},
  { path: 'change-avatar', component: ChangeAvatarComponent, data: {title: 'Change-Avatar'}},
  { path: 'change-password', component: ChangePasswordComponent, data: {title: 'Change-Password'}},
  { path: 'change-profile', component: ChangeProfileComponent, canActivate: [AuthGuard],data: {title: 'Change-Profile'}},
  { path: 'page-user', component: PageUserComponent,canActivate: [AdminGuard], data: {title: 'Page-User'}},
  { path: 'change-role/:id', component: ChangeRoleComponent, data: {title: 'Change-Role'}}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, RegisterComponent, LoginComponent, UserAccountComponent, UploadAvatarComponent, UploadFileComponent, ChangeAvatarComponent, ChangePasswordComponent, ChangeProfileComponent, PageUserComponent, DialogContentExampleDialogComponent, ChangeRoleComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NavBarModule, FooterModule,
    NgxAudioPlayerModule,
    RouterModule.forRoot(appRoutes, {useHash: false}), MatFormFieldModule, ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), MatProgressSpinnerModule, MatProgressBarModule, MatPaginatorModule, MatListModule, MatDialogModule, MatSelectModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF, faTwitter, faLinkedinIn);
  }
}
