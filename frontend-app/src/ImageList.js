import { useEffect, useState } from 'react';


function ImageList(props) {
  // const [imageURL, setImageURL] = useState(null);
  const [imgFilenames, setImgFilenames] = useState(null);
  const [selectedImgIdx, setSelectedImgIdx] = useState(null);

  useEffect(() => {
    const tempImgFilenames = [];

    const handleImgItemOnClick = (filename, i) => {
      props.retrieveImgFile(filename);
      props.retrieveLabel(filename);
      setSelectedImgIdx(i);
    }

    if (props.imgFilenames) {
      props.imgFilenames.forEach((filename, i) => {
        const selectedFlag = i === selectedImgIdx ? 'selected ' : '';
        const imgItem =
          <a key={i} href="#" onClick={() => handleImgItemOnClick(filename, i)}
             className={selectedFlag + "list-group-item list-group-item-action bg-light"}
          >
            { filename }
          </a>
        tempImgFilenames.push(imgItem);
      });
      setImgFilenames(tempImgFilenames);
    }
  }, [props, selectedImgIdx]);

  return (
    <div className="bg-light border-right vh-100" id="sidebar-wrapper">
      <div className="list-group list-group-flush overflow-auto h-100">
        { imgFilenames }
      </div>
    </div>
  );
}

export default ImageList;
