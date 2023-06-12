import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/saved-recipes';
import { Navbar } from './components/navbar'


function App() {
  return (
    <div className="App">
      <Router>   {/* Wrap this page with this BrowserRouter in order to apply all its rules here*/}
      <Navbar/>
        <Routes>   {/*  Wraps all Routes */}
          <Route path="/" element={ <Home/> } /> {/* This is an individual route, homepage, therefore a page in the website */}
          <Route path="/auth" element={ <Auth/> } /> 
          <Route path="/create-recipe" element={ <CreateRecipe/> } /> 
          <Route path="/saved-recipes" element={ <SavedRecipes/> } /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
