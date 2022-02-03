import './App.css';
import LabelBar from './LabelBar';
import ImageList from './ImageList';
import Canvas from './Canvas';

// Layout reference: https://www.codeply.com/p/VVByb17KWb

function App() {
  return (
    <div className="App">
      <div className="d-flex" id="wrapper">
        { /* ImageList */ }
        <div className="bg-light border-right vh-100" id="sidebar-wrapper">
          <div className="sidebar-heading">Labeling Tool</div>
          <ImageList />
        </div>
        { /* /ImageList */ }

        { /* Page Content */ }
        <div id="page-content-wrapper">
          <LabelBar />
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default App;
