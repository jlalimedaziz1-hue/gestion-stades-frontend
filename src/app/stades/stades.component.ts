import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Stade } from '../model/stade.model';
import { StadeService } from '../services/stade.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stades',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stades.component.html',
  styleUrl: './stades.component.css',
})
export class StadesComponent implements OnInit {
  stades: Stade[] = [];
  constructor(private stadeService: StadeService, public auth: AuthService) {}

  ngOnInit(): void { this.chargerStades(); }
  chargerStades(): void { this.stadeService.listeStade().subscribe(stades => this.stades = stades); }

  supprimerStade(stade: Stade): void {
    if (!confirm('Etes-vous sûr ?')) return;
    this.stadeService.supprimerStade(stade.idStade).subscribe(() => this.chargerStades());
  }
}
