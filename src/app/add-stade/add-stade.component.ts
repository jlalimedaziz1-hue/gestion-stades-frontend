import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { Stade } from '../model/stade.model';
import { StadeService } from '../services/stade.service';

@Component({
  selector: 'app-add-stade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-stade.component.html',
})
export class AddStadeComponent implements OnInit {
  newStade = new Stade();
  categories: Categorie[] = [];
  newIdCat!: number;

  constructor(private stadeService: StadeService, private router: Router) {}

  ngOnInit(): void {
    this.stadeService.listeCategories().subscribe(categories => {
      this.categories = categories;
      if (categories.length) this.newIdCat = categories[0].idCat;
    });
  }

  addStade(): void {
    this.newStade.categorie = this.categories.find(cat => cat.idCat === Number(this.newIdCat)) ?? null;
    this.stadeService.ajouterStade(this.newStade).subscribe(() => this.router.navigate(['stades']));
  }
}
