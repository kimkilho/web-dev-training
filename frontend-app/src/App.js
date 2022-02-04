import { useState, useEffect } from 'react';
import './App.css';
import LabelBar from './LabelBar';
import ImageList from './ImageList';
import Canvas from './Canvas';

// Layout reference: https://www.codeply.com/p/VVByb17KWb

function App() {
  const [imgFilenames, setImgFilenames] = useState(null);
  const [imgFilename, setImgFilename] = useState('');
  const [imgBlob, setImgBlob] = useState(null);
  const [label, setLabel] = useState(-1);

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
      setImgFilename(filename);
      setImgBlob(imgBlob);
    }
  };

  const retrieveLabel = async (filename) => {
    const response = await fetch(`/api/labels/${filename}`, {
      method: 'GET',
    });

    if (response.status === 200) {
      const labelData = await response.json();
      setLabel(labelData.label_idx);
    }
  };

  const updateLabel = async (labelIdx) => {
    const data = {filename: imgFilename, label_idx: labelIdx}
    const response = await fetch('/api/labels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const labelData = await response.json();
      setLabel(labelData.label_idx);
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
          <ImageList
            imgFilenames={imgFilenames}
            retrieveImgFile={retrieveImgFile}
            retrieveLabel={retrieveLabel}
          />
        </div>
        { /* /ImageList */ }

        { /* Page Content */ }
        <div id="page-content-wrapper">
          <LabelBar
            label={label}
            updateLabel={updateLabel}
          />
          <Canvas imgBlob={imgBlob} />
        </div>
        { /* /Page Content */ }
      </div>
    </div>
  );
}

export default App;
