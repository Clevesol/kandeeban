import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversationDetailsPage } from './conversation-details';

@NgModule({
  declarations: [
    ConversationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversationDetailsPage),
  ],
})
export class ConversationDetailsPageModule {}
