import { useState, useEffect } from 'react';
import './App.css';
import LabelBar from './LabelBar';
import ImageList from './ImageList';
import Canvas from './Canvas';

// Layout reference: https://www.codeply.com/p/VVByb17KWb

function App() {
  const [imgFilenames, setImgFilenames] = useState(null);
  const [imgBlob, setImgBlob] = useState(null);

  const retrieveImgFilenames = async () => {
    const response = await fetch('/api/', {
      method: 'GET',
    });

    if (response.status === 200) {
      setImgFilenames(await response.json());
    }
  };

  const retrieveImgFile = async (filename) => {
    const response = await fetch(`/api/${filename}`, {
      method: 'GET',
    });

    if (response.status === 200) {
      const imgBlob = await response.blob();
      setImgBlob(imgBlob);
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
          <ImageList imgFilenames={imgFilenames} retrieveImgFile={retrieveImgFile} />
        </div>
        { /* /ImageList */ }

        { /* Page Content */ }
        <div id="page-content-wrapper">
          <LabelBar />
          <Canvas imgBlob={imgBlob} />
        </div>
        { /* /Page Content */ }
      </div>
    </div>
  );
}

export default App;
