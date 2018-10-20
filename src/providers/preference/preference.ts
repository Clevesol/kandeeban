import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { PREFERENCE_SYNC_ON_START } from '../global.constants';

/*
  Generated class for the PreferenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreferenceProvider {

  constructor(public storage: Storage) {
    
  }

  getPreference_los(){
    return this.storage.get(PREFERENCE_SYNC_ON_START);
  }
  setPreference_los(val){
    this.storage.set(PREFERENCE_SYNC_ON_START, val);
  }

}
