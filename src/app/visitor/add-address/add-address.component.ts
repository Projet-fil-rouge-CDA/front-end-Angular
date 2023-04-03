import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models/users';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit{

  addAddressForm: any;

  user : Users

  constructor(
    private logsService: AuthService,
    private formBuilder: FormBuilder,
    private router : Router,
    private titleService : Title
  ) {
    this.addAddressForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.titleService.setTitle('Univ\'Air | Ajout d\'adresse');
    this.logsService.users$.subscribe(data => this.user = data)
  }

  addAddress() {
    if (this.addAddressForm.dirty && this.addAddressForm.valid) {
      this.user.address = {rue: this.addAddressForm.value.street, codePostal: this.addAddressForm.value.zipCode, ville: this.addAddressForm.value.city}
      this.logsService.register(this.user)
    }
  }
}
