import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit {
  pokemonDeBatalha: any = {};
  resultadoBatalha: String = '';
  corResultado: String = '';

  constructor(public photoService: PhotoService, public pokeService: PokeAPIService) {
  }

    async ngAfterViewInit(){
      const pokemonsEncontrados = this.pokeService.getPokemonsEncontrados()
      console.log(pokemonsEncontrados)
      const antiPenultimo = pokemonsEncontrados.length - 1
      if (!pokemonsEncontrados[antiPenultimo] || pokemonsEncontrados[antiPenultimo] == undefined){
        const pokemonBatalha = await this.buscarBatalha();
        const {resultado, cor} = this.pokeService.embate(pokemonBatalha, {})
        this.resultadoBatalha = resultado
        this.corResultado = cor
      } else {
            const pokemonBatalha = await this.buscarBatalha();
            const {resultado, cor} = this.pokeService.embate(pokemonBatalha, pokemonsEncontrados[antiPenultimo])
            this.resultadoBatalha = resultado
            this.corResultado = cor
      }
    }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async buscarBatalha() {
        const battlePokemon = await this.pokeService.buscarPokemon()
        this.pokemonDeBatalha = battlePokemon
        return battlePokemon
  }
}