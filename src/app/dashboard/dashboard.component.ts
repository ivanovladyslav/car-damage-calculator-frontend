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
                label: 'Тягачи',
                routerLink: ['/dashboard/truck']
            },
            { 
                label: 'Прицепы',
                routerLink: ['/dashboard/trailer']
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