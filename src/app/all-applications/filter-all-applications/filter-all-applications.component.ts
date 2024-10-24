import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter-all-applications',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSliderModule, MatCheckboxModule, MatExpansionModule, MatInputModule],
  templateUrl: './filter-all-applications.component.html',
  styleUrl: './filter-all-applications.component.scss'
})
export class FilterAllApplicationsComponent {

}
