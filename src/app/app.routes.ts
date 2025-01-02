import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { ApplicationDetailsComponent } from './all-applications/application-details/application-details.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './_guards/auth.guard';
import { TermsComponent } from './footer/terms/terms.component';
import { PrivacyPolicyComponent } from './footer/privacy-policy/privacy-policy.component';
import { CookiesComponent } from './footer/cookies/cookies.component';
import { CustomerPanelComponent } from './customer-panel/customer-panel.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { 
        path: '', 
        component: HomeComponent,
        // canActivate: [authGuard]
    },
    { 
        path: 'applications', 
        component: AllApplicationsComponent,
        // canActivate: [authGuard]
    },
    { 
        path: 'application-details/:id', 
        component: ApplicationDetailsComponent,
        // canActivate: [authGuard]
    },
    { 
        path: 'about-us', 
        component: AboutUsComponent,
        // canActivate: [authGuard]
    },
    { 
        path: 'contact', 
        component: ContactComponent,
        // canActivate: [authGuard]
    },
    { 
        path: 'add-application', 
        component: AddApplicationComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'edit-application', 
        component: AddApplicationComponent,
        canActivate: [authGuard]
    },
    {
        path: 'customer-panel',
        component: CustomerPanelComponent,
        canActivate: [authGuard]    
    },
    {
        path: 'terms',
        component: TermsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: 'cookies',
        component: CookiesComponent
    },
    { path: '**', redirectTo: 'login' }
];
