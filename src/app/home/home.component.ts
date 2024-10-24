import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ApplicationsComponent } from '../applications/applications.component';
import { HrComponent } from '../hr/hr.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent, CategoriesComponent, ApplicationsComponent, HrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  

  ngOnInit(): void {

  }
}
