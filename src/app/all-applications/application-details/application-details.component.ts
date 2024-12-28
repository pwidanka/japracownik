import { Component, inject, OnInit } from '@angular/core';
import { ApplicationDetailsDescribeComponent } from './application-details-describe/application-details-describe.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationDetailsDataComponent } from './application-details-data/application-details-data.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../_services/firebase.service';
import { AuthServiceTest } from '../../_services/auth.service';
import { AsyncPipe } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { from, Observable, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [ApplicationDetailsDescribeComponent, ApplicationDetailsDataComponent, FlexLayoutModule, AsyncPipe, NgxSkeletonLoaderModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent implements OnInit {
  announcement: any;
  canViewApplications$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthServiceTest
  ) { 
    this.canViewApplications$ = this.authService.isLoggedIn$.pipe(
      switchMap((isLoggedIn: boolean) => {
        if (!isLoggedIn) return of(false);
        const currentUser = this.authService.getCurrentUser();
        console.log(currentUser);
        return from(this.firebaseService.isApprovedEmployer(currentUser?.uid || ''));
      })
    );
  }

  ngOnInit(): void {
    this.canViewApplications$.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.firebaseService.getAnnouncementById(
          this.route.snapshot.paramMap.get('id') || ''
        ).subscribe(data => {
          this.announcement = data;
          console.log(this.announcement);
        });
      }
    });
  }
}
