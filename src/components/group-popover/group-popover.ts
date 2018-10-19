import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the GroupPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'group-popover',
  templateUrl: 'group-popover.html'
})
export class GroupPopoverComponent {

  text: string;

  constructor(private viewController:ViewController) {
    console.log('Hello GroupPopoverComponent Component');
    this.text = 'Hello World';
  }

  private option;

  switchContactsView(){
    this.option = 1;
    this.close();
  }

  removeGroup(){
    this.option = -1;
    this.close();
  }

  addContacts(){
    this.option = 2;
    this.close();
  }

  close(){
    this.viewController.dismiss(this.option);
  }

}
