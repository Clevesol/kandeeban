import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { TemplatesManagerProvider } from '../../providers/templates-manager/templates-manager';

/**
 * Generated class for the TemplatesManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'templates-manager',
  templateUrl: 'templates-manager.html'
})
export class TemplatesManagerComponent {

  private text: string;
  private mode;


  constructor(private navParams:NavParams, 
    private view:ViewController,
    private templateM:TemplatesManagerProvider) {
    this.mode = parseInt(navParams.get("data"));

    if(this.mode > -1){
        this.templateM.getTemplates().then(function(data){
          this.text = data[this.mode];
        }.bind(this));
    }
  }

  closeMe(){
    this.view.dismiss();
  }



  addTemplate(){
    this.templateM.addTemplate(this.text);
    this.closeMe();
  }

  updateTemplate(){
    this.templateM.updateTemplate(this.mode, this.text);
  }

}
