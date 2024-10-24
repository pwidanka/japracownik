import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { ApplicationDetailsComponent } from './all-applications/application-details/application-details.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { AddApplicationComponent } from './add-application/add-application.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'applications', component: AllApplicationsComponent},
    { path: 'application-details', component: ApplicationDetailsComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'add-application', component: AddApplicationComponent},
];
