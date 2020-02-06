import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule }   from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox'

import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { VehicleComponent } from '@app/dashboard/vehicle/vehicle.component';
import { TrailerModule } from '@app/dashboard/trailer/trailer.module';

import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';
import { CalculatorComponent } from '@app/dashboard/calculator/calculator.component';

@NgModule({
    declarations: [
        DashboardComponent,
        CarrierComponent,
        VehicleComponent,
        CalculatorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        SelectButtonModule,
        AutoCompleteModule,
        TabMenuModule,
        DashboardRoutingModule,
        TrailerModule,
        ButtonModule,
        CheckboxModule
    ]
})
export class DashboardModule {

}