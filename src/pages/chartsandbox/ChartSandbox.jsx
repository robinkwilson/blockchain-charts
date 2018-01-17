import React, { Component } from 'react';

export default class ChartSandbox extends Component {
  render() {
    return (
      <div id="chartsandbox" className="container">
        <h2>An Ode to the Unfinished ChartSandbox</h2>
        <p className="font-weight-bold">Oh sweet and almost-to-be Magnificent ChartSandbox,</p>
        <p>You were planned to have a multitude of fantastic buttons to grace your user interface.</p>
        <p className="font-weight-bold">Upon each carefully chosen dataset, the marvelous Master Chart<sup>TM</sup> would have been populated for the user to compare magnitude and better understand each Bitcoin dataset.</p>
        <p>Alas, my dear friend. It was simply not meant to be.</p> 
        <p className="font-weight-bold">Please enjoy a photo of a silly kitten to ease your woes.</p>

        <div className="padding-1 center">
              <img src={`../../../../public/img/funnycat.jpg`} width="400px" />
            </div>
      </div>
    )
  }
}