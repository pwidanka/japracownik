import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadApplications();
  }

  async loadApplications() {
    const db = getFirestore();
    const applicationsCollection = collection(db, 'announcements');
    const querySnapshot = await getDocs(applicationsCollection);
    console.log(querySnapshot);
    this.applications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(this.applications);
  }
  
  viewApplicationDetails() {
    this.router.navigate(['/application-details']);
  }
}
