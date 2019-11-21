import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent} from '@app/dashboard/dashboard.component'
import { TrailerComponent } from '@app/dashboard/trailer/trailer.component';

const routes: Routes = [
    {
        path: 'dashboard/trailer',
        children: [
            { path: '', component: TrailerComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class TrailerRoutingModule {
    
}