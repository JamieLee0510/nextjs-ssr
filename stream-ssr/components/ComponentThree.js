import React, { useState, useEffect } from 'react';

export const ComponentThree = () => {
  const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1} from Component Three`);
  
  return <div><h2>Component Three</h2>
  <ul>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul></div>;
};