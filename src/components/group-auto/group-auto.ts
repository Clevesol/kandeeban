import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  contacts =[
    {
      "name": "Cassio Zen",
      "email": "cassiozen@gmail.com",
      "phone" : "61232342344"
    },
    {
      "name": "Dan Abramov",
      "email": "gaearon@somewhere.com",
      "phone" : "612323423412"

    },
    {
      "name": "Pete Hunt",
      "email": "floydophone@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Cassio Zen",
      "email": "cassiozen@gmail.com",
      "phone" : "61232342344"
    },
    {
      "name": "Dan Abramov",
      "email": "gaearon@somewhere.com",
      "phone" : "612323423412"

    },
    {
      "name": "Pete Hunt",
      "email": "floydophone@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Paul O’Shannessy",
      "email": "zpao@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Ryan Florence",
      "email": "rpflorence@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Sebastian Markbage",
      "email": "sebmarkbage@here.com",
      "phone" : "612323423412"
    },
    {
      "name": "Cassio Zen",
      "email": "cassiozen@gmail.com",
      "phone" : "61232342344"
    },
    {
      "name": "Dan Abramov",
      "email": "gaearon@somewhere.com",
      "phone" : "612323423412"

    },
    {
      "name": "Pete Hunt",
      "email": "floydophone@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Paul O’Shannessy",
      "email": "zpao@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Ryan Florence",
      "email": "rpflorence@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Sebastian Markbage",
      "email": "sebmarkbage@here.com",
      "phone" : "612323423412"
    },
    {
      "name": "Paul O’Shannessy",
      "email": "zpao@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Ryan Florence",
      "email": "rpflorence@somewhere.com",
      "phone" : "612323423412"
    },
    {
      "name": "Sebastian Markbage",
      "email": "sebmarkbage@here.com",
      "phone" : "612323423412"
    }
  ];

  constructor(private viewCtrl:ViewController) {
  }

  closeMe(){
    this.viewCtrl.dismiss();
  }

}
