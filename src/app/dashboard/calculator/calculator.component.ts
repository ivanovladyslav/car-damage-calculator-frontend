import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements AfterViewInit {
    @ViewChild("truck", { static: false }) truck: VehicleComponent;
    @ViewChild("trailer", { static: false }) trailer: VehicleComponent;

    cargoWeight: number = 0;

    constructor(private readonly apollo: Apollo) {}

    ngAfterViewInit(): void {
    }

    async makeCalculation(): Promise<void> {
        const { data } = await this.apollo.query<any>({
            variables: { 
                truckId: this.truck.vehicle.id, 
                trailerId: this.trailer.vehicle.id,
                cargoWeight: this.cargoWeight
             },
            query: gql`
                query calculation($truckId: String!, $trailerId: String!, $cargoWeight: Int!) {
                    calculation(truckId: $truckId, trailerId: $trailerId, cargoWeight: $cargoWeight) {
                        amount
                    }
                }
            `
        }).toPromise();


        console.log(data);
    }
}