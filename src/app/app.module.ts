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
import { ConverstationCoreProvider } from '../providers/converstation-core/converstation-core';
import { IonicStorageModule } from '@ionic/storage';
import { ComposeMessageComponent } from '../components/compose-message/compose-message';
import { CreateGroupComponent } from '../components/create-group/create-group';
import {GroupAutoComponent} from '../components/group-auto/group-auto';
import {ProgressBarModule} from 'angular-progress-bar';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConversationsPage,
    ConversationDetailsPage,
    TemplatesPage,
    PreferencesPage,
    ComposeMessageComponent,
    CreateGroupComponent,
    GroupAutoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement : 'top'}),
    IonicStorageModule.forRoot(), 
    ProgressBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConversationsPage,
    ConversationDetailsPage,
    TemplatesPage,
    PreferencesPage,
    ComposeMessageComponent,
    CreateGroupComponent,
    GroupAutoComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConverstationCoreProvider
  ]
})
export class AppModule {}
