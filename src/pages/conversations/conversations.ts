import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { ConversationDetailsPage } from '../conversation-details/conversation-details';
import { ComposeMessageComponent } from '../../components/compose-message/compose-message';
import { CreateGroupComponent } from '../../components/create-group/create-group';



import {GroupmanagerProvider} from '../../providers/groupmanager/groupmanager';
import { Group } from '../../objs/group';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
/**
 * Generated class for the ConversationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversations',
  templateUrl: 'conversations.html',
})
export class ConversationsPage {


  private test:string[] = [] ;
  private recentList:any[] = [];

  private conversationDetailsPage;
  private createGroupComponent;


  private groups:Array<Group>;

  constructor(private alert:AlertController,
    private groupManager:GroupmanagerProvider,
    public navCtrl: NavController,
     public navParams: NavParams, 
    private modalController:ModalController,
    private conversationP:ConverstationCoreProvider,
    private toast:ToastController) {
    
   this.refreshData();
   
   
    
   
  //  for (let index = 0; index < 100; index++) {
  //     let gro:any = {};
  //     gro.title = "test group " + index;
  //     gro.memeberCount = Math.floor(Math.random() * 500);
  //     this.test.push(gro);
  //   }
  }

  private recentGroupList;

  refreshData(){
    this.groupManager.getGroups().then(function(groups){
      this.groups = JSON.parse(groups);
      if(groups){
      this.recentGroupList = this.groups.length > 10 ? this.groups.slice(this.groups.length - 10 , this.groups.length).reverse() : this.groups.reverse();
      
      }
    }.bind(this));

    this.conversationP.getConversations().then(function(conv){
      let con = conv;
      this.recentList = con.length > 4 ? con.length(con.length - 4, con.length).reverse() : con.reverse();
    }.bind(this));
  }

  ionViewDidEnter(){
    this.refreshData();

    
  }


  showConverstaionDetails(idx){

    //////console.log('ban',(this.groups.length - 1) + parseInt(idx));
    idx = (this.groups.length -1) - idx;//this.recentGroupList.length <= 10 ?  ((this.recentGroupList.length -1 ) - (parseInt(idx))) : ((this.groups.length - 1) + parseInt(idx)) ;
    ////console.log('parsing inde',idx);
    this.conversationDetailsPage = this.modalController.create(ConversationDetailsPage, {groupId : idx}, {cssClass : 'conversationDetailsModal'});
    ////console.log(idx);
    this.conversationDetailsPage.onDidDismiss(function(data){
        this.refreshData();
    }.bind(this));
    this.conversationDetailsPage.present();
  }

  showMessageComposer(){
      let m = this.modalController.create(ComposeMessageComponent,{},{cssClass: 'messageComposerComponent'})
      ;
      m.onDidDismiss(function(){
        this.refreshData();
      }.bind(this));

      m.present();
  }

  showMessageComposerWithId(group){
      this.groupManager.getIdxByName(group).then(function(stat){
        //console.log(stat);
        if(stat >= 0){
          let m = this.modalController.create(ComposeMessageComponent,{groupId:stat},{cssClass: 'messageComposerComponent'});
          m.onDidDismiss(function(){
            this.refreshData();
          }.bind(this));
          m.present();

        }else{
          this.toast.create({message:'something went wrong', duration:800, position:'top'}).present();
        }
      }.bind(this));
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
        buttons:[{text:"Delete", 
                handler:function(){
                  idx = (this.groups.length -1) - idx;
                  this.groupManager.removeGroup(idx);
                }.bind(this)}, {
                  text : 'Cancel',
                }
                ]});

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
}
