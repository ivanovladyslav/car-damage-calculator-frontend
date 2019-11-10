import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Car, Query, Mutation } from '../types';

interface CarItem {
    label: string;
}

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    private suggestions: Array<any>[];

    constructor(private apollo: Apollo) {}

    async ngOnInit() {
    }

    async searchSuggestions() {
        const { data } = await this.apollo.query<any>({
            query: gql`
                query cars {
                    cars {
                        id
                        name
                    }
                }
            `
        }).toPromise();

        this.suggestions = [
            ...data.cars.map(e => ({label: e.name, value: e.name, group: 'query'}))
        ]
        
        console.log(this.suggestions);
    }
}