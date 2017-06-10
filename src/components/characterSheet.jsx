import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import AbilityScores from "./abilityScores";
import Background from "./background";
import Combat from "./combat";
import ClassSpells from "./classSpells";
import Equipment from "./equipment";
import Portrait from "./portrait";
import Skills from "./skills";
import Spells from "./spells";
import Status from "./status";

import Player from "../models/player";

const receiveCharacter = (name, json) => {
    return {
        type: "GET_CHARACTER_SUCCESS",
        isLoading: false,
        character: new Player(json),
    };
};

const characterRequested = () => {
    return {
        type: "CHARACTER_REQUESTED",
        isLoading: true,
    };
};

export function fetchCharacter(name) {
    return function(dispatch) {
        dispatch(characterRequested());

        var url = "/character";

        if (window.location.href.includes("localhost")) {
            url = "http://localhost:8080" + url;
        } else if (window.location.href.includes("192.")) {
            url = "http://192.168.86.185:8080" + url;
        }

        return fetch(url).then(response => response.json()).then(json =>
            dispatch(receiveCharacter(name, json)),
        );
    };
}

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
    };
};

class CharacterSheetView extends React.Component {
    render() {
        if (this.props.character !== undefined) {
            return (
                <div>
                    <div className="character-sheet">
                        <div id="left-container">
                            <Portrait character={this.props.character} />
                            <Status cls="mobile-status" />
                            <Combat character={this.props.character} />
                            <Equipment character={this.props.character} />
                        </div>
                        <div id="right-container">
                            <Status cls="desktop-status" />
                            <AbilityScores character={this.props.character} />
                            <Skills character={this.props.character} />
                        </div>
                    </div>
                    <div className="character-sheet lower-sheet">
                        <ClassSpells character={this.props.character} />
                        <Spells character={this.props.character} />
                    </div>
                    <div className="character-sheet lower-sheet">
                        <Background character={this.props.character} />
                    </div>
                    <ReactResizeDetector
                        handleWidth
                        handleHeight
                        onResize={this._onResize.bind(this)}
                    />
                </div>
            );
        } else {
            this.props.dispatch(fetchCharacter("varis"));
            return null;
        }
    }

    _onResize() {}
}

const CharacterSheet = connect(mapStateToProps)(CharacterSheetView);

export default CharacterSheet;
