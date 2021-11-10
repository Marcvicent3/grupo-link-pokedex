import { Component, OnInit } from '@angular/core';
import { PokemonShow } from 'src/app/class/pokemonShow';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  urlRegion: any;
  urlKanto: any;
  pokemon: any;
  pokemonShow = {
    entry_number: '',
    name: '',
    url: '',
  };
  pokemonInfo: any;
  pokemonAbilities: any;
  pokemonNameSearch: any = '';
  checked = false;
  constructor(public pokedexService: PokedexService) {
  }

  async ngOnInit() {
    await this.getKantoUrl();
    await this.getKantoPokemon();
  }

  async getKantoUrl() {
    const resultRegion = await this.pokedexService.getRegions();
    if (resultRegion != false) {
      this.urlRegion = resultRegion['regiones']['results'];
      for (const region of this.urlRegion) {
        if (region.name == 'kanto') {
          this.urlKanto = region.url;
        }
      }
    } else {
      this.urlRegion = [];
    }
  }

  async getKantoPokemon() {
    const resultPokemon = await this.pokedexService.getKantoPokemon(this.urlKanto);
    if (resultPokemon != false) {
      this.pokemon = resultPokemon['pokemon_entries'];
      for (const newPokemon of this.pokemon) {
        if (newPokemon.entry_number < 10) {
          newPokemon.entry_number = '00' + newPokemon.entry_number;
        } else if (newPokemon.entry_number >= 10 && newPokemon.entry_number < 100) {
          newPokemon.entry_number = '0' + newPokemon.entry_number;
        }
      }
    } else {
      this.pokemon = [];
    }
  }

  async showPokemonModal(pokemonRecibed) {
    this.pokemonShow = {
      entry_number: pokemonRecibed.entry_number,
      name: pokemonRecibed.pokemon_species.name,
      url: pokemonRecibed.pokemon_species.url,
    };

    const resultPokemonShown = await this.pokedexService.getPokemonInfo({ id: this.pokemonShow.entry_number, url: this.pokemonShow.url });
    let pokemonFiltered;
    if (resultPokemonShown != false) {
      this.pokemonInfo = resultPokemonShown['infoPokemon']['flavor_text_entries'];
      pokemonFiltered = this.pokemonInfo.filter(text => text.language.name == 'es' && text.version.name == 'x');
      this.showPokemonAbilities();
    }
    this.pokemonInfo = pokemonFiltered[0].flavor_text;
  }

  async showPokemonAbilities(){
    const resultAbilities = await this.pokedexService.getPokemonAbilities({id: this.pokemonShow.name});
    if (resultAbilities != false) {
      this.pokemonAbilities = resultAbilities['habilidades']['abilities'];
    }
  }

  verifyInputs(checked) {
    this.pokemonNameSearch = checked ? this.pokemonNameSearch : '';
  }

}

