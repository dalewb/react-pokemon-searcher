import React from 'react';
import PokemonCollection from './PokemonCollection';
import PokemonForm from './PokemonForm';
import Loading from './Loading';
import { Search } from 'semantic-ui-react';
const URL = 'http://localhost:3000/pokemon';

class PokemonIndex extends React.Component {
  state = {
    pokemons: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(json => this.setState({
        pokemons: json
      }))
  }

  addPokemon = (info) => {
    let newPokemon = {
      name: info.name,
      hp: info.hp,
      sprites: {
        frontUrl: info.frontUrl,
        backUrl: info.backUrl
      }
    }
    // debugger
    this.setState({
      pokemons: [...this.state.pokemons, newPokemon]
    },() => {console.log(this.state.pokemons)})
  }

  handleSearch = (e) => {
    console.log(e.target.value)
    this.setState({
      searchTerm: e.target.value
    })
  }

  filterPokemon = () => {
    return this.state.pokemons.filter(p => p.name.includes(this.state.searchTerm.toLowerCase()))
  }


  render() {
    let filteredPokemon = this.filterPokemon();
    return (
      <div>
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        {this.state.pokemons.length > 0 ? <PokemonCollection pokemons={filteredPokemon} /> : <Loading /> }
        <br />
      </div>
    )
  }
}

export default PokemonIndex;
