import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent} from '@app/dashboard/dashboard.component'
import { CalculatorComponent } from '@app/dashboard/calculator/calculator.component';

const routes: Routes = [
    {
        path: 'dashboard/calculator',
        children: [
            { path: '', component: CalculatorComponent },
            { path: '', component: DashboardComponent, outlet: 'dashboard' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CalculatorRoutingModule {
    
}