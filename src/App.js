import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";

import Recipes from "./components/Recipes";

const API_KEY = "999ff018bd3f5bb4b3eaa0e0313e327c";

class App extends Component {
  state = {
    recipes: []
  };

  componentDidUpdate = (prevProps, prevState) => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipe", recipes);
  };

  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  };

  getRecipe = async e => {
    console.log("call");
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(
      `https://www.food2fork.com/api/search?key=${API_KEY}&q=chicken%20breast&qcount=10`
    );
    // debugger;
    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
