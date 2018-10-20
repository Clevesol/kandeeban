import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { TemplatesManagerProvider } from '../../providers/templates-manager/templates-manager';
import { TemplatesPage } from '../templates/templates';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import {Storage} from '@ionic/storage';
import { PreferenceProvider } from '../../providers/preference/preference';

/**
 * Generated class for the PreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {


  
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private model:ModalController,
     private converCore:ConverstationCoreProvider,
     private alert:AlertController,
     private storage:Storage,
     private preference:PreferenceProvider
     ) {

      this.preference.getPreference_los().then(function(data){
        this.syncOnStart = data ? true : false;
      }.bind(this));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencesPage');
  }

  showTemplates(){
    let tmplModel = this.model.create(TemplatesPage,{show:1},{});
    tmplModel.present();
  }

  clearConversations(){
    this.alert.create({title:'Clear Conversations ?', message: 'clear conversations? cannot be undone!', 
    buttons:[

      {text:'Cancel', role: 'cancel'},
      {text: "Clear", handler:function(){
        this.converCore.clearConversations();
      }.bind(this)}
    ]
    }).present();
  }


  private syncOnStart:boolean;

  toggleVal(){
    this.preference.setPreference_los(this.syncOnStart);
  }

}
