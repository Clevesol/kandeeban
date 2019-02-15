import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {SMS} from '@ionic-native/sms';
import {SQLite} from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { ConversationsPage } from '../pages/conversations/conversations';
// import { TemplatesPage } from '../pages/templates/templates';
// import { PreferencesPage } from '../pages/preferences/preferences';
// import { ConversationDetailsPage } from '../pages/conversation-details/conversation-details';
import { ConverstationCoreProvider } from '../providers/converstation-core/converstation-core';
import { IonicStorageModule } from '@ionic/storage';
// import { ComposeMessageComponent } from '../components/compose-message/compose-message';
// import { CreateGroupComponent } from '../components/create-group/create-group';
// import {GroupAutoComponent} from '../components/group-auto/group-auto';
import {ComponentsModule} from '../components/components.module';
import {ProgressBarModule} from 'angular-progress-bar';
import { Contact, Contacts } from '@ionic-native/contacts';
import { GroupmanagerProvider } from '../providers/groupmanager/groupmanager';
import { ConversationDetailsPageModule } from '../pages/conversation-details/conversation-details.module';
import { ConversationsPageModule } from '../pages/conversations/conversations.module';
import { PreferencesPageModule } from '../pages/preferences/preferences.module';
import { TemplatesPageModule } from '../pages/templates/templates.module';
import { HttpClientModule } from '@angular/common/http';
import { TemplatesManagerProvider } from '../providers/templates-manager/templates-manager';
import { GroupsPageModule } from '../pages/groups/groups.module';
import { PreferenceProvider } from '../providers/preference/preference';
import { DbProvider } from '../providers/db/db';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // ConversationsPage,
    // ConversationDetailsPage,
    // TemplatesPage,
    // PreferencesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement : 'top'}),
    IonicStorageModule.forRoot(), 
    ProgressBarModule,
    HttpClientModule,
    ComponentsModule,
    ConversationDetailsPageModule,
    ConversationsPageModule,
    PreferencesPageModule,
    TemplatesPageModule,
    GroupsPageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // ConversationsPage,
    // ConversationDetailsPage,
    // TemplatesPage,
    // PreferencesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConverstationCoreProvider,
    Contacts,
    Contact,
    GroupmanagerProvider,
    SMS,
    TemplatesManagerProvider,
    PreferenceProvider,
    SQLite,
    DbProvider
    
  ]
})
export class AppModule {}
