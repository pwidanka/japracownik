import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';
import { AuthServiceTest } from '../_services/auth.service';
import { AsyncPipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

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
  private router = inject(Router);
  
  isLoggedIn$ = this.authService.isLoggedIn$;

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
