import React from 'react';

export default function FilterButton(props) {
  return (
    <button type="button" onClick={props.onClick} className={props.classes} data-toggle="button" aria-pressed="false" autoComplete="off">
      {props.text}
    </button>
  );
}