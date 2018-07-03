import { Component } from '@angular/core';
import { NavController, App, AlertController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userDetails : any;
  responseData: any;
  dataSet : any; 

  userPostData = {
    "user_id":"",
    "token":"", 
    "feed":"",
    "feed_id":""
  };

  constructor(
    public commom: CommonProvider,
    public navCtrl: NavController, 
    public app: App, 
    public authService:AuthServiceProvider,
    public alertCtrl: AlertController) {
  	
    const data = JSON.parse(localStorage.getItem('userData'));
  	this.userDetails = data.userData;
  	this.userPostData.user_id = this.userDetails.user_id;
  	this.userPostData.token = this.userDetails.token;
    this.getFeed();
  }

  getFeed() {
    this.commom.presentLoading();
    this.authService.postData(this.userPostData, 'feed').then((result) => {
      this.responseData = result; 
        if(this.responseData.feedData) {
          this.commom.closeLoading();
          this.dataSet = this.responseData.feedData; 
          console.log(this.dataSet);
        } else {}
      }, (err) => {
        // connection failed message
      }); 
  }

  feedUpdate() {
    if(this.userPostData.feed){
      this.commom.presentLoading();
      this.authService.postData(this.userPostData, 'feedUpdate').then((result) => {
        this.responseData = result; 
        if(this.responseData.feedData) {
          this.commom.closeLoading();
          this.dataSet.unshift(this.responseData.feedData); 
          this.userPostData.feed = "";
        } else {
          console.log("No Access");
        }
      }, (err) => {
        // connection failed message
      }); 
    }
  }

  feedDelete(feed_id, msgIndex) {
    if(feed_id > 0){
     let alert = this.alertCtrl.create({
        title: 'Delete Post',
        message: 'Are you sure you delete this post?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              this.commom.presentLoading();
              this.userPostData.feed_id = feed_id;
              this.authService.postData(this.userPostData, 'feedDelete').then((result) => {
                this.responseData = result; 
                if(this.responseData.success) {
                  this.dataSet.splice(msgIndex, 1);
                  this.commom.closeLoading();
                } else {
                  console.log("No Access");
                }
              }, (err) => {
                // connection failed message
              }); 
            }
          }
        ]
      });
      alert.present();
    }
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date; 
  }

  backToWelcome(){
	  const root = this.app.getRootNav();
	  root.popToRoot();
  }

  logout() {
  	// Remove API token 
  	localStorage.clear();
  	// Go back to root
  	setTimeout(() => this.backToWelcome(), 1000);
  }

}
