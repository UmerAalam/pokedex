import { useEffect, useState } from "react";
import { ScrollView, Image, View, Text } from "react-native";

interface Pokemon {
  name: string;
  image: string;
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
      //Detail About Pokemon
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
          };
        }),
      );
      setPokemons(detailedPokemons);
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
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}
