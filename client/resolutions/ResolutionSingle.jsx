import React, {Component} from 'react';

export default class ResolutionSingle extends Component {
    toggleChecked() {
        Meteor.call('toggleResolution', this.props.resolution);
    }
    
    deleteResolution() {
        Meteor.call('removeResolution', this.props.resolution);
    }
        
    render() {
        const className = this.props.resolution.complete ? "checked" : "";
        const status = this.props.resolution.complete ? <span className="completed">Complete</span> : '';

        return (
            <li className={className}>
                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.resolution.complete}
                    onClick={this.toggleChecked.bind(this)}
                />
                {this.props.resolution.text}
                {status}
                <button onClick={this.deleteResolution.bind(this)}>
                    &times;</button>
            </li>
        )
    }
}