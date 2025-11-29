import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
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
      const data: Pokemon[] = await response.json();
      setPokemons(data);
    } catch (e) {
      console.log(e);
    }
  };
  return <ScrollView></ScrollView>;
}
