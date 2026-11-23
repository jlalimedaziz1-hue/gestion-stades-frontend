import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stade } from '../model/stade.model';
import { StadeService } from '../services/stade.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  nomStade = '';
  stades: Stade[] = [];
  searchTerm = '';

  constructor(private stadeService: StadeService) {}
  ngOnInit(): void { this.rechercherStades(''); }

  rechercherStades(nom: string): void {
    this.searchTerm = nom;
    if (!nom.trim()) {
      this.stadeService.listeStade().subscribe(stades => this.stades = stades);
      return;
    }
    this.stadeService.rechercherParNom(nom).subscribe(stades => this.stades = stades);
  }
}
