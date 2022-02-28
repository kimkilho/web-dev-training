import { useState, useRef } from 'react';
import './ClassifierScreen.css';

function ClassifierScreen() {
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState('');
  const imageRef = useRef();
  const classNames = ['dogs', 'cats'];

  const uploadImage = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      imageRef.current = file;
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setResult('');
    }
  }

  const predict = async () => {
    const formData = new FormData();
    formData.append('file', imageRef.current);

    const response = await fetch('/api/predict', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200) {
      const predictionData = await response.json();
      const tempResult = [];
      predictionData.map((x, i) => {
        const string = `${classNames[i]}: ${x}`;
        tempResult.push(<p key={i}>{string}</p>)
      });
      setResult(tempResult);
    } else {
      console.log('Error from API.');
    }
  };

  return (
    <>
      <h1 className="header">Classifier Tool</h1>
      <div className="input-holder">
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />
      </div>
      <div className="image-wrapper">
        <div className="image-holder">
          {imageURL &&
            <img
              src={imageURL}
              alt="Image"
              crossOrigin="anonymous"
            />
          }
        </div>
      </div>
      <div className="button-holder">
        {imageURL && <button className="button" onClick={predict}>
          Predict</button>}
        <p>Prediction result:</p>
        {result}
      </div>
    </>
  );
}

export default ClassifierScreen;