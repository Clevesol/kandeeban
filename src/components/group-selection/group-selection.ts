import { Component } from '@angular/core';
import { GroupmanagerProvider } from '../../providers/groupmanager/groupmanager';
import { ViewController, ModalController, ToastController} from 'ionic-angular';
import { CreateGroupComponent } from '../create-group/create-group';

/**
 * Generated class for the GroupSelectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'group-selection',
  templateUrl: 'group-selection.html'
})
export class GroupSelectionComponent {

 private groups;
 private selectedGroup;

  constructor(private toast:ToastController,private groupManager:GroupmanagerProvider, private viewCtrl:ViewController, private modalController:ModalController) {
    
    this.refreshData();

  }

  refreshData(){
    this.groupManager.getGroups().then(function(groups){
      this.groups = JSON.parse(groups);
    }.bind(this));
  }


  selectGroup(index){
    this.selectedGroup = index;
    if(this.groups[index].contacts.length <=0){
      this.toast.create({message:"please select a group with contacts", duration:800, position: 'top'}).present();
      
    }else{
      this.closeMe();
    }
    
   
  }

  closeMe(){
    this.viewCtrl.dismiss(this.selectedGroup);
  }

  private createGroupComponent;

  showCreateGroup(){
    this.createGroupComponent = this.modalController.create(CreateGroupComponent,{},{cssClass: 'groupComposerComponent',enableBackdropDismiss:true});
    this.createGroupComponent.onDidDismiss(function(){
      this.refreshData();
    }.bind(this));
    this.createGroupComponent.present();

    
  }

}
