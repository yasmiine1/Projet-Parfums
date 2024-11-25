import { Commentaire } from "./commentaire";

export class Parfum {
    constructor(
        public id:string,
        public nom:string,
        public photo:string,
        public prix:number,
        public dispo:boolean,
        public dateSortie:Date,
        public comments:Commentaire[],
        public description:string
    ){
        

    }
}
