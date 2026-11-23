import { Categorie } from './categorie.model';

export class Stade {
  idStade!: number;
  nomStade!: string;
  capaciteStade!: number;
  dateOuverture!: string | Date;
  categorie?: Categorie | null;
}
