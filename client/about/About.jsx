import React, { Component } from 'react';

export default class About extends Component {
    setVar(){
        Session.set('Meteor.loginButtons.dropdownVisible', true);
    }

    render() {
        return (
            <div>
                <h2>About</h2>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
                <button onClick={this.setVar}>Click</button>
            </div>
        )
    }
}