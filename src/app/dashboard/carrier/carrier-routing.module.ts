import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent} from '@app/dashboard/dashboard.component'
import { CarrierComponent } from '@app/dashboard/carrier/carrier.component';

const routes: Routes = [
    {
        path: 'dashboard/carrier',
        children: [
            { path: '', component: CarrierComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CarrierRoutingModule {
    
}