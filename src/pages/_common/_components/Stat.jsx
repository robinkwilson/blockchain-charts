import React from 'react';

import { numberWithCommasNoDecimals, numberWithCommasWithDecimals } from '../';

export default function Stat(props) {
  const { title, data, unit, sign } = props;
  return (
    <div className="padding-sm">
      <span className="no-p-m fnt-md">{title}</span>
      <p className="fnt-xxlg padding-xsm">{sign + (data.toString().indexOf('.') === -1 ? numberWithCommasNoDecimals(data) : numberWithCommasWithDecimals(data))}</p>
      <p className="fnt-sm no-p-m">{unit}</p>
    </div>
  );
}