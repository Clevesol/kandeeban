import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ContactListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-list',
  templateUrl: 'contact-list.html'
})
export class ContactListComponent {

  private contacts;

  constructor(navParams:NavParams, private vc:ViewController) {
    this.contacts = navParams.get('contacts');
  }

  closeMe(){
    this.vc.dismiss();
  }

}
