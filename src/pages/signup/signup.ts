import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};

  constructor(public navCtrl: NavController, public authService:AuthServiceProvider, private toastCtrl:ToastController) {
  }

  signup() {
    if(this.userData.username && this.userData.password && this.userData.email && this.userData.name){
      //Api connections
      this.authService.postData(this.userData, "signup").then((result) =>{
        this.responseData = result;
        if(this.responseData.userData){
          console.log(this.responseData);
          localStorage.setItem('userData', JSON.stringify(this.responseData) )
          this.navCtrl.push(TabsPage);
        } else {
           this.presentToast("Please enter valid email, username and password");
        }
      }, (err) => {
        //Connection failed message
      });  
    } else {
      this.presentToast("Please enter valid information.");
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  login() {
  	//Login page link
  	this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
