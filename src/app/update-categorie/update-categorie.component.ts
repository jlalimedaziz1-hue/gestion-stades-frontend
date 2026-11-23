import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-categorie.component.html',
})
export class UpdateCategorieComponent {
  @Input() categorie!: Categorie;
  @Input() ajout = true;
  @Output() categorieUpdated = new EventEmitter<Categorie>();

  saveCategorie(): void {
    this.categorie.nomCat = this.categorie.nomCat.trim();
    this.categorieUpdated.emit(this.categorie);
  }
}
