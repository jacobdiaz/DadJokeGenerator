import React, { Component } from "react";
import "./JokeList.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default class Joke extends Component {
  // Picks the border color for the number of votes
  getColor() {
    switch (true) {
      case this.props.votes >= 15:
        return "#4CAF50";
      case this.props.votes >= 12:
        return "#8BC34A";
      case this.props.votes >= 9:
        return "#CDDC39";
      case this.props.votes >= 3:
        return "#FFEB3B";
      case this.props.votes >= 0:
        return "#FFC107";
    }
  }
  // Picks the emoji for number of votes
  getEmoji() {
    switch (true) {
      case this.props.votes >= 15:
        return <i className="em em-rolling_on_the_floor_laughing"></i>;
      case this.props.votes >= 12:
        return <i className="em em-laughing"></i>;
      case this.props.votes >= 9:
        return <i className="em em-smiley"></i>;
      case this.props.votes >= 3:
        return <i className="em em-slightly_smiling_face"></i>;
      case this.props.votes >= 0:
        return <i className="em em-confused"></i>;
      default:
        return <i className="em em-angry"></i>;
    }
  }

  render() {
    return (
      <div className="joke-item">
        {/* Arrow Buttons */}
        <div className="joke-btn">
          <FaArrowUp onClick={this.props.upVote} className="arrow" />
        </div>
        <span className="votes" style={{ borderColor: this.getColor() }}>
          {this.props.votes}{" "}
        </span>
        <div className="joke-btn">
          <FaArrowDown onClick={this.props.downVote} className="arrow" />
        </div>

        {/* Joke Text */}
        <div className="joke-text">{this.props.jokeText}</div>
        <div className="joke-emoji">{this.getEmoji()}</div>
      </div>
    );
  }
}
