import { Component, Input, OnInit } from "@angular/core";
import { VehiclePassport, Path, Carrier } from '../types';

@Component({
    selector: 'document',
    templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit {
    @Input() calculation: any;

    calculationPositions: Array<any>;
    carrier: Carrier;

    ngOnInit(): void {
        console.log(this.calculation);
        this.calculationPositions = this.calculation.calculationPositions;
        this.carrier = this.calculation.carrier;
    }
}