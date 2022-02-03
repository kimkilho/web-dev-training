import { useState, useEffect } from 'react';
import './App.css';
import LabelBar from './LabelBar';
import ImageList from './ImageList';
import Canvas from './Canvas';

// Layout reference: https://www.codeply.com/p/VVByb17KWb

function App() {
  const [imgFilenames, setImgFilenames] = useState(null);

  const retrieveImgFilenames = async () => {
    const response = await fetch('/api/', {
      method: 'GET',
    });

    if (response.status === 200) {
      setImgFilenames(await response.json());
    }
  };

  useEffect(() => {
    if (!imgFilenames) {
      retrieveImgFilenames();
    }
  }, [imgFilenames]);

  return (
    <div className="App">
      <div className="d-flex" id="wrapper">
        { /* ImageList */ }
        <div className="bg-light border-right vh-100" id="sidebar-wrapper">
          <div className="sidebar-heading">Labeling Tool</div>
          <ImageList imgFilenames={imgFilenames} />
        </div>
        { /* /ImageList */ }

        { /* Page Content */ }
        <div id="page-content-wrapper">
          <LabelBar />
          <Canvas />
        </div>
        { /* /Page Content */ }
      </div>
    </div>
  );
}

export default App;
