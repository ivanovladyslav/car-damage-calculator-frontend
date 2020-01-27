import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@app/dashboard/dashboard.component';

import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';
import { TruckComponent } from '@app/dashboard/truck/truck.component';

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
        path: 'dashboard/truck',
        children: [
            { path: '', component: TruckComponent },
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