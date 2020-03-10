export enum AxisGroupType {
    single = 'single',
    double = 'double',
    triple = 'triple',
    quad = 'quad'
}

export class Vehicle {
    id: string = '';
    name: string | null = null;
    type: 'Тягач' | 'Прицеп' | '' = ''; 
    basicWeight: number = null;
    maxCargoWeight: number = null;
    fullWeight: number = null;
    length: number = null;
    width: number = null;
    height: number = null;
    axisDistances: string = '';
    frontAxisDoubleWheels: boolean = false;
    backAxisDoubleWheels: boolean = false;
    frontAxisBasicWeight: number = null;
    frontAxisFullWeight: number = null;
    backAxisBasicWeight: number = null;
    backAxisFullWeight: number = null;
    saddleDevice: boolean = false;
}

export interface Axis {
    distance: number;
    axisGroup: number;
    axisGroupType: AxisGroupType;
    load: number;
    excess: number;
    cost?: number;
}

export interface VehiclePassport {
    vehicle: Vehicle;
    axisLoads: Array<Axis>;
    cargoWeight: number;
}

export class Path {
    public id: number = null;
    public name: string = '';
    public length: number = null;
    public standardAxialLoad: number = null;
    public soilFreezing: boolean = null;
}

export class Carrier {
    public id!: string;
    public name!: string;
    public postcode: number;
    public address: string;
    public phoneNumber: string;
    public INN: string;
    public KPP?: string;
    public managerPosition: string;
    public managerFullName: string; 
    public bankCredentials: string;
}

export interface CarrierList {
    carriers: Array<Carrier>;
}

export interface VehiclesList {
    vehicles: Vehicle[] | null;
}

export interface PathList {
    paths: Array<Path>;
}
