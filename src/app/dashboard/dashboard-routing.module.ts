import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';
import { VehicleComponent } from '@app/dashboard/vehicle/vehicle.component';
import { CalculatorComponent } from '@app/dashboard/calculator/calculator.component';
import { PathComponent } from './path/path.component';
import { CalculationsListComponent } from './calculations-list/calculations-list.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'dashboard/carrier',
        children: [
            { path: '', component: CarrierComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    },
    {
        path: 'dashboard/vehicle',
        children: [
            { path: '', component: VehicleComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    },
    {
        path: 'dashboard/trailer',
        children: [
            { path: '', component: VehicleComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    },
    {
        path: 'dashboard/calculator',
        children: [
            { path: '', component: CalculatorComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    },
    {
        path: 'dashboard/path',
        children: [
            { path: '', component: PathComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    },
    {
        path: 'dashboard/calculations',
        children: [
            { path: '', component: CalculationsListComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    }
];

@NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}