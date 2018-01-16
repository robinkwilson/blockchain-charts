import React from 'react';

import { Stat } from '../../_common';

export default function PrintedStats(props) {
  return (
    props.printedStats.map((cur, index) => {
      return (
        cur.hidden === false
          ? <Stat
            key={index}
            title={cur.title}
            data={cur.data ? cur.data : null}
            unit={cur.unit}
            sign={cur.sign ? cur.sign : ''} />
          : ''
      )
    })
  );
}