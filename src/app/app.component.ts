import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FirebaseService } from './_services/firebase.service';
import { AuthServiceTest } from './_services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'japracownik';
  firebaseService = inject(FirebaseService);
  authService = inject(AuthServiceTest);
  router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['']);
    // this.authService.login('przemyslaw.widanka@gmail.com','123456789').subscribe(el => {
    //   console.log(el)
    //   this.firebaseService.getAnnouncements().subscribe(el2 => {
    //     console.log(el2);
    //   })
    // });

    // this.authService.register('test@test.com', '123456789');
  }
}
