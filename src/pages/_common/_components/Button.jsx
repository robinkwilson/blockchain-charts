import React from 'react';
import { Link } from 'react-router-dom';

export default function Button(props) {
  const { linkto, classes, txt } = props;
  return (
    <div>
      {
        linkto
          ? <Link to={linkto}><button className={classes}>{txt}</button></Link>
          : (<button className={classes}>{txt}</button>)
      }
    </div>
  );
}