import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface Vehicle {
    id: string;
    name: string | null;
}

interface VehiclesList {
    vehicles: Vehicle[] | null;
}

@Component({
    selector: 'truck',
    templateUrl: './truck.component.html'
})
export class TruckComponent implements OnInit {
    truck: any;

    trucks: Array<any>;

    vehicles: Vehicle[];

    filteredVehicles: Array<Vehicle>;

    vehicle: Vehicle = { id: null, name: ''};

    constructor(private readonly apollo: Apollo) {}

    async ngOnInit(): Promise<void> {
        const type = "Тягач";

        const { data } = await this.apollo.query<VehiclesList>({
            variables: { type },
            query: gql`
                query vehicles($type: String!) {
                    vehicles(type: $type) {
                        id
                        name
                    }
                }
            `
        }).toPromise();

        this.vehicles = data.vehicles;
    }

    filterVehicles(event) {
        this.filteredVehicles = [];
        for(let i = 0; i < this.vehicles.length; i++) {
            let v = this.vehicles[i];
            if(v.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredVehicles.push(v);
            }
        }
    }
}