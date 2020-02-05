import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            { 
                label: 'Транспортные средства',
                routerLink: ['/dashboard/vehicle']
            },
            { 
                label: 'Грузоперевозчики',
                routerLink: ['/dashboard/carrier']
            },
            { 
                label: 'Расчет',
                routerLink: ['/dashboard/calculator']
            },
        ]
    }
}