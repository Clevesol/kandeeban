
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';

/*
  Generated class for the ConverstationCoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConverstationCoreProvider {


  private converstations;

  constructor(private plt:Platform, private storage:Storage) {

  }

  getConversations(){

  }

  isPlatformSupportedByMe(){
    return this.plt.is('ios') || this.plt.is('android');
  }

}
