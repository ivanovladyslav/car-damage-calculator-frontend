import { NgModule } from '@angular/core';

import { CalculatorComponent } from '@app/dashboard/calculator/calculator.component';
import { CalculatorRoutingModule } from '@app/dashboard/calculator/calculator-routing.module';

@NgModule({
    declarations: [
        CalculatorComponent
    ],
    imports: [
        CalculatorRoutingModule
    ]
})
export class CalculatorModule {

}