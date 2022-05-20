import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/shared/models/users';
import { LogsService } from 'src/app/shared/services/logs.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit{

  addAddressForm: any;
  users$: BehaviorSubject<Users[]> = this.logsService.users$

  constructor(
    private logsService: LogsService,
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
  }

  addAddress() {
    if (this.addAddressForm.dirty && this.addAddressForm.valid) {
      this.logsService.login(this.addAddressForm.value)
      this.router.navigate(['/user'])
    }
  }
}
