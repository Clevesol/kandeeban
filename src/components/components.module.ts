import { NgModule } from '@angular/core';
import { ComposeMessageComponent } from './compose-message/compose-message';
import { CreateGroupComponent } from './create-group/create-group';
import { GroupAutoComponent } from './group-auto/group-auto';
@NgModule({
	declarations: [ComposeMessageComponent,
    CreateGroupComponent,
    GroupAutoComponent],
	imports: [],
	exports: [ComposeMessageComponent,
    CreateGroupComponent,
    GroupAutoComponent]
})
export class ComponentsModule {}
