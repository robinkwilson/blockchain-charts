import React from 'react';

import { Button } from '../_common';

export default function CallToAction(props) {
  
  return (
    <div className="chart">
      <div className="container center">
        <h2 className="padding-sm">Data Distribution Options</h2>
        <p>For data and chart integration options, see our Bitcoin Developer API.</p>
        <div id="call-to-action" className="flex-row padding-2">
          <Button linkto={'/chartsandbox'} classes={'btn'} txt={'Interactive Chart Sandbox'} />
          <Button linkto={'#'} classes={'btn'} txt={'Bitcoin Developer API'} />
        </div>
      </div>
    </div>
  );
}