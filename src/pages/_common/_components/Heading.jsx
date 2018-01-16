import React from 'react';

export default function Heading(props) {
  const {title, subtext} = props;
  return (
    <div className="padding-1 center">
      <div className="padding-sm">
        <h2>{title}</h2>
      </div>
      <p className="padding-sm">{subtext}</p>
    </div>
  );
}