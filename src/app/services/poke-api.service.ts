import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) { }

 
  async getPokeAPIService(id: number = 1 + (Math.floor(Math.random() * 100))){{
    this.lastID = id
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const result = res.json()
    return result
  }}

  lastID:number = 0

  pokemonEncontrado: any = {}

  pokemonDeBatalha: any = {}

  resultadoBatalha: String = ''
  corResultado: String = ''

  pokemonsEncontrados: any = []

  getPokemonsEncontrados(){
    return this.pokemonsEncontrados
  }
  async buscarPokemon(){
    const pokeData = await this.getPokeAPIService()

    const newPokemon = {
      nome: pokeData.forms[0].name.toUpperCase(),
      img: pokeData.sprites.front_default,
      abilities: pokeData.abilities.length,
      height: pokeData.height,
      weight: pokeData.weight
    }

    this.pokemonsEncontrados.push(newPokemon)
    return newPokemon
  }

  embate(abilitiesEnemy: number, abilitiesAlly: number){
    console.log(abilitiesAlly, abilitiesEnemy)
    if(abilitiesAlly == 0){
      return {resultado: 'FUGIU', cor: ''}
    }
    else if(abilitiesEnemy < abilitiesAlly){
      return {resultado: 'PERDEU', cor: 'success'}
    }
    else if(abilitiesEnemy == abilitiesAlly){
      return {resultado: 'EMPATE', cor: 'warning'}
    }
    else if (abilitiesEnemy > abilitiesAlly){
      return {resultado: 'GANHOU', cor: 'danger'}
    }
    else{
      console.log('Unexpected situation')
      return {resultado: 'Something went wrong', cor: ''}
    }
  } 
}
