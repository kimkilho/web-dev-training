function Canvas(props) {
  return (
    <div className="container-fluid">
      <canvas width="512px" height="512px" />
      <div className="row">
        { /* the following contents are to-be-deleted */ }
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
  );
}

export default Canvas;
