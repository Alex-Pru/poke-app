import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {
    this.loadProgress()
   }

 
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
      weight: pokeData.weight,
      wins: 0,
      loses: 0,
      draws: 0
    }

    if(this.checkExistance(newPokemon).exists){
      const position = this.checkExistance(newPokemon).position
      const existantPokemon = this.pokemonsEncontrados.slice(position, position + 1)
      this.pokemonsEncontrados.splice(position, position + 1)
      this.pokemonsEncontrados.push(existantPokemon[0])
    }
    else{
      this.pokemonsEncontrados.push(newPokemon)
    }
    this.saveProgress(this.pokemonsEncontrados, 'pokedex')
    return newPokemon
  }

  checkExistance(poke: any){
    let result = {exists: false, position: 0}
    for(let index = 0; index < this.pokemonsEncontrados.length; index++){
      if(this.pokemonsEncontrados[index].nome == poke.nome){
        result = {exists: true, position: index}
      }
    }
    return result
  }

  saveProgress(array: any[], str: string) {
    if(array.length > 0){
      localStorage.removeItem(str)
      localStorage.setItem(str, JSON.stringify(array))
    }
    else{}
  }

  embate(enemy: any, ally: any){
    const abilitiesAlly = ally.abilities
    const abilitiesEnemy = enemy.abilities
    const ultimo = this.pokemonsEncontrados.length - 1
    const penultimo = ultimo - 1

    
    if(abilitiesAlly == 0 || abilitiesAlly == undefined){
      return {resultado: 'FUGIU', cor: ''}
    }
    else if(abilitiesEnemy < abilitiesAlly){
      this.pokemonsEncontrados[ultimo].loses++
      this.pokemonsEncontrados[penultimo].wins++
      return {resultado: 'PERDEU', cor: 'success'}
    }
    else if(abilitiesEnemy == abilitiesAlly){
      this.pokemonsEncontrados[ultimo].draws++
      this.pokemonsEncontrados[penultimo].draws++
      return {resultado: 'EMPATE', cor: 'warning'}
    }
    else if (abilitiesEnemy > abilitiesAlly){
      this.pokemonsEncontrados[ultimo].wins++
      this.pokemonsEncontrados[penultimo].loses++
      return {resultado: 'GANHOU', cor: 'danger'}
    }
    else{
      return {resultado: 'Something went wrong', cor: ''}
    }
    
  } 

  loadProgress(){
    if(JSON.parse(localStorage.getItem("pokedex") || "{}")){
      this.pokemonsEncontrados = JSON.parse(localStorage.getItem("pokedex") || "[]")
    }
  }
}
