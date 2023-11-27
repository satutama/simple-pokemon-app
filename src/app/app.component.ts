import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AccordionComponent } from './accordion/accordion.component';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AccordionComponent, HttpClientModule],
  providers: [PokemonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public pokemons$: Observable<Pokemon[]>;

  constructor(private pokemonService: PokemonService) {
    this.pokemons$ = this.pokemonService.getPokemons();
  }
}
