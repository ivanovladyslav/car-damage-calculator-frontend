import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { PathComponent } from '../path/path.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CarrierComponent } from '../carrier/carrier.component';
import { Vehicle, Path } from '../types';

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
    calculation: any;
    showDocument: boolean = false;

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
                        vehiclesPassports {
                            vehicle {
                                name
                                type
                                length 
                                width
                                height 
                                saddleDevice
                            }
                            axisLoads {
                                distance
                                axisGroup
                                axisGroupType
                                load
                                excess
                                cost
                            }
                            cargoWeight
                        }
                        carrier {
                            name
                            postcode
                            address
                            phoneNumber
                            INN
                            KPP
                            managerPosition
                            managerFullName
                            bankCredentials
                            recieverName
                            recieverINN
                            recieverKPP
                            recieverBankName
                            recieverBankAccount
                            recieverBIK
                            recieverOGRN
                            recieverCorrespondentAccount                       
                        }
                        paths {
                            name
                        }
                        logs
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        }).toPromise();

        this.logs = data.calculation.logs;
        this.calculation = data.calculation;

        console.log(this.calculation);

        this.showDocument = true;
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