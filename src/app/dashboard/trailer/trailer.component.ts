import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

import TRAILERS_QUERY from './trailer.graphql';

@Component({
    selector: 'trailer',
    templateUrl: './trailer.component.html'
})
export class TrailerComponent implements OnInit {

    constructor(private apollo: Apollo) {}

    async ngOnInit(): Promise<void> {
        try {
            const { data } = await this.apollo.query({
              query: TRAILERS_QUERY,
              variables: {
                trailerId: 1
              }
            }).toPromise();
            console.log(data);
        } catch(e) {
            console.error(e);
        }
    }
}