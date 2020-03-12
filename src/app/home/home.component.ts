import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import { faCarCrash } from '@fortawesome/free-solid-svg-icons'

@Component({ selector:'app-home',templateUrl:'home.component.html',styleUrls: ['./home.component.css'] })

export class HomeComponent implements OnInit, OnDestroy {
   
    currentUserSubscription: Subscription;

    faCar=faCar;
    faMotorcycle= faMotorcycle;
    faHome=faHome;
    faHeartbeat=faHeartbeat;
    faPlaneDeparture=faPlaneDeparture;
    faBell=faBell;
    faHeadset=faHeadset;
    faCarCrash=faCarCrash;
    constructor() {
       
    }

    ngOnInit() {
       
    }

    ngOnDestroy() {
        
    }

    

    
}