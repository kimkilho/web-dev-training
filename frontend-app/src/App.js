import { Link } from 'react-router-dom';


function App() {
  return (
    <div>
      <h1>R&D Team 1's Web Development Training: Kyle's Outcomes</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to='/labeler'>Labeling Tool</Link> |{" "}
        <Link to='/classifier'>Classifier Tool</Link>
      </nav>
    </div>
  );
}

export default App;
