import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Test, Query, Mutation } from '../graphql/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
 
  constructor(private apollo: Apollo) {}

  async ngOnInit(): Promise<void> {
    try {
      const { data } = await this.apollo.mutate({
        mutation: gql`
          query studentsTests($studentId: Int!) {
            studentsTests(studentId: $studentId) {
              name
              tests {
                name
              }
            }
          }
        `,
        variables: {
          studentId: 1
        }
      }).toPromise();
      console.log(data);
    } catch(e) {
      console.error(e);
    }
  }
}
