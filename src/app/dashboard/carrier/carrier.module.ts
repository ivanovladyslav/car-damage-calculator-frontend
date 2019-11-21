import { NgModule } from '@angular/core';

import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';
import { CarrierRoutingModule } from '@app/dashboard/carrier/carrier-routing.module';

@NgModule({
    declarations: [
        CarrierComponent
    ],
    imports: [
        CarrierRoutingModule
    ]
})
export class CarrierModule {

}