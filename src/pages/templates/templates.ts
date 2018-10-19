import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { TemplatesManagerProvider } from '../../providers/templates-manager/templates-manager';
import { TemplatesManagerComponent } from '../../components/templates-manager/templates-manager';
/**
 * Generated class for the TemplatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-templates',
  templateUrl: 'templates.html',
})
export class TemplatesPage {
  

  private templates = [];
  private mode;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public templatesM:TemplatesManagerProvider,
    public alert:AlertController,
    private modal:ModalController,
    private viewController:ViewController) {

      
      this.mode = this.navParams.get("mode");

  }

  private refreshTemplates() {
    this.templatesM.getTemplates().then(function(templates){
      this.templates = templates;
    }.bind(this));
  }

  updateTemplate(idx){
    let templateManager = this.modal.create(TemplatesManagerComponent, {data: idx},{});
    templateManager.onDidDismiss(function(){
      this.refreshTemplates();
    }.bind(this));

    templateManager.present();
  }

  createTemplate(){
    let templateManager = this.modal.create(TemplatesManagerComponent, {data: -1},{});
    templateManager.onDidDismiss(function(){
      this.refreshTemplates();
    }.bind(this));

    templateManager.present();
  }

  removeTemplate(idx){
      this.alert.create({title:"Delete Template", 
      message: "delete template? cannot be undone", 
      buttons:[
      {text:'Cancel', role:'cancel'},
      {text:"Delete", handler:function(){
        this.templatesM.removeTemplate(idx);
      }.bind(this)}
    
    ]})
  }

  send(idx){

    // this.templatesM.getTemplates().then(function(data){

      this.viewController.dismiss(this.templates[idx]);
    // }.bind(this));
    
  }

  ionViewDidLoad() {
    this.refreshTemplates();
  }

  closeMe(){
    this.viewController.dismiss();
  }

}
