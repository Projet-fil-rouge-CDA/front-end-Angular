export interface Comment {
    id?: string,
    id_user?: string,
    id_post?: Storage,
    message: string,
    date: Date,
    image?: string
    commentaires: Comment[]
}
