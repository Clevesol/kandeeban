import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { ConverstationCoreProvider } from '../../providers/converstation-core/converstation-core';
import { Contacts, Contact, ContactName } from '@ionic-native/contacts';
import { Group } from '../../objs/group';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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
  private excludeMode;

  // private contacts;

  constructor(private conversations:ConverstationCoreProvider,
    private viewCtrl:ViewController
    ,private cont:Contacts,
    
     private navParams:NavParams) {


    this.selectedList = this.navParams.get("data");
    this.searchBar = new FormControl();
    this.excludeMode = this.navParams.get('mode');

    // this.cont.find(["displayName"]).then(function(contactlist){
    //     console.log(contactlist);
    //     this.contacts = contactlist;
    // }.bind(this));

    // this.conversations.isPlatformSupportedByMe()
    // if(this.conversations.isPlatformSupportedByMe()){
    //   this.conversations.getContacts2().then(function(con){
    //     console.log('contacts from :  conversation-core',con);
    //     this.contacts = con;
    //     this.duplicates = this.contacts;
    //     this.listLength = con.length <= this.listLength ? con.length : this.listLength;
    //     this.items = this.contacts.slice(0, this.listLength);
    //   }.bind(this));
    // }

    
  }


  private selectedList;

  done(){
    this.viewCtrl.dismiss(this.selectedList);
  }

  private expandingList:any = false;

  toggle($event,$index){
 //   var conNumber = this.items[$index].contactId;
    this.expandingList = $index;
  }

  toggleNumber(idx){

    var cExcist = -1;


    for (let index = 0; index < this.selectedList.length; index++) {
      const addedContacts = this.selectedList[index];
      if(addedContacts.id === this.items[this.expandingList].id){
        cExcist = index;
        break;
      }
    }


    console.log(idx, cExcist, 'first');

    if(cExcist > -1){

       
        if(this.selectedList[cExcist].phoneNumbers[idx].selected){
          this.selectedList[cExcist].phoneNumbers[idx].selected = false;
          this.selectedList[cExcist].selected -= 1;
        }else{
          
          this.selectedList[cExcist].phoneNumbers[idx].selected = true;
          this.selectedList[cExcist].selected += 1;
        }

    }else{
      console.log(this.items, idx, this.selectedList);
      this.items[this.expandingList].selected = 0;
        this.items[this.expandingList].phoneNumbers[idx].selected = true;
        this.items[this.expandingList].selected += 1;

        var cs:any = {};
        cs.id = this.items[this.expandingList].id;
        cs.name = {};
        cs.name.formatted = this.items[this.expandingList].name.formatted;
        cs.selected = this.items[this.expandingList].selected;
        cs.phoneNumbers = this.items[this.expandingList].phoneNumbers;
        this.selectedList.push(cs);
    }


    //console.log(this.selectedList);

    // var victim = this.items[this.expandingList].phoneNumbers[idx];
    // var selec = this.items[this.expandingList].phoneNumbers[idx].selected;

    // if(selec){
    //     var rmIdx;
    //     this.selectedList.array.forEach((element,index) => {
    //       if(element.contactNumber === victim.value){
    //         rmIdx = index;
    //       }
    //     });
    //     if(rmIdx > -1){
    //     this.selectedList.splice(rmIdx, 1);
    //     this.items[this.expandingList].phoneNumbers[idx].selected = false;
    //     this.items[this.expandingList].selected -= 1;
    //     }
    // }else{
    //   var contact:any = {};
    //   contact.contactId = this.items[this.expandingList].id;
    //   contact.name = this.items[this.expandingList].name.formatted;

    //   contact.cNtype = this.items[this.expandingList].phoneNumbers[idx].type;
    //   contact.contactNumber = this.items[this.expandingList].phoneNumbers[idx].value;
    //   this.selectedList.push(contact);
    //   this.items[this.expandingList].phoneNumbers[idx].selected = true;

    // }
  }



  private compareList;

  ionViewDidLoad(){
    if(!this.excludeMode){
      this.prepareCompareList();
    this.hardRefreshCont();

    



    // this.searchBar.valueChanges.debounceTime(400)
    // .distinctUntilChanged()
    // .subscribe(function(search){
    // 	this.searching = false;
    // 	if(this.myInput.length > 0){
    //     this.setFilteredItems();
        
    // 	}else{
    // 		this.refreshData();
    // 	}
    // }.bind(this));

    }else{
      this.contacts = this.selectedList;
      this.refreshData();
    }
  }
  prepareCompareList(): any {
    this.compareList = [];
    for(var c = 0; c < this.selectedList.length; c++){
      for(var j = 0; j < this.selectedList[c].phoneNumbers.length; j++){
        if(this.selectedList[c].phoneNumbers[j].selected){
          this.compareList.push(this.selectedList[c].phoneNumbers[j].value);
        }
      }
    }
  }

  closeMe(){
    this.selectedList = [];
    this.viewCtrl.dismiss();
  }

  toggleSection(i) {
    this.expandingList = i;
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
      return -1;
      //console.log(i, this.selectedList, (this.contacts[this.expandingList].phoneNumbers[i].value));
      // return (this.expandingList >= 0) && this.selectedList.includes(parseInt(this.contacts[this.expandingList].phoneNumbers[i].value));
  }

  isContactsSelected(i){
   // let contact = this.contacts[i];
    for(let chkIdx = 0; chkIdx < this.selectedList.length; chkIdx++){
      
      if(this.contacts[i].id === this.selectedList[chkIdx].id){
          return chkIdx;
      }
    }
    return -1;
  }
 
  private searching = false;
  private inSearch = false;
  onInput($event){
    this.searching = true;
    this.inSearch = true;
    this.setFilteredItems();
  }

  onCancel($event){
    this.searching = false;
    this.inSearch = false;
    this.myInput = "";

    
    setTimeout(function(){
      this.prepareCompareList();
      this.tinyRefresh();
    }.bind(this), 40);

    if($event.complete){
      $event.complete();
    }
    return true;
    
  }

  setFilteredItems(){
  	this.items = this.duplicates.filter(function(item){
						return item.name.formatted && (((item.name.formatted+ "").toLowerCase()).indexOf(this.myInput.toLowerCase()) === 0);
        }.bind(this));
        
        this.searching = false;
  }


  refreshData(){
    this.items = this.contacts.slice(0, this.listLength);
  }

 


  private items = [];
  private  listLength = 30;

  doInfinite($event){
    if(!this.inSearch){
      setTimeout(function(){
        
      let startIdx = this.items.length === 0 ? 0 : this.items.length;
        this.items = this.items.concat(this.contacts.slice(startIdx, this.items.length + this.listLength));
        $event.complete();
      
    }.bind(this), 120);
  }else{
    $event.complete();
  }
  }


  public doRefresh(refresher) {
   
      // this.conversations.hardRefresh().then(function(data){
      //   this.hardRefreshCont().then(function(data){
      //     console.log('refersh finished');
      //     refresher.complete();
      //   }.bind(this));
      // }.bind(this));
    setTimeout(function(){
      refresher.complete();
    }.bind(this), 200);
  }


  hardRefreshCont(){
    console.log('hard refresh started');

    return new Promise(function(resolve){
      this.conversations.test().then(function(arr){
        this.contacts = arr;
        if(!this.excludeMode){
          for(var b=0; b < this.compareList.length;b++){
            for(var t = 0; t < this.contacts.length; t++){
              if(this.contacts[t] && this.contacts[t].phoneNumbers){
                for(var u =0; u < this.contacts[t].phoneNumbers.length;u++){
                  if(this.contacts[t].phoneNumbers[u].value === this.compareList[b]){
                    this.contacts[t].phoneNumbers[u].selected = true;
                    this.contacts[t].selected += 1;
                    this.compareList.splice(b,1);
                  }
                }
              }
            }
          }
        }
        this.duplicates = this.contacts;
        this.listLength = this.contacts.length <= this.listLength ? this.contacts.length : this.listLength;
        this.items = this.contacts.slice(0, this.listLength);
        resolve(true);
        }.bind(this));
    }.bind(this));
    
  }


  tinyRefresh(){
    return new Promise(function(resolver){
        if(!this.excludeMode){
          for(var b=0; b < this.compareList.length;b++){
            for(var t = 0; t < this.contacts.length; t++){
              if(this.contacts[t] && this.contacts[t].phoneNumbers){
                for(var u =0; u < this.contacts[t].phoneNumbers.length;u++){
                  if(this.contacts[t].phoneNumbers[u].value === this.compareList[b]){
                    this.contacts[t].phoneNumbers[u].selected = true;
                    this.contacts[t].selected += 1;
                    this.compareList.splice(b,1);
                  }
                }
              }
            }
          }
        }
        this.duplicates = this.contacts;
        this.listLength = this.contacts.length <= this.listLength ? this.contacts.length : this.listLength;
        this.items = this.contacts.slice(0, this.listLength);
        resolver(true);
    }.bind(this));
  }

 

}
