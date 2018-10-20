import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { GroupmanagerProvider } from '../../providers/groupmanager/groupmanager';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { CreateGroupComponent } from '../../components/create-group/create-group';
import { ConversationDetailsPage } from '../conversation-details/conversation-details';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  private groups;
  private createGroupComponent;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alert:AlertController,
    private conversationP:ConverstationCoreProvider,
    private groupsM:GroupmanagerProvider,
    private modalController:ModalController) {
      this.refreshData();
      
  }

  refreshData(){
    this.groupsM.getGroups().then(function(data){
      this.groups = JSON.parse(data);
    }.bind(this));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  showCreateGroup(){
    this.createGroupComponent = this.modalController.create(CreateGroupComponent,{},{cssClass: 'groupComposerComponent',enableBackdropDismiss:true});
    
    this.createGroupComponent.onDidDismiss(function(){
        this.refreshData();
    }.bind(this));
    this.createGroupComponent.present();

    
  }

  removeGroup(idx){
      let deleteAlert = this.alert.create(
        {message: 'Delete Group and converstaions ??', title:'Delete ?' , 
        buttons:[ {
                  text : 'Cancel',
                },
                {text:"Delete", 
                handler:function(){
                  this.groupsM.removeGroup(idx);
                }.bind(this)}
                ]},
                );

                deleteAlert.onDidDismiss(function(){
                    this.refreshData();
                }.bind(this));
                deleteAlert.present();


  }

  clearConvers(){
    this.alert.create({
      message:'clear all conversations? !cannot be undone', 
      title:'Clear Conversations', buttons:[{
        text:'Cancel', role:'cancel'
      },{
        text:"Clear",
        handler:function(){
          this.conversationP.clearConversations();
        }.bind(this)
      }]})
  }

  ionViewDidEnter(){
    this.refreshData();
  }

  private conversationDetailsPage;

  showConverstaionDetails(idx){

    ////console.log('ban',(this.groups.length - 1) + parseInt(idx));
    //idx = (this.groups.length -1) - idx;//this.recentGroupList.length <= 10 ?  ((this.recentGroupList.length -1 ) - (parseInt(idx))) : ((this.groups.length - 1) + parseInt(idx)) ;
    //console.log('parsing inde',idx);
    this.conversationDetailsPage = this.modalController.create(ConversationDetailsPage, {groupId : idx}, {cssClass : 'conversationDetailsModal'});
    //console.log(idx);
    this.conversationDetailsPage.onDidDismiss(function(data){
        this.refreshData();
    }.bind(this));
    this.conversationDetailsPage.present();
  }

}
