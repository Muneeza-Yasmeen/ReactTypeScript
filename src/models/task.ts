// src/models/Task.ts
export interface User {
    name: string;
    designation: string;
    address: string;
    password: string;
    email: string;
}

export interface Category {
    categoryId: number;
    name: string;
}

export interface Task {
    taskId?: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    priority: number;
    dueDate: string;
    name: string;
    categoryId: number;
    user: User;
    category: Category;
}
