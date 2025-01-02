import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';
import { AuthServiceTest } from '../_services/auth.service';
import { AsyncPipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink, 
    MatSidenavModule, 
    MatListModule, 
    RouterOutlet, 
    FooterComponent,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private authService = inject(AuthServiceTest);
  router = inject(Router);
  
  isLoggedIn$ = this.authService.isLoggedIn$;
  isEmployer$ = this.authService.isEmployer$;

  currentUrl = signal('/');

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.url);
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
