import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class CommonProvider {
  public loader: any;
  
  constructor(public loadingCtrl: LoadingController) {}

  presentLoading() {
  	this.loader = this.loadingCtrl.create({content: "Please wait..."})
  	this.loader.present();
  }

  closeLoading() {
  	this.loader.dismiss();
  }

}
