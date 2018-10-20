import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PreferenceProvider } from '../providers/preference/preference';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  private syncing;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private preference:PreferenceProvider) {
    platform.ready().then(() => {

      // console.log('app laoded successfully');


      // this.preference.getPreference_los().then(function(data){
      //   if(data){
      //     this.syncing = true;

      //     console.log('syncing...');
      //   }
      // }.bind(this));

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

