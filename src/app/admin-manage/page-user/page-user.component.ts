import {Component, OnInit} from '@angular/core';
import {UserAccount} from '../../model/UserAccount';
import {AdminService} from '../../service/admin.service';

import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentExampleDialogComponent} from '../dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {

  ////
  totalElements: number = 0;
  users: UserAccount[] = [];
  loadDing: boolean;
  // admin: any = ["ADMIN"];
  // isCheckAdmin = false;
  deleteSuccess: any = {
    message: "yes"
  }
  status = '';

  constructor(private adminService: AdminService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // if(JSON.stringify(this.tokenService.getRoles())==JSON.stringify(this.admin)){
    //   this.isCheckAdmin = true;
    // }
    this.getListRequest({page: 0, size: 3})
  }

  private getListRequest(request) {
    this.loadDing = true;
    this.adminService.pageUser(request).subscribe(data => {
      console.log('data -->', data);
      this.users = data['content'];
      console.log('data[content] --->', data['content']);
      this.totalElements = data['totalElements']
      console.log('totalElements == ', data['totalElements']);
      this.loadDing = false;
    }, error => {
      this.loadDing = false;
    })
  }

  nextPage(event: PageEvent) {
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    console.log('request[size]', request['size']);
    this.getListRequest(request);
  }

  deleteUserById(id: number) {
    this.adminService.deleteUserById(id).subscribe(data => {
      if (JSON.stringify(this.deleteSuccess) == JSON.stringify(data)) {
        this.status = 'Delete success!'
        //Cach 1: Dung Reload()
        // window.location.reload();
        //Cach 2: Goi lai Page khong Reload()
        const request = {page: 0, size: 90}
        this.getListRequest(request);
      }
    })
  }
  ////

  openDialog(id) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // this.deleteUserById(id);
      if(result){
        this.deleteUserById(id);
      }
      console.log(`Dialog result ====>: ${result}`);
    });
  }
}


