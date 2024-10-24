import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FaqComponent, FlexLayoutModule, MatIconModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
