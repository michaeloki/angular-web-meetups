
import { Component, OnInit, ChangeDetectorRef,  trigger, state, style, transition, animate} from '@angular/core';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatCardModule} from '@angular/material/card';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule, Routes, Router  } from '@angular/router'; 
import { TranslateService } from '@ngx-translate/core';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  title = 'Meetups';
  homepage: any;
  nextEvent: any;
  categoryName: any;
  numberOfEvents: string;

  constructor(translate: TranslateService,private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    let defLng = 'en';
    translate.setDefaultLang(defLng);
    translate.use(defLng);
    translate.get('HOMEPAGE_TITLE').subscribe((res: string) => {
      this.homepage = res;
    });
    if (localStorage.getItem('categoryName') === null) {
      this.categoryName = "Current Category: None";
    } else {
      this.categoryName = "Current Category: " + localStorage.getItem('categoryName');
    }
    if (localStorage.getItem('numberOfEvents') !== null) {
      this.numberOfEvents = "Number of events: " + localStorage.getItem('numberOfEvents');
    } else {
      this.numberOfEvents = "Number of events: 0"
    }

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openSettings() {
    this.router.navigate(['settings']);
  }

  openGroup() {
    this.router.navigate(['groups']);
  }

  openAbout() {
    this.router.navigate(['about']);
  }
  
  private _mobileQueryListener: () => void;

}
