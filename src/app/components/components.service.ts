import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolicyType } from './policytype';
import { map } from 'rxjs/operators';
import { AddPolicy } from './addpolicy';

@Injectable({ providedIn: 'root' })
export class componentsservice {
    constructor(private http: HttpClient) { }
  
    getPolicyType():Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/policy/getType");
    }

    getPolicyPlan():Observable<any> {
        return this.http.get("http://localhost:8080/vehicleinsurance/policy/getPlan");
    }
   

    addPolicyDetails(policyvalues:AddPolicy):Observable<any> {
        return this.http.post("http://localhost:8080/vehicleinsurance/policy",policyvalues).pipe(map(employee => {
            return employee;
            }))
    }

    
}