import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { helperservice } from './helper.service';
import { Place } from './place';
import { VehicleColor } from './vehiclecolor';
import { VehicleModel } from './vehiclemodel';
import { AddVehicle } from './addvehicle';
import { Year } from './year';
import { EngineCapacity } from './enginecapacity';
import { SeatingCapacity } from './seatingcapacity';
import { Router } from '@angular/router';
// import { AddVehicle } from './addvehicle';
// import { VehicleModel } from './vehiclemodel';
// import { VehicleColor } from './vehiclecolor';
// import { Place } from './Place';

interface Pokemon {
  value: string;
  viewValue: string;
}
interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}
@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.css'],

})

export class HelpersComponent {

  // registration_place = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  toppings = new FormControl('', Validators.required);


  toppingList: string[] = ['1000 cc ', '2000 cc', '1500 cc To 2000 cc', '2000 cc To 3000 cc', '3000cc To 4000cc ', '4000cc To 5000cc', '5000cc To 6000cc', '1200cc', '6592cc', '6599 cc', '2,000-horsepower'];

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(private formBuilder: FormBuilder, private helperservice: helperservice,private router:Router) { }
   vehicle_color:VehicleColor[];
   lstcomments:VehicleModel[];
   registration_place: Place[];
   manufacturing_year:Year[];


   vehicledetails:AddVehicle[];
   engine_capacity:EngineCapacity[];
   seating_capacity:SeatingCapacity[];
   

  ngOnInit() {
    this.createForm();

    this.helperservice.getRegPlaces()
      .subscribe(
        data => {
          this.registration_place = data;
          console.log(this.registration_place);
        }
      );

      this.helperservice.getCapacity()
      .subscribe(
        data => {
          this.engine_capacity = data;
          console.log(data);
         
        }
      );

      this.helperservice.getSeatingCapacity()
      .subscribe(
        data => {
          this.seating_capacity = data;
          console.log(data);
         
        }
      );
      

      this.helperservice.getYear()
      .subscribe(
        data => {
          this.manufacturing_year = data;
        }
      );

    this.helperservice.getVehicleModel()
      .subscribe(
        data => {
          this.lstcomments = data;
          console.log("data"+this.lstcomments);
        }
      );

    this.helperservice.getVehicleColor()
      .subscribe(
        data => {
          this.vehicle_color = data;
        }
      );
  }
           
  // ngOnInit() {

  //   // this.setChangeValidate()
  // }

  createForm() {
    let registration_numberregex: RegExp = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    let chassis_numberregex: RegExp = /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/
    let engine_numberregex: RegExp = /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/
    this.formGroup = this.formBuilder.group({
      'registration_number': [null, [Validators.required, Validators.pattern(registration_numberregex)], this.checkInUseEmail],
      'chassis_number': [null, [Validators.required, Validators.pattern(chassis_numberregex)]],
      'engine_number': [null, [Validators.required, Validators.pattern(engine_numberregex)]],

      'vehicle_model': [null, [Validators.required]],
      'registration_place':[null, [Validators.required]],
      
      'id': [null, [Validators.required]],
      'vehicle_color': [null, [Validators.required]],
      'seating_capacity': [null, [Validators.required]],
      
      'idv': [null, [Validators.required]],
      'validate': '',
      'selectFormControl': new FormControl(['', [Validators.required]]),
     
      // 'registration_place': new FormControl(['', [Validators.required]]),
      'toppings': new FormControl(['', [Validators.required]]),
      'manufacturing_year':[null, [Validators.required]],
      'engine_capacity':[null, [Validators.required]]

    });
  }


  getErrorRegister_number() {
    return this.formGroup.get('registration_number').hasError('required') ? 'Field is required' :
      this.formGroup.get('registration_number').hasError('pattern') ? 'Invalid Format!' :
        this.formGroup.get('registration_number').hasError('alreadyInUse') ? 'This Number is already in use' : '';
  }


  getErrorChassis_number() {
    return this.formGroup.get('chassis_number').hasError('required') ? 'Field is required' :
      this.formGroup.get('chassis_number').hasError('pattern') ? 'Invalid Format!' :
        this.formGroup.get('chassis_number').hasError('alreadyInUse') ? 'This Number is already in use' : '';
  }
  getErrorEngine_number() {
    return this.formGroup.get('engine_number').hasError('required') ? 'Field is required' :
      this.formGroup.get('engine_number').hasError('pattern') ? 'Invalid Format!' :
        this.formGroup.get('engine_number').hasError('alreadyInUse') ? 'This Number is already in use' : '';
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


  onSubmit(post) {
    this.post = post;
  // alert(this.formGroup.get('registration_place').value);
  alert(this.formGroup.get('seating_capacity').value);
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

        this.helperservice.addVehicleDetails(post)
        .subscribe(
             data=>
             {
               data=JSON.stringify(data);
              this.vehicledetails=data;
            }
        );

        this.router.navigateByUrl('/components');
  }

}