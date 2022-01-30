import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsAnnouncementService } from 'src/app/services/ads-announcement.service';
import { filter, map, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private Subscriptions: Subscription[] = [];
  nextAnnounce: string[] = [];
  displayAnnounce: string[] = [];
  constructor(private anounce: AdsAnnouncementService) {}

  ngOnDestroy(): void {
    for (let subscription of this.Subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    let observer = {
      next: (data: string) => {
        this.nextAnnounce.push(data);
      },
      complete: () => {},
    };
    this.anounce.getScheduledAds(2).subscribe(observer);
  }
}
