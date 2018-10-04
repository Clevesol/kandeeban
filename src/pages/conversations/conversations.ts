import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ConversationDetailsPage } from '../conversation-details/conversation-details';

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


  private test:string[] = [] ;

  private conversationDetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalController:ModalController) {
    
    
   
    
   
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


  showConverstaionDetails(){
    this.conversationDetailsPage = this.modalController.create(ConversationDetailsPage, {conversationId : '1'}, {cssClass : 'conversationDetailsModal'});
    this.conversationDetailsPage.present();
  }

}
