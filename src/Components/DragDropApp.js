import React, { Component } from 'react';
import './app.css';

class App extends Component {
  state = {
    items: ['🍰 Cake', '🍩 Donut', '🍎 Apple', '🍕 Pizza', '❤️ Heart'],
  };

  render() {
    return (
      <div className="App">
        <main>
          <span role="img" aria-label="love">{'&#x2F; Heart'}</span>
        </main>
      </div>
    );
  }
}

export default App;
