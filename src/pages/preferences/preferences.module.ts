import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferencesPage } from './preferences';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    PreferencesPage,
  ],
  imports: [
    IonicPageModule.forChild(PreferencesPage)
  ],
})
export class PreferencesPageModule {}
