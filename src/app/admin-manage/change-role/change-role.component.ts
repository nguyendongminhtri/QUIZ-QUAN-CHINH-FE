import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../service/admin.service';
import {UserAccount} from '../../model/UserAccount';


@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {
  success: any = {
    message: "yes"
  }
  user: UserAccount;
  // role = ["admin", "pm", "user"]
  form: any = {};
  role1: any = [{id:3, name:"ADMIN"}]
  role2: any = [{id:2, name:"PM"}]
  role3: any = [{id:1, name:"USER"}]
  isCheckRoleAdmin = false;
  isCheckRolePM = false;
  isCheckRoleUser = false;
  constructor(private routes: ActivatedRoute,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(userId=>{
      const id = +userId.get('id');
      console.log('id = ', id);
      this.adminService.getUserById(id).subscribe(result=>{
        this.user = result;
        console.log('name role -->', this.user.roles);
        if(JSON.stringify(this.user.roles)==JSON.stringify(this.role1)){
          this.isCheckRoleAdmin = true;
        }
        if(JSON.stringify(this.user.roles)==JSON.stringify(this.role2)){
          this.isCheckRolePM = true;
        }
        if(JSON.stringify(this.user.roles)==JSON.stringify(this.role3)){
          this.isCheckRoleUser = true;
        }
      }, error => {
        this.user = null;
      })
    })
  }
  onChangeRole(){
    console.log('form -->',this.form);
    this.adminService.changeRoleUser(this.user.id,this.form).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        alert('Change Role User Success');
        window.location.reload();
      }
    })
  }
}
