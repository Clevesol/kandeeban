import { Component, ViewChild } from '@angular/core';
import { Group } from '../../objs/group';
import { ViewController,ModalController } from 'ionic-angular';
import { GroupAutoComponent } from '../group-auto/group-auto';

/**
 * Generated class for the CreateGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-group',
  templateUrl: 'create-group.html'
})
export class CreateGroupComponent {

  todo:Group = new Group();

  constructor(private viewChild:ViewController, private modalController:ModalController) {
    console.log('Hello CreateGroupComponent Component');
    
  }

  closeMe(){
    this.viewChild.dismiss();
  }


  showSelectContacts(){
    this.modalController.create(GroupAutoComponent,{},{}).present();
  }

}
