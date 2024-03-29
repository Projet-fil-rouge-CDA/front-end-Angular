export interface UserManagerModel{
    idUser:number,
    prenom:string,
    nom:string,
    pseudo:string,
    email:string,
    telephone:string,
    rue:string,
    codePostal:string,
    ville:string,
    roles:string[],
    editing:boolean,
    actif:boolean,
    isModerateur:boolean
}
