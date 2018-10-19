import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, PopoverController, AlertController } from 'ionic-angular';
import { GroupmanagerProvider } from '../../providers/groupmanager/groupmanager';
import { ComposeMessageComponent } from '../../components/compose-message/compose-message';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { GroupPopoverComponent } from '../../components/group-popover/group-popover';
import { GroupAutoComponent } from '../../components/group-auto/group-auto';
import { text } from '@angular/core/src/render3/instructions';


/**
 * Generated class for the ConversationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation-details',
  templateUrl: 'conversation-details.html',
})
export class ConversationDetailsPage {

    private group;

    private currentGroup;

    private conversations = [];
    private conversations_ = [
      {
        message: 'sample template message akd jalksdj akldjald k',
        contacts: ['0123131312','123123123123','123123123123']
      },
      {
        message: 'lkd jasd;alk jd;adk aslda ldjasl djaslkdj asldj aldj aljdlsjdlkaj daljd alsdj aldja ldjaldjalkdja sldjadjas lkdj daljd alsdj aldja ldjaldjalkdja sldjadjas lkd j',
        contacts: ['123123123123']
      }
      ,{
        message: 'sample template message',
        contacts: ['0123131312','123123123123']
      },{
        message: 'sample template message',
        contacts: ['0123131312','123123123123','123123123123']
      },{
        message: 'sample template message',
        contacts: ['0123131312','123123123123','123123123123']
      }
    ];

  constructor(private me:ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public grpMngr:GroupmanagerProvider,
    private modalController:ModalController,
    private conversationsP:ConverstationCoreProvider,
    private pController:PopoverController,
    private groupManager:GroupmanagerProvider,
    private alertController:AlertController) {

      this.currentGroup = navParams.get("groupId");
      
      this.refreshData();


  }

  refreshData(){
    this.grpMngr.getGroups().then(function(gro){
      if(gro.length > 0){
        //console.log("groups parsed ", JSON.parse(gro), this.currentGroup);
        this.group = JSON.parse(gro)[this.currentGroup];
        //console.log('this.group->',this.group);


        //console.log(this.conversations, this.currentGroup, this.group);
        this.conversationsP.getConversationsByGroup(this.group.name).then(function(data){
        //console.log('the converstions ', data);
        if(data !== null) this.conversations = data;
        //console.log(this.conversations);
        }.bind(this));


      }
    }.bind(this));
  }

  ionViewDidLoad() {
    
  }

  closeMe(){
    this.me.dismiss();
  }

  private show=false;

  toggleShow(){
    this.show = !this.show;
  }

  showMenu(evt){
    let pop = this.pController.create(GroupPopoverComponent,{},{});
    pop.onDidDismiss(function(option){
      //console.log(option);
        switch(option){
          case 1:
          
            this.toggleShow();
            break;
            case 2: 
             this.showSelectContacts();
            break;
            case -1:
              this.removeGroup();
            break;

        }
    }.bind(this));
    pop.present({ev: evt})
  }


  removeGroup(){
    this.alertController
    .create(
      {title:'Are you sure?',
      message: 'delete group ?',
      buttons:[
      {text:"Cancel", role:"cancel"},
      {text: 'Delete', handler:function(){
        this.groupManager.removeGroup(this.currentGroup);
        this.closeMe();
      }.bind(this), cssClass:'delete'}
      
    ]
      }).present();
  }
  showSelectContacts(){
    let contactListComponent = this.modalController.create(GroupAutoComponent,{data: this.group.contacts},{});
    contactListComponent.onDidDismiss(function(selectedList){
      if(selectedList && selectedList.length > 0){
        this.group.contacts = selectedList;
        this.groupManager.updateGroupContacts(this.currentGroup, this.group.contacts);
      }
    }.bind(this));
    contactListComponent.present();
  }

  showCompose(id){
    this.modalController.create(ComposeMessageComponent, {groupId: this.currentGroup},{}).present();
  }

  removeContact(idx){
      this.group.contacts.splice(idx,1);
      //console.log(this.group.contacts);
      this.groupManager.updateGroupContacts(this.currentGroup, this.group.contacts)
  }

  ionViewDidEnter(){
    this.refreshData();
  }

  showContacts(index){
    let cont = this.conversations[index].contacts;
    this.conversationsP.findContactByNumber(cont).then(function(data){
      console.log(data);
    }.bind(this));
    
  }

}
