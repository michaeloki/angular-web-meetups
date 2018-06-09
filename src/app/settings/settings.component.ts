import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WebserviceService } from '../webservice.service';
import { MessageserviceService } from '../messageservice.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule, Routes, Router  } from '@angular/router'; 
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private categoryList = [];
  mobileQuery: MediaQueryList;
  savedMessage:any;
  contentHidden:boolean = true;

  constructor(private service: WebserviceService,translate: TranslateService,private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    let defLng = 'en';
    translate.setDefaultLang(defLng);
    translate.use(defLng); 
  translate.get('SAVED_MESSAGE').subscribe((res: string) => {
    this.savedMessage = res;
  });

  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getCategories();
  }

  ngDoCheck() {
    if(this.service.Categories.length!==0 && this.categoryList.length===0) {
      this.categoryList = this.service.Categories;
      this.contentHidden = false;
    }
  }

  getCategories() {
    this.service.checkOperation('categories');
  }

  setCategory($event,myItem) {
    localStorage.setItem('category',myItem.id);
    localStorage.setItem('categoryName',myItem.name);
    this.service.ToastControl(this.savedMessage);
    this.service.getMyMeetUp(localStorage.getItem('category'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openHome() {
    this.router.navigate(['home']);
  }

  openGroup() {
    this.router.navigate(['groups']);
  }

  openAbout() {
    this.router.navigate(['about']);
  }
  
  private _mobileQueryListener: () => void;
}
