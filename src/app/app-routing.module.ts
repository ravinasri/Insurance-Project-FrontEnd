import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './helpers';
import { ModelsComponent } from './models/models.component';
import { ServicesComponent } from './services/services.component';
import { HelpersComponent } from './helpers/helpers.component';
import { ComponentsComponent } from './components/components.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // {path: '', redirectTo: '/login', pathMatch:'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'models',component:ModelsComponent},
    {path:'services',component:ServicesComponent},
    {path:'helpers',component:HelpersComponent},
    {path:'components',component:ComponentsComponent},
  
    {path: '**', component: PagenotfoundComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
