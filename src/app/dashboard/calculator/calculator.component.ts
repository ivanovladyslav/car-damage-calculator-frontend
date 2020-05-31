import { Component, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CarrierComponent } from '../carrier/carrier.component';
import { Vehicle, Path } from '../types';
import { CalculationPositionComponent } from './calculation-position/calculation-position.component';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
    @ViewChildren(CalculationPositionComponent) calculationPositionsForms: QueryList<CalculationPositionComponent>; 
    @ViewChild(CarrierComponent, { static: false }) carrierForm: CarrierComponent;

    cargoWeight: string;
    logs: Array<string>;
    calculation: any;
    showDocument: boolean = false;
    positionsCount: Array<number> = [];

    constructor(private readonly apollo: Apollo) {}

    async makeCalculation(): Promise<void> {
        const payloads = this.calculationPositionsForms.toArray().map((cpf) => {
            return { 
                vehiclesPayloads: cpf.vehiclesForms.map(vf => { return { id: vf.vehicle.id, cargoWeight: vf.cargoWeight }}),
                pathsIDs: cpf.pathsForms.map(pf => { return pf.path.id })
            }
        });

        console.log(payloads);
        
        const { data } = await this.apollo.query<any>({
            variables: { 
                payloads,
                carrierID: this.carrierForm.carrier.id.toString()
            },
            query: gql`
                query calculate($payloads: [CalculationPositionPayload], $carrierID: String) {
                    calculate(payloads: $payloads, carrierID: $carrierID) {
                        calculationPositions {
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

        this.logs = data.calculate.logs;
        this.calculation = data.calculate;
        this.showDocument = true;
    }

    addCalculationPosition(): void {
        this.positionsCount.push(0);
    }

    removeCalculationPosition(): void {
        this.positionsCount.pop();
    }
}