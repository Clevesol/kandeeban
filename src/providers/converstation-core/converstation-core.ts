/*
queries

select name from contacts where id in (select contactid from contactphonenumbers where contactnumber in (766581908)) limit 1

*/


import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Contacts, ContactFindOptions} from '@ionic-native/contacts';
import {  HttpClient } from '@angular/common/http';
import { SMS } from '@ionic-native/sms';
import { CONVERSATION_IDENTIFIER, CONTACTS_CACHE } from '../global.constants';
import { ConversationDetailsPage } from '../../pages/conversation-details/conversation-details';
import { DbProvider } from '../db/db';


@Injectable()
export class ConverstationCoreProvider {

  

  private converstations;
  private contactsArr;

  constructor(private contacts:Contacts,
    private plt:Platform, 
    private storage:Storage, 
    private http:HttpClient,
    private sms:SMS,
    private db:DbProvider, private loadingController:LoadingController) {


      


   

  }


  public hardRefresh(){
    return new Promise(function(resolve){
      this.contactsArr = null;
      this.storage.remove(CONTACTS_CACHE);
      this.syncContacts().then(function(data){
        resolve(true);
      }.bind(this));
    
     
      // this.reSyncContacts().then(function(data){
      //     resolve(data);
      // }.bind(this));
    }.bind(this));
    
    
  }

  public reSyncContacts(){
    return new Promise(function(resolve){

      this.storage.get(CONTACTS_CACHE).then(function(data){
        if(data && data.length > 0){
        this.contactsArr = JSON.parse(data);
        }
        if(!this.contactsArr || this.contactsArr.length <= 0){
          console.log('starting sync');
          let loaded = this.loadingController.create({content: 'Syncing contacts'});
            loaded.present().then(function(){

              this.syncContacts().then(function(data){
                this.getContactsFromDB().then(function(data){
                  this.contactsArr = data;
                  this.storage.set(CONTACTS_CACHE, JSON.stringify(this.contactsArr));              
                  loaded.dismiss();
                  resolve(this.contactsArr);
                }.bind(this));
              }.bind(this));

              
            }.bind(this));
        }else{




          for(var t = 0; t < this.contactsArr.length;t++){
            this.contactsArr[t].selected = false;
          }




          resolve(this.contactsArr);
        }
      }.bind(this));

      
    }.bind(this));
    
  }


  

  public syncContacts(){

    


      this.db.exctSql("delete from Contacts where id>=0").then(data=>{console.log(data)});
      this.db.exctSql("delete from ContactPhoneNumbers where id>=0").then(data=>{console.log(data)});

    return new Promise(function(resolve){
      this.getContacts().then(function(cont){

        

        for(var idx = 0; idx < cont.length; idx++){
              let con = cont[idx];
              this.db.addData("INSERT INTO Contacts(id,name,photo) VALUES(?,?,?)",[con.id, con.name.formatted, null]);
              if(con.phoneNumbers){
                for(var pidx = 0; pidx < con.phoneNumbers.length;pidx++){
                  this.db.addData("INSERT INTO ContactPhoneNumbers(contactId,contactNumber,cNtype) VALUES(?,?,?)",[con.id, con.phoneNumbers[pidx].value || null, con.phoneNumbers[pidx].type || null]);
                }
              }
          }

          // console.log('contacts found', cont);
          // var preparedStringContacts = '';
          // var preparedStringContactsNumbers = '';
          
          // for(var idx = 0; idx < cont.length; idx++){
          //     let con = cont[idx];
          //     preparedStringContacts += '['+con.id+', '+con.name.formatted+', '+null+'],';
          //     if(con.phoneNumbers){
          //       for(var pidx = 0; pidx < con.phoneNumbers.length;pidx++){
          //         preparedStringContactsNumbers += '['+con.id+','+con.phoneNumbers[pidx].value+'],';
          //       }
          //     }
          // }

          // preparedStringContacts = preparedStringContacts.substr(0,preparedStringContacts.length-2);
          // preparedStringContactsNumbers = preparedStringContactsNumbers.substr(0,preparedStringContactsNumbers.length-2);

          // var sql1 = "INSERT INTO Contacts(?1,?2,?3) values("+preparedStringContacts+")";
          // var sql2 = "INSERT INTO Contacts(?1,?2) values("+preparedStringContactsNumbers+")";

          // console.log(sql1, ':sql1\n', 'sql2::' + sql2);
          resolve(true);
      }.bind(this));
    }.bind(this));
    
  }

  getConversationsByGroup(group){
    return new Promise(function(resolve) {

      this.getConversations().then(function(convestations){
        ////console.log('the; conversations',convestations);
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
        ////console.log('conversation in db', data);

        if(!data){
          data = "[]";
        }
        resolve(JSON.parse(data));
      }))
    });
  }

  getContactsSample(){
    return new Promise(function(resolve){
      
    }.bind(this));
  }



  // for(var i = 0; i < tr.length;i++){
        //     var contact = tr[i];
        //     contact.selected = false;

          //   this.db.getRecords('select * from ContactPhoneNumbers where contactId='+contact.id).then(function(sTr){
          //     let cNumbers = [];
          //     for(var si = 0; si < sTr.length; si++){
          //       cNumbers.push(sTr[si]);
          //     }
          //     contact.contacts = cNumbers;
          // }.bind(this));

          
          // }

  getContacts2(){

    return new Promise(function(resolve){
      this.reSyncContacts().then(function(data){
        resolve(data);
      }.bind(this));
     
    }.bind(this));
   
  }

  getContactsFromDB(){
    return new Promise(function(resolve){
      // select *, null as status from contacts inner join contactphonenumbers on contacts.id = contactphonenumbers.contactid group by contactphonenumbers.contactNumber order by contacts.name asc
      // select contacts.id,contacts.name,contacts.photo,contactphonenumbers.id,contactphonenumbers.id,contactphonenumbers.contactid,contactphonenumbers.contactNumber, null as status from contacts,contactphonenumbers where contacts.id = contactphonenumbers.contactid order by contacts.name ASC
      this.db.getRecords('select *, null as status from contacts inner join contactphonenumbers on contacts.id = contactphonenumbers.contactid group by contactphonenumbers.contactNumber order by contacts.name asc').then(function(tr){
          resolve(tr); 
      }.bind(this));
    }.bind(this));
  }

  getContacts(){
      return this.contacts.find(["displayName"]);    
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

      //console.log('addToConverations:: group->', group, 'contacts->', contacts, 'message-> ', message);
      this.getConversations().then(function(conversations){
        ////console.log('conversationcore::addtoConvestations::-> ', conversations);
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
          ////console.log('the adding',addingIdx, conver);

          if(conver[addingIdx].conversations.length >= 20){
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
          ////console.log('pushed', conver, conversation);
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


  public resetContactsCache(){
    this.contactsArr = null;
    this.storage.remove(CONTACTS_CACHE);
    console.log('cache cleard');
  }



  public syncNContacts(){


    return new Promise(function(resolve){
      let syncerL = this.loadingController.create({content:"Syncing Contacts"});

      syncerL.present().then(function(){
        this.resetContactsCache();
        this.getContacts().then(function(contD){
          contD.sort(function(a,b){
            return a.name.formatted >= b.name.formatted;
          }.bind(this));
          this.storage.set(CONTACTS_CACHE, JSON.stringify(contD));              
          syncerL.dismiss();
          resolve(contD)
        }.bind(this));
      }.bind(this));
    }.bind(this));

  

  }


  public getNContacts(){

    return new Promise(function(resolve){
      this.storage.get(CONTACTS_CACHE).then(function(data){
          data = JSON.parse(data);
          if(!data || data.length <= 0){
            this.syncNContacts().then(function(data2){
              resolve(data2);
            }.bind(this));
          }else{
            resolve(data);
          }
      }.bind(this));
    }.bind(this));
    
  }


  public synchronizeContacts(){

    return new Promise(function(resolver){
      let syncerL = this.loadingController.create({content: 'Syncing..'});

    syncerL.present().then(function(){
      

        this.getContacts2().then(function(contactsA){
          contactsA.sort(function(a,b){return a.contactId > b.contactId});
          this.getContacts().then(function(contcts){
            if(contcts){
              contcts.sort(function(a,b){
                return a.id > b.id;
              }.bind(this));


              if(contactsA[contactsA.length -1].contactId != contcts[contcts.length -1].id){
                console.log('synchronization required');
                syncerL.dismiss();
                resolver(true);
              }
            }
        }.bind(this));
      }.bind(this));

      

    // this.db.getRecords('select max(id) as max from contacts').then(function(data){
    //   if(data.max != this.contactsArr[this.contactsArr.length -1].contactId){
    //     console.log();
    //   }
    // }.bind(this));
    }.bind(this));
    }.bind(this));
   
  }


  public test(){

    let l = this.loadingController.create({content: 'synching..'});
    return new Promise(function(resolver){
      l.present().then(function(){

        this.storage.get(CONTACTS_CACHE).then(function(dataLol){
          var cont = JSON.parse(dataLol);

          if(!cont || (cont.length<=0)){
            this.getContacts().then(function(cs){
              cs.sort((a,b)=>{return a.name.formatted >= b.name.formatted;});
              let arr = [];
              for(var cb = 0; cb < cs.length; cb++){
                var co:any = {};
                // var cs:any = {};
                co.id = cs[cb].id;
                co.name = {};
                co.name.formatted = cs[cb].name.formatted;
                co.selected = 0;
                co.phoneNumbers = cs[cb].phoneNumbers;

                arr.push(co);
              }

              this.storage.set(CONTACTS_CACHE, JSON.stringify(arr));
              l.dismiss();
              resolver(cs);
          }.bind(this));
          }else{
            l.dismiss();
            resolver(cont);
          }
        }.bind(this));

        


      }.bind(this));
    }.bind(this));
    
  }


  public finalSynchronize(){
    this.resetContactsCache();
    this.test().then(data=>{});
  }


}
