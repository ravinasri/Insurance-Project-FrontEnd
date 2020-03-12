import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddUsers } from './addusers';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class servicesservice {
    constructor(private http: HttpClient) { }

    addusers(uservalues: AddUsers): Observable<any> {
        return this.http.post("http://localhost:8080/vehicleinsurance/user", uservalues).pipe(map(employee => {
            return employee;
        }))
    }


}