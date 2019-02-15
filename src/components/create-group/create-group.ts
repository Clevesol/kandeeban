import { Component, ViewChild } from '@angular/core';
import { Group } from '../../objs/group';
import { ViewController,ModalController,ToastController } from 'ionic-angular';
import { GroupAutoComponent } from '../group-auto/group-auto';
import {GroupmanagerProvider} from '../../providers/groupmanager/groupmanager';
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

  newGroup:Group = new Group();
  private contactListComponent;


  constructor(private toast:ToastController,private groupManager:GroupmanagerProvider,private viewChild:ViewController, private modalController:ModalController) {
    this.newGroup.name = "";
    this.newGroup.id = 123;

    
    
  }

  closeMe(){
    this.viewChild.dismiss();
  }


  showSelectContacts(){
    this.contactListComponent = this.modalController.create(GroupAutoComponent,{data: this.newGroup.contacts},{});
    this.contactListComponent.onDidDismiss(function(selectedList){
      if(selectedList && selectedList.length > 0){
        this.newGroup.contacts = selectedList;
      }
    }.bind(this));
    this.contactListComponent.present();
  }


  createGroup(){
    console.log('cheking', this.newGroup);
    this.groupManager.checkExist(this.newGroup.name).then(function(res){
      console.log(res);
      if(res){
        this.toast.create({message: "groupt already excists or invalid name", duration: 1500, position:'top'}).present();
      }else{
        this.groupManager.addGroup(this.newGroup);
        this.closeMe();
      }
    }.bind(this));
    
   // this.toast.create({message: "groupt created", duration: 500, position:'bottom'}).present();
  }

}
