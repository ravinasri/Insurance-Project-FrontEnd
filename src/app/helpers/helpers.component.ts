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
import { VehicleSubModel } from './vehiclesubmodel';
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
  vehicle_submodels:String;
  selectFormControl = new FormControl('', Validators.required);
  toppings = new FormControl('', Validators.required);

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  id: any;

  constructor(private formBuilder: FormBuilder, private helperservice: helperservice, private router: Router) { }
  vehicle_color: VehicleColor[];
  lstcomments: VehicleModel[];
  vehicle_submodel:VehicleSubModel[];
  registration_place: Place[];
  manufacturing_year: Year[];
  vehicledetails: AddVehicle[];
  engine_capacity: EngineCapacity[];
  seating_capacity: SeatingCapacity[];



  ngOnInit() {

    this.id = sessionStorage.getItem('key');

    console.log(this.id);

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
          console.log("data" + this.lstcomments);
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
      'vehicle_submodel': [null, [Validators.required]],
      'registration_place': [null, [Validators.required]],

      'user_id': [null, [Validators.required]],
      'vehicle_color': [null, [Validators.required]],
      'seating_capacity': [null, [Validators.required]],

      'idv': [null, [Validators.required]],
      'validate': '',
      'selectFormControl': new FormControl(['', [Validators.required]]),

      // 'registration_place': new FormControl(['', [Validators.required]]),
      'toppings': new FormControl(['', [Validators.required]]),
      'manufacturing_year': [null, [Validators.required]],
      'engine_capacity': [null, [Validators.required]]

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

  onSelect(event)
  {
    // alert(this.formGroup.get('vehicle_model').value);

    this.vehicle_submodels=this.formGroup.get('vehicle_model').value;
    this.helperservice.getVehicleSubModel(this.vehicle_submodels)
    .subscribe(
      data => {
        this.vehicle_submodel = data;
        
        console.log("data" + this.vehicle_submodel);
      }
    );
  }
  onSubmit(post) {

    this.post = post;

    //   var vehiclevalues=new AddVehicle();
    //      vehiclevalues.user_id=1;

    this.helperservice.addVehicleDetails(post)
      .subscribe(
        data => {
          data = JSON.stringify(data);
          this.vehicledetails = data;
        }
      );

    this.router.navigateByUrl('/components');
  }

}