import { useState } from "react";
import { useCharactersQuery } from "./__generated__/types";
import { CharacterDetails } from "./components/CharacterDetails/CharacterDetail";
import { CharacterList } from "./components/CharacterList/CharacterList";
import { Header } from "./components/Header/Header";
import "../src/styles/_globals.scss";

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data } = useCharactersQuery({ variables: { page: 1 } });

  const initialId = data?.characters?.results?.[0]?.id ?? null;

  const activeId = selectedId ?? initialId;

  return (
    <>
      <Header />
      <div className="mainDashboard">
        <CharacterList onSelect={setSelectedId} />
        <CharacterDetails characterId={activeId} />
      </div>
    </>
  );
}

export default App;
