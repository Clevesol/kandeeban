import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationsPage } from '../conversations/conversations';
import { TemplatesPage } from '../templates/templates';
import { PreferencesPage } from '../preferences/preferences';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  conversationsPage = ConversationsPage;
  templatesPage = TemplatesPage;
  preferencesPage = PreferencesPage;
  

  constructor(public navCtrl: NavController) {

  }

}
