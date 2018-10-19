import { Component } from '@angular/core';

/**
 * Generated class for the SelectgroupsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'selectgroups',
  templateUrl: 'selectgroups.html'
})
export class SelectgroupsComponent {

  text: string;

  constructor() {
    console.log('Hello SelectgroupsComponent Component');
    this.text = 'Hello World';
  }

}
