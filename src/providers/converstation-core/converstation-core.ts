
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Contacts, ContactFindOptions} from '@ionic-native/contacts';
import {  HttpClient } from '@angular/common/http';
import { SMS } from '@ionic-native/sms';
import { CONVERSATION_IDENTIFIER } from '../global.constants';
import { ConversationDetailsPage } from '../../pages/conversation-details/conversation-details';


/*
  Generated class for the ConverstationCoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.


  [
    {
    group: 'my test group',
    conversations:[
                    {
                      message: 'new real estate availa today please downlaod it',
                      contacts: [01231312312312,123123123123,123123123123,1231231231312,123123123123,123123123123]
                    }
                  ]
    },
    {
      group: 'Client Group 2',
    conversations:[
                    {
                      message: 'sample template message',
                      contacts: [0123131312,123123123123,123123123123]
                    },
                    {
                      message: 'sample template message',
                      contacts: [0123131312,123123123123,123123123123]
                    }
                    ,{
                      message: 'sample template message',
                      contacts: [0123131312,123123123123,123123123123]
                    },{
                      message: 'sample template message',
                      contacts: [0123131312,123123123123,123123123123]
                    },{
                      message: 'sample template message',
                      contacts: [0123131312,123123123123,123123123123]
                    }
                  ]

    }

  ]



  */


@Injectable()
export class ConverstationCoreProvider {

  

  private converstations;

  constructor(private contacts:Contacts,
    private plt:Platform, 
    private storage:Storage, 
    private http:HttpClient,
    private sms:SMS) {

    

  }

  getConversationsByGroup(group){
    return new Promise(function(resolve) {

      this.getConversations().then(function(convestations){
        console.log('the; conversations',convestations);
        if(convestations !== null && convestations.length > 0){
          for(let t = 0; t < convestations.length; t++){
            if(convestations[t].group === group){
              resolve(convestations[t].conversations);
              return;
            }
          }
        }

          resolve(null);

      });
    }.bind(this));
  }

  getConversations(){
    return new Promise(resolve => {
      this.storage.get(CONVERSATION_IDENTIFIER).then((data => {
        console.log('conversation in db', data);

        if(!data){
          data = "[]";
        }
        resolve(JSON.parse(data));
      }))
    });
  }

  getContactsSample(){
    return new Promise(resolve => {
      this.storage.get(CONVERSATION_IDENTIFIER).then((data => {
        resolve(JSON.parse(data));
      }))
    });
  }

  getContacts(){
    

   

    // return new Promise(resolve => {
      return this.contacts.find(["displayName", "phoneNumbers"],{multiple:true});
    // });


    // return new Promise(resolve => {
    //   this.contacts.find(["displayName", "phoneNumbers"],{multiple:true}).subscribe(data => {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //     resolve(err);
    //   });
    // });
    
  }


  findContactByNumber(numbers){
    let findOption = new ContactFindOptions();
    findOption.filter = numbers;
    findOption.multiple = true;
    return this.contacts.find(["phoneNumbers"],findOption);


  }

  isPlatformSupportedByMe(){
    return ( this.plt.is('ios') || this.plt.is('android'));
  }

  sendSms(contactList, message){
    return this.sms.send(contactList, message);
  }

  addToConverations(group,contacts,message){

      console.log('addToConverations:: group->', group, 'contacts->', contacts, 'message-> ', message);
      this.getConversations().then(function(conversations){
        console.log('conversationcore::addtoConvestations::-> ', conversations);
        let conver = conversations;
        if(!conversations){
            conver = [];
        }

        let conversation = {
          contacts : [],
          message : ''

        };
        conversation.contacts = contacts;
        conversation.message = message;

        let addingIdx = -1;
        for(let conIdx = 0; conIdx < conver.length; conIdx++){
          if(conver[conIdx].group === group){
              addingIdx = conIdx;
              break;
              // conver[conIdx].push(conversation);
          }
        }

        if(addingIdx > -1){
          console.log('the adding',addingIdx, conver);

          if(conver[addingIdx].conversations.length >= 5){
            conver[addingIdx].conversations.splice(0,1);
          }

          this.array_move(conver, addingIdx, conver.length -1);

          conver[conver.length-1].conversations.push(conversation);
        }else{

          let groupInit:any = {};
          groupInit.group = group;
          groupInit.conversations = [];
          groupInit.conversations.push(conversation);
          conver.push(groupInit);
          console.log('pushed', conver, conversation);
        }


        this.storage.set(CONVERSATION_IDENTIFIER, JSON.stringify(conver)).then(resolve=>{

        });


      }.bind(this));
  }


  public clearConversations(){
    this.storage.set(CONVERSATION_IDENTIFIER, '[]');
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};


  getContactsFiltered(){
    
  }


}
