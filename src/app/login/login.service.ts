import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class loginservice {
    constructor(private http: HttpClient) { }


  
    getLogin(username,password): Observable<any> {
        
        let params= new HttpParams()
        .set('username',username)
        .set('password',password)
        return this.http.get("http://localhost:8080/vehicleinsurance/login",{params
    });
    }
   

}