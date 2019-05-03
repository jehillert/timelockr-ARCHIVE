import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const App = () => {
  const [fraction, setFraction] = useState(25);

  const handleChangeEvent(event) {
    setFraction(event.target.value);
  }

  return (
    <div>
      <CircularProgressBar
        strokeWidth="10"
        sqSize="200"
        percentage={fraction}
      />
      <div>
        <input
          id="progressInput"
          type="range"
          min="0"
          max="100"
          step="1"
          value={fraction}
          onChange={this.handleChangeEvent}
          onChange={() => serPercentage(value)}
        />
      </div>
    </div>
  );
}

export default App;

<div class="container">
  <h1 class="text-center">Simple Circular Progress Bar using React</h1>
  <div class="text-center" id="app">
  </div>

</div>
