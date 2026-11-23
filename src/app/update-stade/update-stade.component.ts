import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { Stade } from '../model/stade.model';
import { StadeService } from '../services/stade.service';

@Component({
  selector: 'app-update-stade',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-stade.component.html',
})
export class UpdateStadeComponent implements OnInit {
  currentStade = new Stade();
  categories: Categorie[] = [];
  updatedCatId!: number;
  originalStadeId!: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private stadeService: StadeService) {}

  ngOnInit(): void {
    this.originalStadeId = Number(this.activatedRoute.snapshot.params['id']);
    this.stadeService.listeCategories().subscribe(categories => {
      this.categories = categories;
      this.stadeService.consulterStade(this.originalStadeId).subscribe(stade => {
        this.currentStade = stade;
        this.updatedCatId = Number(stade.categorie?.idCat ?? categories[0]?.idCat);
      });
    });
  }

  updateStade(): void {
    this.currentStade.categorie = this.categories.find(cat => cat.idCat === Number(this.updatedCatId)) ?? null;
    this.stadeService.updateStade(this.currentStade, this.originalStadeId)
      .subscribe(() => this.router.navigate(['stades']));
  }
}
