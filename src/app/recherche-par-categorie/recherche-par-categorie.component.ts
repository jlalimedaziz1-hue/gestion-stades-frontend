import { Component, OnInit } from '@angular/core';
import { Stade } from '../model/stade.model';
import { Categorie } from '../model/categorie.model';
import { StadeService } from '../services/stade.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recherche-par-categorie',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-categorie.component.html',
})
export class RechercheParCategorieComponent implements OnInit {
  stades: Stade[] = [];
  IdCategorie!: number;
  categories: Categorie[] = [];

  constructor(private stadeService: StadeService) {}

  ngOnInit(): void {
    this.stadeService.listeCategories().subscribe(categories => {
      this.categories = categories;
      if (categories.length) {
        this.IdCategorie = categories[0].idCat;
        this.onChange();
      }
    });
  }

  onChange(): void {
    this.stadeService.rechercherParCategorie(Number(this.IdCategorie))
      .subscribe(stades => this.stades = stades);
  }
}
