export type Test = {
    id: number;
    name: string;
}

export type Student = {
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
    students: Student[];
    studentsTests: Student;
}

export type Mutation = {
    createTest: Test
    createStudent: Student
    addTestToStudent: StudentsTests
}
