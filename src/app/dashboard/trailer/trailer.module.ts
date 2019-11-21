import { NgModule } from '@angular/core';

import { TrailerComponent } from '@app/dashboard/trailer/trailer.component';
import { TrailerRoutingModule } from '@app/dashboard/trailer/trailer-routing.module';

@NgModule({
    declarations: [
        TrailerComponent
    ],
    imports: [
        TrailerRoutingModule
    ]
})
export class TrailerModule {

}