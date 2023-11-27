import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface Pokemon {
  name: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private httpClient: HttpClient) {}

  public getPokemons(): Observable<Pokemon[]> {
    return this.httpClient.get<PokemonResponse>(this.baseUrl).pipe(
      switchMap((response: PokemonResponse) => {
        const requestsUrls$ = response.results.map((result) =>
          this.httpClient.get(result.url).pipe(catchError(() => of('error')))
        );

        return forkJoin(requestsUrls$).pipe(
          map((data: any): Pokemon[] => {
            const mappedData: Pokemon[] = data.map((pokemon: any) => ({
              name: pokemon.name,
              imageUrl: pokemon.sprites?.back_default,
            }));

            return mappedData;
          }),
          catchError((error) => {
            console.error('An error occurred:', error);
            return of([]);
          })
        );
      }),
      catchError((error) => {
        console.error('An error occurred:', error);
        return of([]);
      })
    );
  }
}

interface PokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}
