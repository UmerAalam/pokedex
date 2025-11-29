import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
} from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}
interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
const colorsByType = {
  grass: "#a8d8a8",
  fire: "#ffcc99",
  water: "#99ccff",
  bug: "#b6e3b6",
};
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
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );
      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", gap: 16, padding: 16 }}
    >
      {pokemons?.map((pokemon) => {
        return (
          <Link
            style={{
              // @ts-ignore
              backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
              padding: 20,
              alignItems: "center",
              alignContent: "center",
              borderRadius: 20,
            }}
            href={{ pathname: "/details", params: { name: pokemon.name } }}
            key={pokemon.name}
          >
            <View>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: pokemon.image }}
                  style={{ width: 150, height: 150 }}
                />
                <Image
                  source={{ uri: pokemon.imageBack }}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            </View>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
