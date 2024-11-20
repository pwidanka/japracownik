import { Component, OnInit } from '@angular/core';
import { ApplicationDetailsDescribeComponent } from './application-details-describe/application-details-describe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationDetailsDataComponent } from './application-details-data/application-details-data.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../_services/firebase.service';


@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [ApplicationDetailsDescribeComponent, ApplicationDetailsDataComponent, FlexLayoutModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent implements OnInit {
  announcement: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.firebaseService.getAnnouncementById(
      this.route.snapshot.paramMap.get('id') || ''
    ).subscribe(data => {
      this.announcement = data;
      console.log(this.announcement);
    });
  }
}
