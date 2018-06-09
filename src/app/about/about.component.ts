import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router'; 
import {MediaMatcher} from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  constructor(private router: Router,translate: TranslateService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 

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

  openHome() {
    this.router.navigate(['home']);
  }

  private _mobileQueryListener: () => void;
}
