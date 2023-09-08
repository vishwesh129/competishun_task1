
import './App.css';
import { FavoriteProvider } from './Components/Context/FavoriteContext';
import { WatchlistProvider } from './Components/Context/WatchlistContext';
import Signin from './Components/Signin';

function App() {
  return (
    <div className="App">
      <FavoriteProvider>
        <WatchlistProvider>
          <Signin />
        </WatchlistProvider>
      </FavoriteProvider>
    </div>
  );
}

export default App;
