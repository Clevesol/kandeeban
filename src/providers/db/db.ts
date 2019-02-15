import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { DB_OPTIONS, APP_KEY_DB_CREATED, DB_SQL } from '../global.constants';
import { Platform } from 'ionic-angular';
import { ConversationDetailsPage } from '../../pages/conversation-details/conversation-details';

import {BehaviorSubject} from 'rxjs/Rx';
/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  private db:SQLiteObject;
  private dbCreated:boolean = false;
  private databaseReady:BehaviorSubject<boolean>;

  constructor(private plt:Platform,private sqLite: SQLite,private storage:Storage) {
    
    this.databaseReady = new BehaviorSubject(false);
    this.prepareOrOpenDB().then(function(state){
      this.dbCreated = state;
    }.bind(this));
  }



  prepareOrOpenDB(){

    return new Promise(function(resolve){
      this.plt.ready().then(function(){
        this.sqLite.create(DB_OPTIONS).then(function(db:SQLiteObject){
          this.db = db;
          this.storage.get(APP_KEY_DB_CREATED).then(function(data){
            if(data){
                this.databaseReady.next(true);
                resolve(true);
            }else{
                this.prepareDB().then(function(data){
                  this.databaseReady.next(true);
                  resolve(data);
                }.bind(this));
            }
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));

    
  }

  prepareDB(){
    return new Promise(function(resolve){
      this.db.sqlBatch(DB_SQL).then(function(data){
        console.log('db created for', DB_SQL);
        this.storage.set(APP_KEY_DB_CREATED, true);
        resolve(true);
      }.bind(this));
    }.bind(this));
  }


  sqlBatch(statement){
    return new Promise(function(resolve){
        this.db.sqlBatch(statement).then(function(data){
          resolve(true);
        }.bind(this));
    }.bind(this));
  }


  addData(query,data){

    return new Promise(function(resolve){
      this.db.transaction(function(tx){
        var s = tx.executeSql(query, data, function(tx,result){
          resolve(result);
        }.bind(this), err =>{console.log(err)});
      }.bind(this)).then(function(data){
        resolve(data);
      });
    }.bind(this));
    
  }

  exctSql(sql){
    return this.db.executeSql(sql);
  }

  getRecords(query){
    return new Promise(function(resolve){

      this.getState().subscribe(function(ready){
        if(ready){
          this.db.executeSql(query,[]).then(function(data){
            let records = [];
            for(var i = 0; i < data.rows.length; i++){
              records.push(data.rows.item(i));
            }
            resolve(records);
          }.bind(this)).catch(err => {console.log(err)});
        }
      }.bind(this));
      
        
    }.bind(this));
  }


  getState(){
    return this.databaseReady.asObservable();
  }

}
