import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConversationsPage } from '../pages/conversations/conversations';
import { TemplatesPage } from '../pages/templates/templates';
import { PreferencesPage } from '../pages/preferences/preferences';
import { ConversationDetailsPage } from '../pages/conversation-details/conversation-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConversationsPage,
    ConversationDetailsPage,
    TemplatesPage,
    PreferencesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement : 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConversationsPage,
    ConversationDetailsPage,
    TemplatesPage,
    PreferencesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
