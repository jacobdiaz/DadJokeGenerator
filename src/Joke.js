import React, { Component } from "react";
import "./JokeList.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default class Joke extends Component {
  render() {
    return (
      <div className="joke-item">
        {/* Arrow Buttons */}
        <div className="joke-btn">
          <FaArrowUp onClick={this.props.upVote} className="arrow" />
        </div>
        <span className="votes">{this.props.votes}</span>
        <div className="joke-btn">
          <FaArrowDown onClick={this.props.downVote} className="arrow" />
        </div>

        {/* Joke Text */}
        <div className="joke-text">{this.props.jokeText}</div>
      </div>
    );
  }
}
