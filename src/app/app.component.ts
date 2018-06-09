import { Component, ChangeDetectorRef, trigger, state, style, transition, animate} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatCardModule} from '@angular/material/card';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule, Routes, Router  } from '@angular/router'; 
import {MediaMatcher} from '@angular/cdk/layout';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { GroupsComponent } from './groups/groups.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  rootPage: any = HomeComponent;
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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  private _mobileQueryListener: () => void;
  
}
