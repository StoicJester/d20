import React from "react";

import {connect} from "react-redux";

import {Header} from "./common";

const mapStateToProps = (state, props) => {
    return {
        characterItems: state.itemInfoReducer.characterItems,
    };
};

class SkillsHeader extends React.Component {
    render() {
        return (
            <tr className="skill-row">
                <td className="table-header narrow">Bonus</td>
                <td className="table-header">Skill Name</td>
            </tr>
        );
    }
}

class SkillRow extends React.Component {
    render() {
        return (
            <tr className="skill-row">
                <td className="white-block">{this.props.skill.bonus}</td>
                <td className={this.props.rowColor}>{this.props.skill.name}</td>
            </tr>
        );
    }
}

class SkillsComponent extends React.Component {
    render() {
        var that = this;
        var light = false;

        var skillsList = this.props.character.skills.map(function(
            skill,
            index,
        ) {
            var rowColor = function() {
                light = !light;
                return light ? "light-block" : "dark-block";
            };

            var bonus = that.props.character.skillScore(
                skill.name,
                that.props.characterItems,
            );
            var multiplier = skill.expertise ? 2 : 1;

            if (skill.proficient) {
                bonus =
                    bonus +
                    that.props.character.proficiencyBonus() * multiplier;
            }

            var props = {
                bonus: bonus + (skill.proficient ? "*" : ""),
                name: skill.name,
            };

            return <SkillRow key={index} skill={props} rowColor={rowColor()} />;
        });

        return (
            <div id="skills" className="narrow-module">
                <Header name="Skills" />
                <table className="skills-table">
                    <tbody>
                        <SkillsHeader />
                        {skillsList}
                    </tbody>
                </table>
            </div>
        );
    }
}

const Skills = connect(mapStateToProps)(SkillsComponent);

export default Skills;
