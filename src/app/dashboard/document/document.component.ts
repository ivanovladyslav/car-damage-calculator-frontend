import { Component, Input } from "@angular/core";
import { VehiclePassport, Path, Carrier } from '../types';

@Component({
    selector: 'document',
    templateUrl: './document.component.html'
})
export class DocumentComponent {
    @Input() vehiclePassports: Array<VehiclePassport>;
    @Input() paths: Array<Path>;
    @Input() carrier: Carrier;
}