import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { SelectItem } from 'primeng/api';
import { Path, PathList } from '../types';

@Component({
    selector: 'path',
    templateUrl: './path.component.html'
})
export class PathComponent implements OnInit {
    
    types: Array<SelectItem>;
    paths: Array<Path>;
    filteredPaths: Array<Path>;
    standardAxialLoads: Array<SelectItem>;
    path: Path;
    editMode: boolean = false;

    constructor(private readonly apollo: Apollo) {}

    ngOnInit(): void {
        this.getData();
        this.standardAxialLoads = [
            { label: '6', value: 6 },
            { label: '10', value: 10 },
            { label: '11.5', value: 11.5 }
        ];
    }

    async getData(): Promise<void> {
        const { data } = await this.apollo.query<PathList>({
            query: gql`
                query paths {
                    paths {
                        id
                        name
                        length
                        standardAxialLoad
                        soilFreezing
                    }
                }
            `,
            fetchPolicy: 'no-cache'
        }).toPromise();

        this.paths = data.paths;
    }

    filter(event) {
        this.filteredPaths = [];
        for(let i = 0; i < this.paths.length; i++) {
            let v = this.paths[i];
            if(v.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredPaths.push(v);
            }
        }
    }

    async update(): Promise<void> {
        console.log("update")
        console.log(this.path);

        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation updatePath($id: String!, $input: PathInput) {
                        updatePath(id: $id, input: $input) {
                            id
                        }
                    }
                `,
                variables: {
                    id: this.path.id,
                    input: {
                        name: this.path.name,
                        length: this.path.length,
                        standardAxialLoad: this.path.standardAxialLoad,
                        soilFreezing: this.path.soilFreezing
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
        console.log(this.path);

        try {
            await this.apollo.mutate<any, any>({
                mutation: gql`
                    mutation upsertPath($input: PathInput) {
                        upsertPath(input: $input) {
                            id
                        }
                    }
                `,
                variables: {
                    input: {
                        name: this.path.name,
                        length: this.path.length,
                        standardAxialLoad: this.path.standardAxialLoad,
                        soilFreezing: this.path.soilFreezing
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
                    mutation deletePath($id: String!) {
                        deletePath(id: $id) {
                            name
                        }
                    }
                `,
                variables: {
                    id: this.path.id
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
        this.path = new Path();
    }

    editModeOff(): void {
        this.editMode = false;
        this.path = null;
    }
}