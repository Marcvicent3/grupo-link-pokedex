import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPokemon = [];
    if (arg == null || arg == ''){
      return value;
    }
    if (value != null && value != ''){
      for (const pokemonName of value) {
        if (pokemonName.pokemon_species.name.startsWith(arg.toLowerCase())) {
          resultPokemon.push(pokemonName);
        };
      };
      return resultPokemon;
    }
  }
}
