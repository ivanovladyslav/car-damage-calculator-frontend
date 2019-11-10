import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';

import { CalculatorComponent } from './calculator.component';

@NgModule({
    declarations: [ CalculatorComponent ],
    imports: [ 
        CommonModule,
        AutoCompleteModule,
        DropdownModule,
        BrowserAnimationsModule
     ],
    exports: [ CalculatorComponent ],
    bootstrap: [ CalculatorComponent ]
}) 
export class CalculatorModule {}