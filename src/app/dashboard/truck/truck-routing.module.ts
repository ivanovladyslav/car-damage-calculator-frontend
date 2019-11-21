import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent} from '@app/dashboard/dashboard.component'
import { TruckComponent } from '@app/dashboard/truck/truck.component';

const routes: Routes = [
    {
        path: 'dashboard/truck',
        children: [
            { path: '', component: TruckComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class TruckRoutingModule {
    
}