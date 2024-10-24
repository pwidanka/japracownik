import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FlexLayoutModule, MatIconModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {
  applications = [
    {
      title: 'Sekretarka',
      type: 'Praca biurowa',
      status: 'Pełen etat',
      salary: '15000-15200 PLN',
      location: 'Warszawa'
    },
    {
      title: 'Spawacz',
      type: 'Inne',
      status: '1/2 etatu',
      salary: '5000-5200 PLN',
      location: 'Gdańsk'
    },
    {
      title: 'Sekretarka',
      type: 'Praca biurowa',
      status: 'Pełen etat',
      salary: '15000-15200 PLN',
      location: 'Warszawa'
    },
    {
      title: 'Spawacz',
      type: 'Inne',
      status: '1/2 etatu',
      salary: '5000-5200 PLN',
      location: 'Gdańsk'
    },
    {
      title: 'Sekretarka',
      type: 'Praca biurowa',
      status: 'Pełen etat',
      salary: '15000-15200 PLN',
      location: 'Warszawa'
    },
    {
      title: 'Spawacz',
      type: 'Inne',
      status: '1/2 etatu',
      salary: '5000-5200 PLN',
      location: 'Gdańsk'
    },
    // inne aplikacje...
  ];

  constructor(private router: Router) {}
  
  viewApplicationDetails(title: string) {
    this.router.navigate(['/application-details']);
  }
}
