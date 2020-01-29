import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { TruckComponent } from '@app/dashboard/truck/truck.component';
import { TrailerModule } from '@app/dashboard/trailer/trailer.module';
import { CalculatorModule } from '@app/dashboard/calculator/calculator.module';

import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';

@NgModule({
    declarations: [
        DashboardComponent,
        CarrierComponent,
        TruckComponent
    ],
    imports: [
        FormsModule,
        InputTextModule,
        SelectButtonModule,
        AutoCompleteModule,
        TabMenuModule,
        DashboardRoutingModule,
        TrailerModule,
        CalculatorModule
    ]
})
export class DashboardModule {

}