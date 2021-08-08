import {Component, NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  currentYear: Number = new Date().getFullYear();
}


@NgModule({
  exports: [Footer],
  declarations: [Footer],
  imports: [
    MatIconModule
  ]
})
export class FooterModule {}
