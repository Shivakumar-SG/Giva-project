import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../shared/customer.service";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public customerService: CustomerService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.customerService.form.controls;

  ngOnInit(): void{
    this.onSubmit();
  }

  onSubmit() {
    this.submitted = true;
    if(this.customerService.form.valid){
      //   //insert
      if (this.customerService.form.get('$key').value == null) 
        this.customerService.insertCustomer(this.customerService.form.value);
      else
        this.customerService.updateCustomer(this.customerService.form.value);
      
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 1000);
      this.submitted = false;
      this.customerService.form.reset();
      //this is to be done for proper reset operation
      this.customerService.form.setValue({
        $key: null,
        fullName: '',
        email: '',
        roles: '',
        disabled: ''
      });
    }
  }

}
