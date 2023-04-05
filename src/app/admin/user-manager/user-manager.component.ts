import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AdminService} from "../admin.service";
import {UserManagerModel} from "../../shared/models/user-manager.model";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

    users : UserManagerModel[] = [];
    filteredUsers : UserManagerModel[] = [];
    isEditing: boolean[];
    pageNumber : number = 1;
    maxPageSize : number = 10;

  constructor(
      private titleService : Title,
      private adminService : AdminService
  ) { }

  ngOnInit(): void {
      this.titleService.setTitle('Univ\'Air | Gestionnaire d\'utilisateur')
      this.adminService.getAllUser().subscribe(res =>{
          this.users = res;
          this.filteredUsers = this.users;
          this.isEditing = Array(this.users.length).fill(false);
          this.users.forEach(user => {
              user.isModerateur = user.roles.includes('MODERATEUR');
          })
      })
  }

    editUser(user: UserManagerModel) {
        user.editing = true;
    }

    updateUser(user: UserManagerModel, isModerateur: boolean) {
        user.editing = false;
        if(!isModerateur && user.roles.includes('MODERATEUR')){
            const index = user.roles.indexOf('MODERATEUR');
            user.roles.splice(index,1);
        }
        if(isModerateur && !user.roles.includes('MODERATEUR')){
            user.roles.push('MODERATEUR');
        }
        this.adminService.updateUser(user)
    }
    desactivate(user: UserManagerModel){
      user.actif = !user.actif;
      this.adminService.updateUser(user)
    }

    getUsersForPage(pageNumber : number) : UserManagerModel[]{
      const startIndex = (pageNumber-1)* this.maxPageSize;
      const endIndex = startIndex + this.maxPageSize;
      return this.filteredUsers.slice(startIndex, endIndex);
    }

    getPageNumbers() : number[]{
      const pageCount = Math.ceil(this.filteredUsers.length / this.maxPageSize);
        const pageNumbers = [];
        for(let i = 1; i <= pageCount; i++){
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    goToPage(pageNumber : number) : void{
      this.pageNumber = pageNumber;
    }

    onSearchValueChange(event : any) {
        const searchValue = event?.target?.value
        if(!searchValue.trim()){
            this.filteredUsers = this.users;
        } else {
            this.filteredUsers = this.users.filter(
                (user) => {
                    return (
                        user.prenom.toLowerCase().includes(searchValue.toLowerCase()) ||
                        user.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                        user.pseudo.toLowerCase().includes(searchValue.toLowerCase())
                    );
                }
            )
        }
        this.pageNumber = 1;
    }
}
