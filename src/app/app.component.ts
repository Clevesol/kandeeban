import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PreferenceProvider } from '../providers/preference/preference';
import {DbProvider} from '../providers/db/db';
import { ConverstationCoreProvider } from '../providers/converstation-core/converstation-core';
import { Contacts } from '@ionic-native/contacts';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  private syncing;

  constructor(private contacts:Contacts,private conver:ConverstationCoreProvider,alertController:AlertController,loadingController:LoadingController,private dbProvider:DbProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private preference:PreferenceProvider) {
    platform.ready().then(() => {


      window["smsPro"] = this;
      window["contacts"] = this.contacts;
      // console.log('app laoded successfully');


      

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.


      statusBar.styleDefault();
      splashScreen.hide();




      

      let loader = loadingController.create({content:'please wait...'});

      loader.present().then(function(){
        this.preference.isFirstBoot().then(function(data){
          loader.dismiss();
          if(!data){
            this.conver.finalSynchronize();
            this.preference.firstBooted();
          }
        }.bind(this));
      }.bind(this));
      // loader.present().then(function(){
      //   this.dbProvider.prepareOrOpenDB().then(function(data){
      //     loader.dismiss();

      //     this.preference.isFirstBoot().then(function(data){
            
      //       if(!data){
      //         console.log('starting initial sync');
      //           let syncLoader =  loadingController.create({content: 'Synching Contacts..'});
      //           syncLoader.present().then(function(){
      //               this.conver.syncContacts().then(function(){
      //                 this.preference.firstBooted();
      //               syncLoader.dismiss();
      //             }.bind(this));
      //           }.bind(this));
      //       }else{
      //         console.log('skipping initial sync');
      //         this.preference.getPreference_los().then(function(data){
      //           if(data){
      //             console.log('starting auto sync');
      //                 let syncLoader =  loadingController.create({content: 'Synching Contacts..'});
      //                 syncLoader.present().then(function(){
      //                 this.conver.syncContacts().then(function(){
      //                 this.preference.firstBooted();
      //                 syncLoader.dismiss();
      //                 }.bind(this));
      //               }.bind(this));
      //           }
      //         }.bind(this));

      //       }
      //     }.bind(this));

      //   }.bind(this));
      // }.bind(this));

      

      

     

    });
  }
}

