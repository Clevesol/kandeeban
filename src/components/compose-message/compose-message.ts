import { Component } from '@angular/core';
import { ConversationO } from '../../objs/conversations';
import { ViewController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { GroupmanagerProvider } from '../../providers/groupmanager/groupmanager';
import { SMS } from '@ionic-native/sms';
import { GroupSelectionComponent } from '../group-selection/group-selection';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { TemplatesPage } from '../../pages/templates/templates';

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
  private group;

  private conversationContact = [];
  constructor(private modalController:ModalController,private viewChild:ViewController, navParams:NavParams,private  groupManager:GroupmanagerProvider, private sms:SMS, private toast:ToastController, private convestationProvider:ConverstationCoreProvider) {

    let groupId = navParams.get("groupId");
    
    this.groupManager.getGroups().then(function(groupData){
      this.group = JSON.parse(groupData);
      if(parseInt(groupId)> -1){
        if(this.group[groupId].contacts.length <=0){
          this.toast.create({message:'no contacts in the group', duration:1000,position:'top'}).present();
          return;
        }

        this.refreshContacts(groupId);


        // for(let tt = 0; tt< this.group[groupId].contacts.length; tt++){
        //   this.conversationContact.push(this.group[groupId].contacts[tt].value+"");
        // }
      }
      
    }.bind(this));

    
    
  }

  private groupName;

  private refreshContacts(groupId){
    
    
    this.groupManager.getGroups().then(function(groupData){
      this.group = JSON.parse(groupData);
      console.log('parsed group', this.group);
      if(parseInt(groupId)> -1){
        console.log('groupID',groupId, this.group);
        this.groupName = this.group[groupId].name;
        for(let tt = 0; tt< this.group[groupId].contacts.length; tt++){
          this.conversationContact.push(this.group[groupId].contacts[tt].value+"");
        }
      }
      
    }.bind(this));
  }

  closeMe(){
    this.viewChild.dismiss();
  }


  // j$tChan$ed@123Password


  sendSms(){

    
    if(this.conversationContact && this.conversationContact.length > 0){
      
      this.convestationProvider.sendSms(this.conversationContact, this.todo.name).then(
        (data)=>{
          this.closeMe();
          this.convestationProvider.addToConverations(this.groupName, this.conversationContact, this.todo.name);
        this.toast.create({message:'sms added to send list', position:'top', duration: 1000}).present();
      }, (error)=>{
        this.toast.create({message:'sms send failed', position:'top', duration: 1000}).present();
      });
    }else{
      this.toast.create({message:'invalid contact list', position:'top', duration: 1000}).present();
    }
  }

  private selectedGroup;

  showGroupSelection(event){
      let modal = this.modalController.create(GroupSelectionComponent,{},{});
      modal.onDidDismiss(function(data){
          this.selectedGroup = parseInt(data);
          this.refreshContacts(data);
      }.bind(this));
      modal.present();
  }

  showTemplateSelection(ev){
    let mod = this.modalController.create(TemplatesPage, {mode:2},{});
    mod.onDidDismiss(function(data){
      this.todo.name = data;
    }.bind(this));
    mod.present();
  }

}
