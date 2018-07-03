import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, private toastCtrl:ToastController) {
  }

  login() {
    if(this.userData.username && this.userData.password) {
      this.authService.postData(this.userData, "login").then((result) =>{
        this.resposeData = result;
        if(this.resposeData.userData){
          localStorage.setItem('userData', JSON.stringify(this.resposeData))
          this.navCtrl.push(TabsPage);
        } else {
          this.presentToast("Please give valid username and password");
        }
      }, (err) => {
        //Connection failed message
      });
    } else {
      this.presentToast("Give username and password");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
