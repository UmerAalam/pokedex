import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}
interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );
      const data: PokemonList = await response.json();
      setPokemons(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView>
      {pokemons?.map((pokemon) => {
        return (
          <View key={pokemon.name}>
            <Text>{pokemon.name}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
