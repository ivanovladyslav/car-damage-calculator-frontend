import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    items: MenuItem[];

    ngOnInit(): void {
        this.items = [
            { 
                label: 'Тягачи',
                routerLink: ['/dashboard/vehicle']
            },
            { 
                label: 'Прицепы',
                routerLink: ['/dashboard/trailer']
            },
            { 
                label: 'Маршруты',
                routerLink: ['/dashboard/path']
            },
            { 
                label: 'Грузоперевозчики',
                routerLink: ['/dashboard/carrier']
            },
            {
                label: 'Расчеты',
                routerLink: ['/dashboard/calculations']
            },
            { 
                label: 'Расчет',
                routerLink: ['/dashboard/calculator'],
                icon: 'pi pi-fw pi-pencil'
            }
        ]
    }
}