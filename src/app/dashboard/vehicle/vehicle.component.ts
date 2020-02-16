import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { SelectItem } from 'primeng/api';

export class Vehicle {
    id: string = '';
    name: string | null = null;
    type: 'Тягач' | 'Прицеп' | '' = ''; 
    basicWeight: number = null;
    maxCargoWeight: number = null;
    fullWeight: number = null;
    length: number = null;
    width: number = null;
    height: number = null;
    axisDistances: string = '';
    frontAxisDoubleWheels: boolean = false;
    backAxisDoubleWheels: boolean = false;
    frontAxisBasicWeight: number = null;
    frontAxisFullWeight: number = null;
    backAxisBasicWeight: number = null;
    backAxisFullWeight: number = null;
    saddleDevice: boolean = false;
}

interface VehiclesList {
    vehicles: Vehicle[] | null;
}

@Component({
    selector: 'vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit {
    @Input() type: string;
    @Input() cargoWeightInput: boolean;

    types: Array<SelectItem>;
    vehicles: Array<Vehicle>;
    filteredVehicles: Array<Vehicle>;
    vehicle: Vehicle;
    editMode: boolean = false;
    cargoWeight: number = 0;

    constructor(private readonly apollo: Apollo) {
        this.types = [
            {label: 'Тягач', value: 'Тягач'},
            {label: 'Прицеп', value: 'Прицеп'}
        ]
    }

    ngOnInit(): void {
        this.getVehicles();
    }

    async getVehicles(): Promise<void> {
        const { data } = await this.apollo.query<VehiclesList>({
            query: gql`
                query vehicles {
                    vehicles {
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
                        frontAxisDoubleWheels
                        backAxisDoubleWheels
                        frontAxisBasicWeight
                        frontAxisFullWeight
                        backAxisBasicWeight
                        backAxisFullWeight
                        saddleDevice
                    }
                }
            `,
            fetchPolicy: 'no-cache'
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
                        frontAxisDoubleWheels: this.vehicle.frontAxisDoubleWheels,
                        backAxisDoubleWheels: this.vehicle.backAxisDoubleWheels,
                        frontAxisBasicWeight: this.vehicle.frontAxisBasicWeight,
                        frontAxisFullWeight: this.vehicle.frontAxisFullWeight,
                        backAxisBasicWeight: this.vehicle.backAxisBasicWeight,
                        backAxisFullWeight: this.vehicle.backAxisFullWeight,
                        saddleDevice: this.vehicle.saddleDevice
                    }
                }
            }).toPromise()

            this.getVehicles();
        } catch (e) {
            console.log(e);
        }
    }

    async upsertVehicle(): Promise<void> {
        console.log("create")
        console.log(this.vehicle);

        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation upsertVehicle($input: VehicleInput) {
                        upsertVehicle(input: $input) {
                            name
                        }
                    }
                `,
                variables: {
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
                        frontAxisDoubleWheels: this.vehicle.frontAxisDoubleWheels,
                        backAxisDoubleWheels: this.vehicle.backAxisDoubleWheels,
                        frontAxisBasicWeight: this.vehicle.frontAxisBasicWeight,
                        frontAxisFullWeight: this.vehicle.frontAxisFullWeight,
                        backAxisBasicWeight: this.vehicle.backAxisBasicWeight,
                        backAxisFullWeight: this.vehicle.backAxisFullWeight,
                        saddleDevice: this.vehicle.saddleDevice
                    }
                }
            }).toPromise()

            this.getVehicles();
            this.editModeOff();
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

            this.getVehicles();
            this.editModeOff()
        } catch (e) {
            console.log(e);
        } 
    }

    editModeOn(): void {
        this.editMode = true;
        this.vehicle = new Vehicle();
    }

    editModeOff(): void {
        this.editMode = false;
        this.vehicle = null;
    }
}