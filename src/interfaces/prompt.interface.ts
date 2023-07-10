export interface IPrompt {
    id: string;
    title: string;
    description: string;
    promptText: string;
    variable: string[];
    favorite: boolean;
    createdAt: string;
    lastModifiedAt: string;
    author: string;
}