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

    constructor(private readonly apollo: Apollo) {}

    ngAfterViewInit(): void {
    }

    async makeCalculation(): Promise<void> {
        const vehicleIDs = await this.vehiclesForms.toArray().map((vf) => {
            return vf.vehicle.id;
        });
        console.log(vehicleIDs);
        const { data } = await this.apollo.query<any>({
            variables: { 
                vehicleIDs: vehicleIDs,
                cargoWeight: parseInt(this.cargoWeight)
             },
            query: gql`
                query calculation($vehicleIDs: [String], $cargoWeight: Int!) {
                    calculation(vehicleIDs: $vehicleIDs, cargoWeight: $cargoWeight) {
                        amount
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        }).toPromise();


        console.log(data);
    }

    addVehicle(): void {
        this.vehicles.push(new Vehicle());
    }

    removeVehicle(): void {
        this.vehicles.pop();
    }
}