// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

import {GROUP_IDENTIFIER} from '../../providers/global.constants';
import {Group} from '../../objs/group';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the GroupmanagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupmanagerProvider {

  private groups:Array<Group>;

  constructor(private storage:Storage, private toast:ToastController) {
    this.groups = [];
  }


  getGroups(){
    return this.storage.get(GROUP_IDENTIFIER);
  }

  saveGroups(){
    this.storage.set(GROUP_IDENTIFIER, JSON.stringify(this.groups)).then((data)=> {
      console.log("saved groups ", JSON.stringify(this.groups));
      this.toast.create({message: "groups updated", duration: 700, position:'bottom'}).present();

    });
  }

  updateGroupContacts(group,contacts){

    this.getGroups().then(function(groups){
      if(groups){
        this.groups = JSON.parse(groups);
      }
      if(parseInt(group) > -1){
        this.groups[group].contacts = contacts;
        this.saveGroups();
      }
    }.bind(this));
    

  }


  addGroup(group:Group){
    this.getGroups().then(function(groupsData){

      if(groupsData){
        this.groups = JSON.parse(groupsData);
      }
      
      console.log('adding group',JSON.stringify(this.groups));
      this.groups.push(group);
      this.saveGroups();
    }.bind(this));
  }

  removeGroup(idx){
    
    this.getGroups().then(function(groupsGet){
      this.groups = JSON.parse(groupsGet);
        this.groups.splice(idx,1);
        console.log('removed', this.groups);
        this.saveGroups();
    }.bind(this));
    
   
    //this.saveGroups();
  }

  public checkExist(name){
    return new Promise(function(resolve){
      if(name.length <= 0){
        resolve(true);
        return;
      }
      this.getGroups().then(function(g){
        g = JSON.parse(g);
        for(let t = 0; t < g.length;t++){
          if(g[t].name === name){
            resolve(true);
            break;
          }
        }
        resolve(false);
      }.bind(this));
    }.bind(this));
  }

  

}
