import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdminService} from "../admin.service";
import {UserManagerModel} from "../../shared/models/user-manager.model";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

    users : UserManagerModel[];
    isEditing: boolean[];

  constructor(
      private titleService : Title,
      private adminService : AdminService
  ) { }

  ngOnInit(): void {
      this.titleService.setTitle('Univ\'Air | Gestionnaire d\'utilisateur')
      this.adminService.getAllUser().subscribe(res =>{
          this.users = res;
          this.isEditing = Array(this.users.length).fill(false);
      })
  }



    editUser(user: UserManagerModel) {
        user.editing = true;
    }

    updateUser(user: UserManagerModel) {
        user.editing = false;
        this.adminService.updateUser(user)
        //this.userService.updateUser(user).subscribe();
    }
    desactivate(user: UserManagerModel){
      user.actif = !user.actif;
      this.adminService.updateUser(user)
    }

}
