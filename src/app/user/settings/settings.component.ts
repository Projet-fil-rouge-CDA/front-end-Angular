import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ValidationService} from "../../shared/services/validation.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  optionForm : any;

  constructor(
    private formBuilder : FormBuilder,
    private titleService: Title,
    private router : Router
  ) {
    this.optionForm = this.formBuilder.group({
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, ValidationService.phoneValidator]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      pseudo: ['', [Validators.required]],
      rue: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      ville: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Option utilisateur');
    // appel des informations de l'utilisateur dans la bdd (sauf mot de passe !)
  }

  optionUser(){
    console.log(this.optionForm.value);
    if(this.optionForm.value.password != null){
      if(this.optionForm.value.password == this.optionForm.value.confirmPassword){
        console.log("tout good");
      }
    }
    // envoie des données pour mise à jour dans le back. Il faut faire attention a la possible absence de champs de données. Il faut donc mettre a jour que les infos envoyés ET changeantes.
  }

  deleteAccount(){
    const result = window.confirm("Voulez-vous vraiment supprimer votre compte ?");
    if(result){
      // delete de l'utilisateur (information perso + adresse + favoris + cookie)
      console.log("supprimé !");
    }
  }
}
