import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdsAnnouncementService {
  private Announcement: string[];
  constructor() {
    this.Announcement = [
      'Big Discounts',
      'free Shoping',
      'Check online Web Developer',
      'Check online Web ',
    ];
  }

  getScheduledAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((sequenceObserver) => {
      let counter = 0;
      let timeoutId = setInterval(() => {
        if (counter == this.Announcement.length) {
          sequenceObserver.complete();
        }
        sequenceObserver.next(this.Announcement[counter]);
        counter++;
      }, intervalInSeconds * 1000);

      return {
        unsubscribe() {
          clearInterval(timeoutId);

          console.log('Unsubscribe...');
        },
      };
    });
  }
}
