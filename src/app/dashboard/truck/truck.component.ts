import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { SelectItem } from 'primeng/api';

interface Vehicle {
    id: string;
    name: string | null;
    type: 'Тягач' | 'Прицеп' | ''; 
    basicWeight: number;
    maxCargoWeight: number;
    fullWeight: number;
    length: number;
    width: number;
    height: number;
    axisDistances: string;
    frontAxisBasicWeight: number;
    frontAxisFullWeight: number;
    backAxisBasicWeight: number;
    backAxisFullWeight: number;
}

interface VehiclesList {
    vehicles: Vehicle[] | null;
}

@Component({
    selector: 'truck',
    templateUrl: './truck.component.html'
})
export class TruckComponent implements OnInit {
    types: SelectItem[];

    truck: any;

    trucks: Array<any>;

    vehicles: Vehicle[];

    filteredVehicles: Array<Vehicle>;

    vehicle: Vehicle;

    createMode: boolean = false;

    constructor(private readonly apollo: Apollo) {
        this.types = [
            {label: 'Тягач', value: 'Тягач'},
            {label: 'Прицеп', value: 'Прицеп'}
        ]
    }

    async ngOnInit(): Promise<void> {
        const type = "Тягач";

        const { data } = await this.apollo.query<VehiclesList>({
            variables: { type },
            query: gql`
                query vehicles($type: String!) {
                    vehicles(type: $type) {
                        id
                        name
                        type
                        basicWeight
                        maxCargoWeight
                        fullWeight
                        length
                        width
                        height
                        axisDistances
                        frontAxisBasicWeight
                        frontAxisFullWeight
                        backAxisBasicWeight
                        backAxisFullWeight
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

    async updateVehicle(): Promise<void> {
        console.log("update")
        console.log(this.vehicle);

        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation updateVehicle($id: String!, $input: VehicleInput) {
                        updateVehicle(id: $id, input: $input) {
                            name
                        }
                    }
                `,
                variables: {
                    id: this.vehicle.id,
                    input: {
                        name: this.vehicle.name,
                        type: this.vehicle.type,
                        basicWeight: this.vehicle.basicWeight,
                        maxCargoWeight: this.vehicle.maxCargoWeight,
                        fullWeight: this.vehicle.fullWeight,
                        length: this.vehicle.length,
                        width: this.vehicle.width,
                        height: this.vehicle.height,
                        axisDistances: this.vehicle.axisDistances,
                        frontAxisBasicWeight: this.vehicle.frontAxisBasicWeight,
                        frontAxisFullWeight: this.vehicle.frontAxisFullWeight,
                        backAxisBasicWeight: this.vehicle.backAxisBasicWeight,
                        backAxisFullWeight: this.vehicle.backAxisFullWeight
                    }
                }
            }).toPromise();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteVehicle(): Promise<void> {
        console.log('delete');
        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation deleteVehicle($id: String!) {
                        deleteVehicle(id: $id) {
                            name
                        }
                    }
                `,
                variables: {
                    id: this.vehicle.id
                }
            }).toPromise();
        } catch (e) {
            console.log(e);
        } 
    }

    createModeOn(): void {
        this.createMode = true;
        this.vehicle = {
            id: '',
            name: '',
            type: '',
            basicWeight: null,
            maxCargoWeight: null,
            fullWeight: null,
            length: null,
            width: null,
            height: null,
            axisDistances: '',
            frontAxisBasicWeight: null,
            frontAxisFullWeight: null,
            backAxisBasicWeight: null,
            backAxisFullWeight: null
        };
    }

    createModeOff(): void {
        this.createMode = false;
        this.vehicle = null;
    }
}