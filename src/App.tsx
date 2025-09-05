import "../src/styles/_globals.scss";
import { CharacterDetails } from "./components/CharacterDetails/CharacterDetail";
import { CharacterList } from "./components/CharacterList/CharacterList";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <div className="mainDashboard">
        <CharacterList />
        <CharacterDetails />
      </div>
    </>
  );
}

export default App;
