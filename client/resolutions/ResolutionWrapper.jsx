import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

Resolutions = new Mongo.Collection('resolutions');

export default class ResolutionWrapper extends TrackerReact(React.Component) {
    constructor() {
        super();
        this.state = {
            subscription: {
                resolutions: Meteor.subscribe('userResolutions')
            }
        }
        //Meteor.call('getEAData');
    }

    componentWillUnmount() {
        this.state.subscription.resolutions.stop();
    }

    resolutions() {
        return Resolutions.find().fetch();
    }


    render() {
        let res = this.resolutions();
        return (
            <div>
                <h1>Resolutions</h1>
                <ResolutionsForm />
                <ReactCSSTransitionGroup
                    component="ul"
                    className="resolutions"
                    transitionName="resolutionLoad"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}
                >
                    {this.resolutions().map((resolution) => {
                        return <ResolutionSingle key={resolution._id} resolution={resolution} />
                    })}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

