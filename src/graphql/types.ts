export type Test = {
    id: number;
    name: string;
}

export type Trailer = {
    id: number;
    name: string;
}

export type StudentsTests = {
    id: number;
    studentId: number;
    testId: number;
}

export type Query = {
    tests: Test[];
    trailers: Trailer[];
}

// export type Mutation = {
//     createTest: Test
//     createStudent: Student
//     addTestToStudent: StudentsTests
// }
