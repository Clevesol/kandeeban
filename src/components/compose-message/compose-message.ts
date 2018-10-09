import { Component } from '@angular/core';
import { ConversationO } from '../../objs/conversations';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ComposeMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'compose-message',
  templateUrl: 'compose-message.html'
})
export class ComposeMessageComponent {

  todo:ConversationO  = new ConversationO();

  constructor(private viewChild:ViewController) {
    console.log('Hello ComposeMessageComponent Component');
    
  }

  closeMe(){
    this.viewChild.dismiss();
  }

}
