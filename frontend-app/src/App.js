import './App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Canvas />
        </div>
        { /* the following contents are to-be-deleted */ }
        <div className="row">
          <h3>Key features</h3>
          <ul>
            <li>
              Present an image to review (in a random order)
            </li>
            <li>
              Select a class among multiple classes to label
            </li>
            <li>
              Store labels into a database
            </li>
            <li>
              Export labels as as JSON file
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
