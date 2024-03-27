import React, { useState, useEffect } from 'react';

export const ComponentOne = () => {

  const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1} from Component One`);
 

  return <div>
    <h2>Component One</h2>
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>;
};