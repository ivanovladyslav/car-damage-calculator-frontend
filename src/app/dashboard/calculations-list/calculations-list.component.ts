import { Component, OnInit } from "@angular/core";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'calculations-list',
    templateUrl: './calculations-list.component.html'
})
export class CalculationsListComponent implements OnInit {
    calculations: Array<any>;

    currentCalculation: any;

    cols: Array<any>;
    
    constructor(private readonly apollo: Apollo) {}

    async ngOnInit(): Promise<void> {
        const calculationsData = await this.apollo.query<any>({
            query: gql`
                query calculations {
                    calculations {
                        id
                        createdAt
                        calculationPositions {
                            vehiclesPassports {
                                vehicle {
                                    name 
                                    type
                                    length
                                    width
                                    height
                                }
                                axisLoads {
                                    excess
                                    cost
                                }
                                cargoWeight
                            }
                            paths {
                                name
                                length
                                standardAxialLoad
                                soilFreezing
                                districtID
                            }
                        }
                        carrier {
                            recieverName
                        }
                    }
                }
            `
        }).toPromise();

        console.log(calculationsData);

        this.cols = [
            { field: 'id', header: 'Номер' },
            { field: 'createdAt', header: 'Дата создания' },
            { field: `carrier`, subfield: 'recieverName', header: 'Название орг-ии получателя' }
        ]

        this.calculations = calculationsData.data.calculations;

        this.calculations.forEach(c => {
            const date = new Date(+c.createdAt);
            c.createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        });
    }

    public async getCalculation(id: string): Promise<any> {
        const calculationData = await this.apollo.query<any>({
            variables: { 
                id: parseInt(id)
            },
            query: gql`
                query calculation($id: Int) {
                    calculation(id: $id) {
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

        this.currentCalculation = calculationData.data.calculation;
    }
}