import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import {Header} from "./common";
import {fetchRaceList, selectRace} from "../actions/createCharacter";

const mapStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
        raceList: state.createCharacterReducer.raceList,
        fetching: state.createCharacterReducer.fetching,
    };
};

class CreateCharacterComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchRaceList());
    }

    onSelect(race) {
        this.props.dispatch(selectRace(this.props.character, race));
        this.props.history.push("/character/new/class");
    }

    render() {
        if (this.props.fetching) {
            return (
                <div className="loading-spinner narrow-module">
                    <CircularProgress size={50} thickness={5} color="#005453" />
                </div>
            );
        }

        var that = this;
        var raceList = this.props.raceList.map(function(race, index) {
            return (
                <div key={index}>
                    <div
                        className="list-item"
                        onClick={() => {
                            that.onSelect(race);
                        }}>
                        {race.name}
                    </div>
                    <Divider />
                </div>
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Select Race" />
                    <div className="add-content-list">
                        {raceList}
                    </div>
                </div>
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={this._onResize.bind(this)}
                />
            </div>
        );
    }

    _onResize(args) {
        console.log(args);
    }
}

const CreateCharacter = connect(mapStateToProps)(CreateCharacterComponent);

export default CreateCharacter;
