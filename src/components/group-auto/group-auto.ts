import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { Contacts, Contact, ContactName } from '@ionic-native/contacts';
import { Group } from '../../objs/group';

/**
 * Generated class for the GroupAutoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'group-auto',
  templateUrl: 'group-auto.html'
})
export class GroupAutoComponent {

   private contacts:Array<any>;
  private group:Group;

  // private contacts;

  constructor(private conversations:ConverstationCoreProvider,private viewCtrl:ViewController,private cont:Contacts, private navParams:NavParams) {


    this.selectedList = this.navParams.get("data");

    // this.cont.find(["displayName", "phoneNumbers"],{multiple:true}).then(function(contactlist){
    //     console.log(contactlist);
    //     this.contacts = contactlist;
    // }.bind(this));

    // this.conversations.isPlatformSupportedByMe()
    if(this.conversations.isPlatformSupportedByMe()){
      this.conversations.getContacts().then(function(con){
        this.contacts = con;
      }.bind(this));
    }else{
      // console.log(data);
      //   this.contacts = data;
    }
  }


  private selectedList;

  done(){
    console.log(this.selectedList);
    this.closeMe();

  }

  private expandingList:any = false;

  toggle($event,$index){
  
    if(this.expandingList !== $index){
      this.expandingList = $index;
    }else{
      this.expandingList = false;
    }
    console.log(this.expandingList);
  }

  ionViewDidLoad(){
    console.log(this.expandingList);
  }

  closeMe(){
    this.viewCtrl.dismiss(this.selectedList);
  }

  toggleSection(i) {
    this.expandingList = i;
  }

  toggleNumber(idx){

    let selectIdx = this.inSelection(idx);

    if(selectIdx && selectIdx >= 0){
      this.selectedList.pop(selectIdx);
    }else{
      let contact = this.contacts[this.expandingList].phoneNumbers[idx];
      contact.name = this.contacts[this.expandingList].name || this.contacts[this.expandingList].name.formatted;
      console.log('pushing ', this.selectedList, contact);
      this.selectedList.push(contact);
    }
      // var index = this.selectedList.indexOf(parseInt(this.contacts[this.expandingList].phoneNumbers[idx].value));
      // if(index > -1 && this.selectedList[index] === parseInt(this.contacts[this.expandingList].phoneNumbers[idx].value)){
      //   console.log('toggle me if : ', index, JSON.stringify(this.selectedList), JSON.stringify(this.contacts), this.contacts[this.expandingList].phoneNumbers[idx].value);
      //   this.selectedList.pop(index);
      // }else{
      //   if(this.contacts[this.expandingList] && this.contacts[this.expandingList].phoneNumbers){
      //    console.log('toggle me else :', index, JSON.stringify(this.selectedList), JSON.stringify(this.contacts), this.contacts[this.expandingList].phoneNumbers[idx].value);
      //    this.selectedList.push(parseInt(this.contacts[this.expandingList].phoneNumbers[idx].value)); 
      //   }
      // }
  }

  addClick(i){
    // this.selectedList.pop(this.contacts[this.expandingList].phoneNumbers[i].value);
    // this.selectedList.push(this.contacts[this.expandingList].phoneNumbers[i].value);
  }


  inSelection(i){
      let contact = this.contacts[this.expandingList].phoneNumbers[i];
      for(let chkIdx = 0; chkIdx < this.selectedList.length; chkIdx++){

        if(contact.value === this.selectedList[chkIdx].value){
            return chkIdx;
        }
      }
      return false;
      //console.log(i, this.selectedList, (this.contacts[this.expandingList].phoneNumbers[i].value));
      // return (this.expandingList >= 0) && this.selectedList.includes(parseInt(this.contacts[this.expandingList].phoneNumbers[i].value));
  }

  isContactsSelected(index){
      
  }
 
 

}
