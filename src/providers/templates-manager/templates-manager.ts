import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {TEMPLATES_IDENTIFIER} from '../global.constants';
/*
  Generated class for the TemplatesManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemplatesManagerProvider {

  constructor(public storage:Storage) {
    console.log('Hello TemplatesManagerProvider Provider');
  }

  private templates = [];

  getTemplates(){
    return new Promise(function(resolve){
      return this.storage.get(TEMPLATES_IDENTIFIER).then(function(data){
        if(!data){
          data = "[]";
        }
        this.templates = JSON.parse(data);
        resolve(this.templates);
      }.bind(this));
    }.bind(this));
  }

  saveTemplates(){
    this.storage.set(TEMPLATES_IDENTIFIER, JSON.stringify(this.templates)).then(function(data){
      console.log('templates saved');
    });
  }

  addTemplate(template){
    this.getTemplates().then(function(templates:any){
      this.templates = templates;
      this.templates.push(template);
      this.saveTemplates();
    }.bind(this));


  }

  updateTemplate(idx, template){
    this.getTemplates().then(function(templates){
      this.templates = templates;
      this.templates[idx] = template;
      this.saveTemplates();
    }.bind(this));
  }

  deleteTemplate(idx){
    this.getTemplates().then(function(templates){
      if(idx > -1){
        this.templates = templates;
        this.templates.splice(idx,1);
        this.saveTemplates();
      }
    }.bind(this));
  }

}
