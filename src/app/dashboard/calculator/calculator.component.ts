import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { VehicleComponent, Vehicle } from '../vehicle/vehicle.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements AfterViewInit {
    @ViewChildren(VehicleComponent) vehiclesForms: QueryList<VehicleComponent>; 
    // @ViewChild("trailer", { static: false }) trailer: VehicleComponent;

    cargoWeight: string;

    vehicles: Array<Vehicle> = [];

    logs: Array<string>;

    constructor(private readonly apollo: Apollo) {}

    ngAfterViewInit(): void {
    }

    async makeCalculation(): Promise<void> {
        const vehiclesLoads = await this.vehiclesForms.toArray().map((vf) => {
            return {
                id: vf.vehicle.id,
                cargoWeight: vf.cargoWeight
            };
        });
        console.log(vehiclesLoads);
        const { data } = await this.apollo.query<any>({
            variables: { 
                vehiclesLoads: vehiclesLoads
            },
            query: gql`
                query calculation($vehiclesLoads: [VehicleLoad]) {
                    calculation(vehiclesLoads: $vehiclesLoads) {
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
}