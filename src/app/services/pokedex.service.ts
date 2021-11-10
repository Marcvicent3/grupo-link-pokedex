import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const url = environment.url;
const requests = environment.httpRequests;
@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  pokeApi = 'https://pokeapi.co/api/v2/pokedex/';
  constructor(private http: HttpClient) { }

  getRegions(){
    return new Promise(resolve => {
      this.http.get(url + requests.listarRegiones)  
      .subscribe(resp => {
        resolve(resp);
      }, () => {              // error
        console.log('Error al traer las regiones');
        resolve(false);
      });
    });
  }

  getKantoPokemon(urlKanto){
    return new Promise(resolve => {
      this.http.get(urlKanto)
        .subscribe(resp => {
          resolve (resp);
        }, () => {
          console.log('Error al traer los Pokemon de Kanto');
          resolve(false);
        });
    });
  }

  getPokemonInfo(urlPokemon){
    return new Promise(resolve => {
      this.http.post(url + requests.informacionPokemon, urlPokemon)
        .subscribe(resp => {
          resolve (resp);
        }, () => {
          console.log('Error al traer los datos del Pokemon');
          resolve(false);
        });
    });
  }
  
  getPokemonAbilities(pokemon_entry){
    return new Promise(resolve => {
      this.http.post(url + requests.habilidadesPokemon, pokemon_entry)
        .subscribe(resp => {
          resolve (resp);
        }, () => {
          console.log('Error al traer las habilidades del Pokemon');
          resolve(false);
        });
    });
  }
}
