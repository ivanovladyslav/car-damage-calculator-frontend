export type Test = {
    id: number;
    name: string;
}

export type Car = {
    id: number;
    name: string;
    tests: Test[];
}

export type StudentsTests = {
    id: number;
    studentId: number;
    testId: number;
}

export type Query = {
    tests: Test[];
    cars: Car[];
    studentsTests: Car;
}

export type Mutation = {
    createTest: Test
    createCar: Car
    addTestToStudent: StudentsTests
}
