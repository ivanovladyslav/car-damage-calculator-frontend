import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox'
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { VehicleComponent } from '@app/dashboard/vehicle/vehicle.component';
import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';
import { CalculatorComponent } from '@app/dashboard/calculator/calculator.component';
import { PathComponent } from '@app/dashboard/path/path.component';
import { DocumentComponent } from '@app/dashboard/document/document.component';
import { CalculationPositionComponent } from '@app/dashboard/calculator/calculation-position/calculation-position.component';
import { CalculationsListComponent } from '@app/dashboard/calculations-list/calculations-list.component';

@NgModule({
    declarations: [
        DashboardComponent,
        CarrierComponent,
        VehicleComponent,
        CalculatorComponent,
        PathComponent,
        DocumentComponent,
        CalculationPositionComponent,
        CalculationsListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        SelectButtonModule,
        AutoCompleteModule,
        TabMenuModule,
        DashboardRoutingModule,
        ButtonModule,
        CheckboxModule,
        ReactiveFormsModule,
        DropdownModule,
        TableModule
    ]
})
export class DashboardModule {

}