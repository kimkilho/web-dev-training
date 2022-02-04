import { useEffect, useRef } from 'react';


function Canvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (props.imgBlob) {
      const imgURL = URL.createObjectURL(props.imgBlob);
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      };
      img.src = imgURL;
    }
  }, [props]);

  return (
    <div className="container-fluid">
      <canvas width="512px" height="512px" ref={canvasRef} />
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
