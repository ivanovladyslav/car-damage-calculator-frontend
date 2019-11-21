import { NgModule } from '@angular/core';

import { TruckComponent } from '@app/dashboard/truck/truck.component';
import { TruckRoutingModule } from '@app/dashboard/truck/truck-routing.module';

@NgModule({
    declarations: [
        TruckComponent
    ],
    imports: [
        TruckRoutingModule
    ]
})
export class TruckModule {

}