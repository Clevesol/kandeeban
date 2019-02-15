import { Component } from '@angular/core';
import { ConversationO } from '../../objs/conversations';
import { LoadingController,ViewController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { GroupmanagerProvider } from '../../providers/groupmanager/groupmanager';
import { SMS } from '@ionic-native/sms';
import { GroupSelectionComponent } from '../group-selection/group-selection';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { TemplatesPage } from '../../pages/templates/templates';
import { GroupAutoComponent } from '../group-auto/group-auto';

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
  private pW;
  constructor(private lC:LoadingController,private modalController:ModalController,private viewChild:ViewController, navParams:NavParams,private  groupManager:GroupmanagerProvider, private sms:SMS, private toast:ToastController, private convestationProvider:ConverstationCoreProvider) {

    let groupId = navParams.get("groupId");
    this.pW = this.lC.create({content:'please wait..'});
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
    
    this.conversationContact = this.group[groupId].contacts;
    this.groupName = this.group[groupId].name;
    // this.groupManager.getGroups().then(function(groupData){
    //   this.group = JSON.parse(groupData);
    //   console.log('parsed group', this.group);
    //   if(parseInt(groupId)> -1){
    //     console.log('groupID',groupId, this.group);
    //     this.groupName = this.group[groupId].name;
    //     for(let tt = 0; tt< this.group[groupId].contacts.length; tt++){
    //       this.conversationContact.push(this.group[groupId].contacts[tt]);
    //     }
    //   }
      
    // }.bind(this));
  }

  closeMe(){
    this.viewChild.dismiss();
  }


  // j$tChan$ed@123Password


  sendSms(){

    console.log(this.conversationContact, (this.todo? this.todo.name : "empty"));
    
    if(this.todo.name && this.todo.name.length > 0){
    
    if(this.conversationContact && this.conversationContact.length > 0){
      
      this.pW.present().then(function(){

        var contL = [];
        
        for(var r = 0; r < this.conversationContact.length; r++){
          for(var v = 0; v < this.conversationContact[r].phoneNumbers.length;v++){
            if(this.conversationContact[r].phoneNumbers[v].selected){
              contL.push(this.conversationContact[r].phoneNumbers[v].value+"");
            }
          }
            // if(this.conversationContact[r].selected){
            //   contL.push(this.conversationContact[r].value+"");
            // }
        }

        

        
        console.log('sending sms to', contL);

        this.convestationProvider.sendSms(contL, this.todo.name).then(
          function(){
            
            this.closeMe();
            this.convestationProvider.addToConverations(this.groupName, this.conversationContact, this.todo.name);
          this.toast.create({message:'sms added to send list', position:'top', duration: 1000}).present();
        }.bind(this), function(error){
          this.closeMe();
          this.toast.create({message:'sms sending cancelled', position:'top', duration: 1000}).present();
        }.bind(this));

        this.pW.dismiss();

      }.bind(this));

     
    }else{
      this.toast.create({message:'invalid contact list', position:'top', duration: 1000}).present();
    }

    }else{
      this.toast.create({message: 'empty message cannot be sent'});
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



  showSelectContacts(){
    let contactListComponent = this.modalController.create(GroupAutoComponent,{data: this.conversationContact, mode:true},{});
    contactListComponent.onDidDismiss(function(selectedList){
      if(selectedList && selectedList.length > 0){
        this.conversationContact = selectedList;
        // for(var t = 0; t< selectedList.length;t++){
        //   this.conversationContact.push(selectedList[t].contactNumber);
        // }
        
      }
    }.bind(this));
    contactListComponent.present();
  }

 

}
