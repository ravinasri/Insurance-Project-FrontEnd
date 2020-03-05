import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


import { AddUsers } from './addusers';
import { UserName } from './username';
import { servicesservice } from './services.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css']
  })
export class ServicesComponent {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';


  constructor(private formBuilder: FormBuilder,private servicesservice:servicesservice,private router:Router) { }

  userdetails:AddUsers[];
  

  ngOnInit() {
    this.createForm();
    
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'username': [null, Validators.required],
      'dob':  [null, Validators.required],
      'address':[null, Validators.required],
      'phone_no':[null, Validators.required],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('username').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('username').setValidators(Validators.required);
        }
        this.formGroup.get('username').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('username') as FormControl
  }

 

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

 

  onSubmit(post) {
    this.post = post;
  // alert(this.formGroup.get('registration_place').value);
  alert(this.formGroup.get('email').value);
  //   var vehiclevalues=new AddVehicle();
  //      vehiclevalues.user_id=1;
  //   vehiclevalues.registration_number=90;
  //   vehiclevalues.chassis_number=98;
  //   vehiclevalues.engine_number=32;
  //  vehiclevalues.registration_place="ariyalur";
  //  vehiclevalues.manufacturing_year="2009";
  //  vehiclevalues.vehicle_model="volvo";
  //  vehiclevalues.seating_capacity=4;
  //  vehiclevalues.engine_capacity="1320 cc";
  //  vehiclevalues.vehicle_color="pink";

       this. servicesservice
       .addusers(post)
        .subscribe(
             data=>
             {
               data=JSON.stringify(data);
              this.userdetails=data;
            }
        );
        this.router.navigateByUrl('/helpers');
  }
 
}

