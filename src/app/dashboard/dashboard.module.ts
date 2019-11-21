import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';

import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { TruckModule } from '@app/dashboard/truck/truck.module';
import { TrailerModule } from '@app/dashboard/trailer/trailer.module';
import { CarrierModule } from '@app/dashboard/carrier/carrier.module';
import { CalculatorModule } from '@app/dashboard/calculator/calculator.module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        TabMenuModule,
        DashboardRoutingModule,
        TruckModule,
        TrailerModule,
        CarrierModule,
        CalculatorModule
    ]
})
export class DashboardModule {

}