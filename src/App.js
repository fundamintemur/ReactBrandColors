import './App.css';
import MainContext from './MainContext';
import Sidebar from './componets/Sidebar';
import Content from './componets/Content';
import { useState, useEffect } from 'react';
import BrandsData from './brand.json';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Copied from './componets/Copied';
import Collection from './componets/Collection';

function App() {
  const brandsArray = Object.keys(BrandsData).map(key => BrandsData[key]);
 
  const [brands, setBrands] = useState(brandsArray);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    setBrands(brandsArray.filter(brand => brand.title.toLowerCase().includes(search)));
  }, [search, brandsArray]);

  const data = {
    brands,
    selectedBrands,
    setSelectedBrands,
    setCopied,
    search,
    setSearch
  };

  return (
    <>
      <MainContext.Provider value={data}>
        {copied && <Copied color={copied} />}
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/collection/:slugs" element={<Collection />} />
          </Routes>
        </Router>
      </MainContext.Provider>
    </>
  );
}

export default App;
