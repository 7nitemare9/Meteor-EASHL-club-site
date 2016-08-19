import React, { Component } from 'react';

export default class Footer extends Component {

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 b_footer b_column">
        <div className="b_box">
          <div className="col-lg-6 col-md-8 col-sm-12">
            <img src="/assets/EA_sports.jpg" width="101" alt=""/>
            <img src="/assets/react-logo.png" width="60" alt=""/>
            <img src="/assets/mongodb.png" width="50" style={{background: "#ffffff"}} alt=""/>
            <img src="/assets/meteor-logo.png" width="100" style={{background: "#ffffff"}} alt=""/>
            <img src="/assets/twitter-bootstrap.jpg" width="102" alt=""/>
          </div>
          <div className="col-lg-6 col-lg-push-0 col-md8 col-md-push-2 col-sm-12">
            <div className="col-lg-4 col-md-3 col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Idea, JS and css code</h3>
                </div>
                <div className="panel-body">Andreas "Sorkpippi" Östlund</div>
              </div>
            </div>
            <div className="col-lg-4 col-md-3 col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Idea, design and graphics</h3>
                </div>
              <div className="panel-body">Mattias "Dexrion" Nilsson</div>
            </div>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Graphics</h3>
              </div>
            <div className="panel-body">Nic "ZHiTNiK" Lega</div>
            </div>
          </div>
        </div>
        <br className="b_clear"/>
      </div>
    </div>
    )
  }
}
