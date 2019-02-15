import { NgModule } from '@angular/core';

import { ComposeMessageComponent } from './compose-message/compose-message';
import { CreateGroupComponent } from './create-group/create-group';
import { GroupAutoComponent } from './group-auto/group-auto';
import { IonicModule } from 'ionic-angular';
import { SelectgroupsComponent } from './selectgroups/selectgroups';
import { GroupSelectionComponent } from './group-selection/group-selection';
import { GroupPopoverComponent } from './group-popover/group-popover';
import { TemplatesManagerComponent } from './templates-manager/templates-manager';
import { ContactListComponent } from './contact-list/contact-list';
@NgModule({
	declarations: [ComposeMessageComponent,
    CreateGroupComponent,
    GroupAutoComponent,
    SelectgroupsComponent,
    GroupSelectionComponent,
    GroupPopoverComponent,
    TemplatesManagerComponent,
    ContactListComponent],
	imports: [IonicModule],
	exports: [ComposeMessageComponent,
    CreateGroupComponent,
    GroupAutoComponent,
    SelectgroupsComponent,
    GroupSelectionComponent,
    GroupPopoverComponent,
    TemplatesManagerComponent,
    ContactListComponent],
    entryComponents:[
        ComposeMessageComponent,
        CreateGroupComponent,
        GroupAutoComponent,
        GroupSelectionComponent,
        GroupPopoverComponent,
        TemplatesManagerComponent,
        ContactListComponent
    ]
})
export class ComponentsModule {}
