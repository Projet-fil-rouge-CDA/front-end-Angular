export interface Post {
    id?: string,
    id_user?: string,
    title: string,
    category: string,
    message: string,
    reponses: number,
    dateCreation: Date,
    dateLastMessage: Date,
    username: string
}
