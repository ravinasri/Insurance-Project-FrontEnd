import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddVehicle } from './addvehicle';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class helperservice {
    constructor(private http: HttpClient) { }


    getVehicleModel(): Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getModels");
    }

    getVehicleSubModel(vehicle_submodels): Observable<any> {
        
        let params1= new HttpParams().set('vehicle_model',vehicle_submodels)
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getSubModel/",{params:params1});
    }

    getRegPlaces(): Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getPlace");
        
    }

    getVehicleColor(): Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getColors");
    }

    getYear(): Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getYear");
    }

    getCapacity(): Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getCC");
    }

    getSeatingCapacity(): Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/vehicle/getSeatCapacity");
    }



    addVehicleDetails(vehiclevalues: AddVehicle): Observable<any> {
        return this.http.post("http://localhost:8080/vehicleinsurance/vehicle/add", vehiclevalues).pipe(map(employee => {
            return employee;
        }))
    }


}