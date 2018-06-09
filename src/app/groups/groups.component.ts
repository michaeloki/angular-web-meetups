import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WebserviceService } from '../webservice.service';
import { TranslateService } from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';

import { MessageserviceService } from '../messageservice.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterModule, Routes, Router  } from '@angular/router'; 
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  meetUpList = [];
  categoryName:string;
  private subscription: Subscription;
  contentHidden:boolean = true;
  mobileQuery: MediaQueryList;
  
  constructor(private service: WebserviceService,translate: TranslateService,
    private messageService: MessageserviceService, private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.showMyMeetups();
      
    this.categoryName = localStorage.getItem('categoryName');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    this.subscription = this.messageService.subscribe('meetups', (payload) => {
      if (payload !== '') {
        if(this.meetUpList.length === 0){
          this.meetUpList = payload;
          this.subscription.unsubscribe();
          sessionStorage.setItem('categoryName',localStorage.getItem('categoryName'));
          
        } 
        if(this.meetUpList.length!==0 ) {
         
          if((parseInt(localStorage.getItem('numberOfEvents')) !== this.meetUpList.length) ||
           localStorage.getItem('categoryName') !==sessionStorage.getItem('categoryName') ){
            this.meetUpList = payload;
            this.subscription.unsubscribe();
          }
        }
        this.contentHidden=false;
      }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showMyMeetups() {
    this.service.checkOperation('meetups');
  }

  openSettings() {
    this.router.navigate(['settings']);
  }

  openAbout() {
    this.router.navigate(['about']);
  }

  openHome() {
    this.router.navigate(['home']);
  }

  private _mobileQueryListener: () => void;
}
