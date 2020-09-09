// Design inspired by this Dribbble shot: https://dribbble.com/shots/5611109--Pokemon -->
import React, { useState, useEffect } from "react";
import "./styles.css";

const pokemons_number = 150;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5"
};

const main_types = Object.keys(colors);

export default function App() {
  const [pokemonArr, setPokemon] = useState([]);

  const createPokemonCard = (pokemon) => {
    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    const card = (
      <div
        style={{
          backgroundColor: color
        }}
        className="pokemon"
      >
        <div className="img-container">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={name}
          />
        </div>
        <div className="info">
          <span className="number">
            {pokemon.id.toString().padStart(3, "0")}
          </span>
          <h3 className="name">{name}</h3>
          <span>
            Type: <span>{type}</span>
          </span>
        </div>
      </div>
    );

    setPokemon((state) => [...state, card]);
  };

  const getPokemon = async (id) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(URL);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
  };

  const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
      await getPokemon(i);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="app">
      <h1>Pokedox</h1>
      <div className="poke-container">{pokemonArr}</div>
    </div>
  );
}
