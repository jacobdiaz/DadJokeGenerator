import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import logo from "./logo.png";
import uuid from "react-uuid";
const API_URL = "https://icanhazdadjoke.com/";

export default class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);

    this.state = {
      // If there are jokes in the local storage just load those OR parse an empty string
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
    };
    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // If there aren't any jokes in state get jokes
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    // Array to hold all the jokes from the api
    let fetchedJokes = [];
    // Populate an array with jokes from api
    while (fetchedJokes.length < this.props.numJokesToGet) {
      let apiRes = await axios.get(API_URL, {
        headers: { Accept: "application/json" },
      });
      fetchedJokes.push({ joke: apiRes.data.joke, votes: 0, id: uuid() });
    }
    /// Set State to array of jokes that were just fetched
    this.setState(
      (st) => ({
        jokes: [...st.jokes, ...fetchedJokes],
      }),

      // Saving jokes to Local Storage

      () => {
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)); // Local storage can only hold strings so we have to stringify the json
      }
    );
  }
  handleVote(id, delta) {
    // Set State
    this.setState((st) => ({
      // map through jokes
      jokes: st.jokes.map(
        (j) =>
          // If the id is equal to the id of the button it was clicked then set the number of votes plus change (delta)
          j.id === id ? { ...j, votes: j.votes + delta } : j // If its not the joke we are looking for we are just returning the joke
      ),
    }));

    // Update Local Storage
    window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }

  handleClick() {
    this.getJokes();
  }

  render() {
    return (
      <div className="joke-list">
        <div className="joke-list-leftCol">
          <div className="logo">
            <img alt="logo" src={logo} className="logo"></img>
          </div>
          <h1>Dad Jokes</h1>
          <button className="more-jokes-btn" onClick={this.handleClick}>
            Get more jokes!
          </button>
        </div>
        <div className="joke-list-rightCol">
          {this.state.jokes.map((j) => (
            <Joke
              key={j.id}
              jokeText={j.joke}
              votes={j.votes}
              upVote={() => {
                this.handleVote(j.id, 1);
              }}
              downVote={() => {
                this.handleVote(j.id, -1);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
