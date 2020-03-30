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

    roundNumber(n: number): number {
        return Math.floor(n);
    }

    getPathsLength(paths: Array<any>): number {
        return paths.reduce((a, {length}) => a + length, 0);
    }

    getPricePerKm(vehiclePassports: Array<any>): number {
        let price = 0;

        vehiclePassports.forEach(vp => {
            console.log(vp.axisLoads)
            price += vp.axisLoads.reduce((a, {cost}) => a + cost, 0);
        });
        
        return price;
    }
}