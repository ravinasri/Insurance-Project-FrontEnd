import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PolicyType } from './policytype';
import { Router } from '@angular/router';

import { componentsservice } from './components.service';
import { AddPolicy } from './addpolicy';
import { PolicyPlan } from './policyplan';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  id:any;
  

  constructor(private formBuilder: FormBuilder,private componentsservice:componentsservice,private router:Router) { }

  policy_type:PolicyType[];
  policy_plan:PolicyPlan[];
  addpolicy:AddPolicy[];

  ngOnInit() {
    this.id=sessionStorage.getItem('key');
    this.createForm();
    this.componentsservice.getPolicyType()
    .subscribe(
      data => {
        this.policy_type = data;
        console.log("data"+this.policy_type);
      }
    );

    this.componentsservice.getPolicyPlan()
    .subscribe(
      data => {
        this.policy_plan = data;
        console.log("data"+this.policy_plan);
      }
    );
    
  }

  createForm() {
   
    this.formGroup = this.formBuilder.group({
      
      'policy_type': [null, Validators.required],
      
      'policy_plan': [null, Validators.required],
      
      'start_date': [null, Validators.required],

      'end_date':[null, Validators.required],

      'user_id':[null, Validators.required]
  
    
      
    });
  }
  onSubmit(post) {
    this.post = post;
  // alert(this.formGroup.get('registration_place').value);
  alert(this.formGroup.get('policy_plan').value);
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

        this.componentsservice.addPolicyDetails(post)
        .subscribe(
             data=>
             {
               data=JSON.stringify(data);
              this.addpolicy=data;
            }
        );

        this.router.navigateByUrl('/');
  }

}

