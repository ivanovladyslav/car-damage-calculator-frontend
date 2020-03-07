import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { VehicleComponent, Vehicle } from '../vehicle/vehicle.component';
import { Path, PathComponent } from '../path/path.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CarrierComponent } from '../carrier/carrier.component';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
    @ViewChildren(VehicleComponent) vehiclesForms: QueryList<VehicleComponent>; 
    @ViewChildren(PathComponent) pathsForms: QueryList<PathComponent>; 
    @ViewChild(CarrierComponent, { static: false }) carrierForm: CarrierComponent;

    cargoWeight: string;
    vehicles: Array<Vehicle> = [];
    paths: Array<Path> = [];
    logs: Array<string>;

    constructor(private readonly apollo: Apollo) {}

    async makeCalculation(): Promise<void> {
        const vehiclesLoads = await this.vehiclesForms.toArray().map((vf) => {
            return {
                id: vf.vehicle.id,
                cargoWeight: vf.cargoWeight
            };
        });
        const pathsIDs = await this.pathsForms.toArray().map(pi => pi.path.id);
        
        const { data } = await this.apollo.query<any>({
            variables: { 
                vehiclesLoads,
                pathsIDs,
                carrierID: this.carrierForm.carrier.id.toString()
            },
            query: gql`
                query calculation($vehiclesLoads: [VehicleLoad], $pathsIDs: [Int], $carrierID: String) {
                    calculation(vehiclesLoads: $vehiclesLoads, pathsIDs: $pathsIDs, carrierID: $carrierID) {
                        amount
                        logs
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        }).toPromise();

        this.logs = data.calculation.logs;
        console.log(data);
    }

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