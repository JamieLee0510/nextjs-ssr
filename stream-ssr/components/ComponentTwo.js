import React from 'react';

export const ComponentTwo = () => {
  const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1} from Component Two`);


  return <div><h2>Component Two</h2>
  <ul>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul></div>;
};