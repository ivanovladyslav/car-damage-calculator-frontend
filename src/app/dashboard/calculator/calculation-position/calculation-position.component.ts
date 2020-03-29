import { Component, ViewChildren, QueryList } from '@angular/core';
import { VehicleComponent } from '../../vehicle/vehicle.component';
import { PathComponent } from '../../path/path.component';
import { Vehicle, Path } from '../../types';

@Component({
    selector: 'calculation-position',
    templateUrl: './calculation-position.component.html'
})
export class CalculationPositionComponent {
    @ViewChildren(VehicleComponent) vehiclesForms: QueryList<VehicleComponent>; 
    @ViewChildren(PathComponent) pathsForms: QueryList<PathComponent>;

    vehicles: Array<Vehicle> = [];
    paths: Array<Path> = [];

    addVehicle(): void {
        this.vehicles.push(new Vehicle());
    }

    removeVehicle(): void {
        this.vehicles.pop();
    }
    
    addPath(): void {
        this.paths.push(new Path());
    }

    removePath(): void {
        this.paths.pop();
    }
}