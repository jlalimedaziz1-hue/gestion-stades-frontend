import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie.model';
import { Stade } from '../model/stade.model';

@Injectable({ providedIn: 'root' })
export class StadeService {
  private readonly apiUrl = 'http://localhost:8081/api';
  private readonly categoriesUrl = 'http://localhost:8081/api/categories';

  constructor(private http: HttpClient) {}

  listeStade(): Observable<Stade[]> { return this.http.get<Stade[]>(`${this.apiUrl}/all`); }
  ajouterStade(stade: Stade): Observable<Stade> { return this.http.post<Stade>(`${this.apiUrl}/addstade`, stade); }
  consulterStade(id: number): Observable<Stade> { return this.http.get<Stade>(`${this.apiUrl}/getbyid/${id}`); }
  updateStade(stade: Stade, originalId: number = stade.idStade): Observable<Stade> {
    return this.http.put<Stade>(`${this.apiUrl}/updatestade`, stade);
  }
  supprimerStade(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/delstade/${id}`); }
  rechercherParCategorie(idCat: number): Observable<Stade[]> {
    return this.http.get<Stade[]>(`${this.apiUrl}/stadescat/${idCat}`);
  }
  rechercherParNom(nom: string): Observable<Stade[]> {
    const params = new HttpParams().set('nom', nom.trim());
    return this.http.get<Stade[]>(`${this.apiUrl}/stades/recherche`, { params });
  }

  listeCategories(): Observable<Categorie[]> { return this.http.get<Categorie[]>(this.categoriesUrl); }
  ajouterCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.categoriesUrl, categorie);
  }
  updateCategorie(categorie: Categorie, originalId: number = categorie.idCat): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.categoriesUrl}/${originalId}`, categorie);
  }
  supprimerCategorie(idCat: number): Observable<void> {
    return this.http.delete<void>(`${this.categoriesUrl}/${idCat}`);
  }
}


