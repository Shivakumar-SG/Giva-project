import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  cutomerList!: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    roles: new FormControl(''),
    disabled: new FormControl('')
  });

  getCustomers() {
    this.cutomerList = this.firebase.list('customers');
    return this.cutomerList.snapshotChanges();
  }

  insertCustomer(customer) {
    this.cutomerList.push({
      fullName: customer.fullName,
      email: customer.email,
      roles: customer.roles,
      disabled: customer.disabled
    });
  }
}