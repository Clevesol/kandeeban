import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { Contacts, Contact, ContactName } from '@ionic-native/contacts';
import { Group } from '../../objs/group';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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
   private duplicates:Array<any>;

  private group:Group;
  private myInput;
  private shouldShowCancel = true;
  private searchBar;

  // private contacts;

  constructor(private conversations:ConverstationCoreProvider,
    private viewCtrl:ViewController
    ,private cont:Contacts,
    
     private navParams:NavParams) {


    this.selectedList = this.navParams.get("data");
    this.searchBar = new FormControl();

    // this.cont.find(["displayName", "phoneNumbers"],{multiple:true}).then(function(contactlist){
    //     console.log(contactlist);
    //     this.contacts = contactlist;
    // }.bind(this));

    // this.conversations.isPlatformSupportedByMe()
    if(this.conversations.isPlatformSupportedByMe()){
      this.conversations.getContacts().then(function(con){
        this.contacts = con;
        this.duplicates = this.contacts;
      }.bind(this));
    }else{
      // console.log(data);
      //   this.contacts = data;
    }
  }


  private selectedList;

  done(){
    this.viewCtrl.dismiss(this.selectedList);
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
    this.searchBar.valueChanges.debounceTime(700).subscribe(function(search){
    	this.searching = false;
    	if(this.myInput.length > 0){
	    	this.setFilteredItems();
    	}else{
    		this.refreshData();
    	}
    }.bind(this));
  }

  closeMe(){
    this.selectedList = [];
    this.viewCtrl.dismiss([]);
  }

  toggleSection(i) {
    this.expandingList = i;
  }

  toggleNumber(idx){

    
    let selectIdx = this.inSelection(idx);
    console.log('toggling ', idx, this.selectedList,selectIdx);
    if(selectIdx >= 0){
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
        console.log('cheking ', contact.value, this.selectedList[chkIdx].value);
        if(contact.value === this.selectedList[chkIdx].value){
            return chkIdx;
        }
      }
      return -1;
      //console.log(i, this.selectedList, (this.contacts[this.expandingList].phoneNumbers[i].value));
      // return (this.expandingList >= 0) && this.selectedList.includes(parseInt(this.contacts[this.expandingList].phoneNumbers[i].value));
  }

  isContactsSelected(index){
      
  }
 
  private searching = false;

  onInput($event){
    this.searching = true;
    this.setFilteredItems();
  }

  onCancel($event){
    this.searching = false;
    this.refreshData();
  }

  setFilteredItems(){
  	this.contacts = this.duplicates.filter(function(item){
            console.log(typeof item.name.formatted);
						return item.name && ((item.name.formatted+ "").toLowerCase()).indexOf(this.myInput.toLowerCase()) > -1;
				}.bind(this));
  }


  refreshData(){
    if(this.conversations.isPlatformSupportedByMe()){
      this.conversations.getContacts().then(function(con){
        this.contacts = con;
        this.duplicates = con;
      }.bind(this));
    }
  }
 

}
