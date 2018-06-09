import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material';
import { Subscription } from 'rxjs';
import { MessageserviceService } from './messageservice.service';
import { TranslateService } from '@ngx-translate/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class WebserviceService {
  public meetAPIBridge = "https://fathomless-journey-52976.herokuapp.com"
 
  operation:string;
  text: string;
  offline_message:string;
  emptyMessage:string;
  chooseCat:string;
  getmeets:string;
  getcats:string;
  loading: any;
  numOfEvents:any;
  public  Categories = [];
  public Meetups = [];
  
  constructor(private messageService: MessageserviceService,
    public http: Http,translate: TranslateService,public snackBar: MatSnackBar) {
      let defLng = 'en';
      translate.setDefaultLang(defLng);
      translate.use(defLng); 
           
    translate.get('GETTING_MEETUPS').subscribe((res: string) => {
      this.getmeets = res;
    });
     translate.get('GETTING_CATEGORIES').subscribe((res: string) => {
      this.getcats = res;
    });
       translate.get('CHOOSE_CATEGORY').subscribe((res: string) => {
      this.chooseCat = res;
    });
       translate.get('EMPTY_MESSAGE').subscribe((res: string) => {
      this.emptyMessage = res;
    });
    translate.get('OFFLINE').subscribe((res: string) => {
      this.offline_message = res;
    });
     }
     
     public ToastControl(body) {
       this.snackBar.open(body, '', {
        duration: 3000
      });
     }

     public checkOperation(operation) {

        if (operation === 'categories') {
          this.getCategoryNames();
        }
  
        if (operation === 'meetups') {
          if (localStorage.getItem('category') !==null) {
            this.getMyMeetUp(localStorage.getItem('category'));
          } else {
            this.ToastControl(this.chooseCat);
          }
          
        }
       
    }



     public getCategoryNames() {
      let jsonData = { "operation": "check" };
      let body = JSON.stringify(jsonData);
      this.http.post(this.meetAPIBridge + "/getCategories",
        body)
        .subscribe(data => {
          try {
           
             if(data.json().data !==undefined && data.json().data !==''){
            let myCategories = data.json().data;
            myCategories.forEach(element => {
                this.Categories.push({ 'name': element.name ,'id':element.id});
             })
            } else {
              this.ToastControl(this.emptyMessage);
            }
          } catch (err) {
            console.log('service error ', err);
          }
        })
    }
  
    public getMyMeetUp(categoryId) {
      let jsonData = { "category":categoryId };
      let body = JSON.stringify(jsonData);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.meetAPIBridge + "/getMeetups",
        body,options)
        .subscribe(data => {
          try {      
             if(data.json().data !==undefined && data.json().data !==''){
            let myMeetups = data.json().data;
            
            this.Meetups =[];
            myMeetups.forEach(element => {
              if(element.city==="Johannesburg"){
                this.Meetups.push({ 'name': element.name,'url':element.link, 'org':element.organizer.name,
              'pic':element.organizer.photo.photo_link,'group_pic':element.meta_category.photo.photo_link,
            'join_mode':element.join_mode });
              }
             })
             this.numOfEvents = this.Meetups.length;
             localStorage.setItem("numberOfEvents",this.numOfEvents);
             this.messageService.broadcast('meetups', this.Meetups);
            } else {
              this.ToastControl(this.emptyMessage);
            }
          } catch (err) {
            console.log('service error ', err);
          }
        })
    }
}
