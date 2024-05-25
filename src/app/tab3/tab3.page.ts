import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pokedexList: any = []

  constructor(public pokeService: PokeAPIService) {
  }
  ngOnInit() {
    const pokemonList = this.getPokemonsEncontrados()
    this.pokedexList = pokemonList
  }

  clearLocalstorage(){
    localStorage.clear()
    location.reload()
  }
  getPokemonsEncontrados(){
    return this.pokeService.pokemonsEncontrados
  }

  }

