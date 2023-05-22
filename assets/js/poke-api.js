
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
 
    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default
    
    // Pokemon Details
    const abilities = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    pokemon.abilities = abilities

    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)
    pokemon.moves = moves

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    
    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    pokemon.stats = stats

    const baseStats = pokeDetail.stats.map((baseSlot) => baseSlot.base_stat)
    pokemon.baseStats = baseStats

    return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const pokeDetail = await response.json()
    return convertPokeApiDetailToPokemon(pokeDetail)
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequest = pokemons.map((pokeApi.getPokemonDetail))
    const pokemonDetails = await Promise.all(detailRequest)
    return pokemonDetails
    }
