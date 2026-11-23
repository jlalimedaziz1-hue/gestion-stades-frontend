import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { StadeService } from '../services/stade.service';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';

@Component({
  selector: 'app-liste-categories',
  standalone: true,
  imports: [CommonModule, UpdateCategorieComponent],
  templateUrl: './liste-categories.component.html',
})
export class ListeCategoriesComponent implements OnInit {
  categories: Categorie[] = [];
  updatedCat = new Categorie();
  ajout = true;
  private originalId = 0;

  constructor(private stadeService: StadeService) {}
  ngOnInit(): void { this.chargerCategories(); }
  private chargerCategories(): void {
    this.stadeService.listeCategories().subscribe(categories => this.categories = categories);
  }

  categorieUpdated(categorie: Categorie): void {
    const request = this.ajout
      ? this.stadeService.ajouterCategorie(categorie)
      : this.stadeService.updateCategorie(categorie, this.originalId);
    request.subscribe(() => {
      this.chargerCategories();
      this.updatedCat = new Categorie();
      this.ajout = true;
      this.originalId = 0;
    });
  }

  updateCat(categorie: Categorie): void {
    this.updatedCat = Object.assign(new Categorie(), categorie);
    this.originalId = categorie.idCat;
    this.ajout = false;
  }

  supprimerCategorie(categorie: Categorie): void {
    if (!confirm('Etes-vous sûr ?')) return;
    this.stadeService.supprimerCategorie(categorie.idCat).subscribe(() => {
      this.chargerCategories();
      if (this.originalId === categorie.idCat) {
        this.updatedCat = new Categorie();
        this.ajout = true;
        this.originalId = 0;
      }
    });
  }
}
