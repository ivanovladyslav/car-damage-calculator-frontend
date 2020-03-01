import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

class Carrier {
    public id!: number;
    public name!: string;
    public postcode: number;
    public address: string;
    public phoneNumber: string;
    public INN: string;
    public KPP?: string;
    public managerPosition: string;
    public managerFullName: string; 
    bankCredentials: string;
}

interface CarrierList {
    carriers: Array<Carrier>;
}

@Component({
    selector: 'carrier',
    templateUrl: './carrier.component.html'
})
export class CarrierComponent {
    types: Array<SelectItem>;
    carriers: Array<Carrier>;
    filtered: Array<Carrier>;
    carrier: Carrier;
    editMode: boolean = false;

    constructor(private readonly apollo: Apollo) {}

    ngOnInit(): void {
        this.getData();
    }

    async getData(): Promise<void> {
        const { data } = await this.apollo.query<CarrierList>({
            query: gql`
                query carriers {
                    carriers {
                        id
                        name
                        postcode
                        address
                        phoneNumber
                        INN
                        KPP
                        managerPosition
                        managerFullName
                        bankCredentials
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        }).toPromise();

        this.carriers = data.carriers;
    }

    filter(event) {
        this.filtered = [];
        for(let i = 0; i < this.carriers.length; i++) {
            let v = this.carriers[i];
            if(v.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filtered.push(v);
            }
        }
    }

    async update(): Promise<void> {
        console.log("update")
        console.log(this.carrier);

        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation updateCarrier($id: String!, $input: CarrierInput) {
                        updateCarrier(id: $id, input: $input) {
                            id
                        }
                    }
                `,
                variables: {
                    id: this.carrier.id,
                    input: {
                        name: this.carrier.name,
                        postcode: this.carrier.postcode,
                        standardAxialLoad: this.carrier.address,
                        soilFreezing: this.carrier.phoneNumber,
                        INN: this.carrier.INN,
                        KPP: this.carrier.KPP,
                        managerPosition: this.carrier.managerPosition,
                        managerFullName: this.carrier.managerFullName,
                        bankCredentials: this.carrier.bankCredentials
                    }
                }
            }).toPromise()

            this.getData();
        } catch (e) {
            console.log(e);
        }
    }

    async upsert(): Promise<void> {
        console.log("create")
        console.log(this.carrier);

        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation upsertCarrier($input: CarrierInput) {
                        upsertCarrier(input: $input) {
                            id
                        }
                    }
                `,
                variables: {
                    input: {
                        name: this.carrier.name,
                        postcode: this.carrier.postcode,
                        address: this.carrier.address,
                        phoneNumber: this.carrier.phoneNumber,
                        INN: this.carrier.INN,
                        KPP: this.carrier.KPP,
                        managerPosition: this.carrier.managerPosition,
                        managerFullName: this.carrier.managerFullName,
                        bankCredentials: this.carrier.bankCredentials
                    }
                }
            }).toPromise()

            this.getData();
            this.editModeOff();
        } catch (e) {
            console.log(e);
        }
    }

    async delete(): Promise<void> {
        console.log('delete');
        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation deleteCarrier($id: String!) {
                        deleteCarrier(id: $id) {
                            name
                        }
                    }
                `,
                variables: {
                    id: this.carrier.id
                }
            }).toPromise();

            this.getData();
            this.editModeOff()
        } catch (e) {
            console.log(e);
        } 
    }

    editModeOn(): void {
        this.editMode = true;
        this.carrier = new Carrier();
    }

    editModeOff(): void {
        this.editMode = false;
        this.carrier = null;
    }
}