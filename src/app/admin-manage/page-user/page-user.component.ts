import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../model/UserAccount';
import {AdminService} from '../../service/admin.service';
import {TokenService} from '../../service/token.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  totalElements: number = 0;
  users: UserAccount[] = [];
  loadDing: boolean;
  // admin: any = ["ADMIN"];
  // isCheckAdmin = false;
  constructor(private adminService: AdminService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    // if(JSON.stringify(this.tokenService.getRoles())==JSON.stringify(this.admin)){
    //   this.isCheckAdmin = true;
    // }
    this.getListRequest({page: 0, size: 3})
  }
  private getListRequest(request) {
    this.loadDing = true;
    this.adminService.pageUser(request).subscribe(data =>{
      console.log('data -->',data);
      this.users = data['content'];
      console.log('data[content] --->' , data['content']);
      this.totalElements = data['totalElements']
      console.log('totalElements == ', data['totalElements']);
      this.loadDing = false;
    }, error => {
      this.loadDing = false;
    })
  }
  nextPage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    console.log('request[size]', request['size']);
    this.getListRequest(request);
  }
}
