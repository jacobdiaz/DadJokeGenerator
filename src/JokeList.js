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
      jokes: [],
    };
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    let fetchedJokes = [];

    // Populate an array with jokes from api
    while (fetchedJokes.length < this.props.numJokesToGet) {
      let apiRes = await axios.get(API_URL, {
        headers: { Accept: "application/json" },
      });
      fetchedJokes.push({ joke: apiRes.data.joke, votes: 0, id: uuid() });
    }

    console.log(fetchedJokes);
    /// Set State to array of jokes that were just fetched
    this.setState({ jokes: fetchedJokes });
  }
  handleVote(id, delta) {
    this.setState((st) => ({
      // map through jokes
      jokes: st.jokes.map(
        (j) =>
          // If the id is equal to the id of the button it was clicked then set the number of votes plus change (delta)
          j.id === id ? { ...j, votes: j.votes + delta } : j // If its not the joke we are looking for we are just returning the joke
      ),
    }));
  }

  render() {
    return (
      <div className="joke-list">
        <div className="joke-list-leftCol">
          <div className="logo">
            <img alt="logo" src={logo} className="logo"></img>
          </div>
          <h1>Dad Jokes</h1>
          <button className="more-jokes-btn">Get more jokes!</button>
        </div>
        <div className="joke-list-rightCol">
          {this.state.jokes.map((j) => (
            <Joke
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
