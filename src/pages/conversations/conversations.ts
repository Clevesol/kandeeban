import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConversationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversations',
  templateUrl: 'conversations.html',
})
export class ConversationsPage {


  test:[] ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.test = [];
    
    for (let index = 0; index < 100; index++) {
      let gro:any = {};
      gro.title = "test group " + index;
      gro.memeberCount = Math.floor(Math.random() * 500);
       this.test.push(gro);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationsPage');
  }

}
