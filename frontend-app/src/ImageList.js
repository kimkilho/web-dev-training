import { useEffect, useState } from 'react';


function ImageList(props) {
  // const [imageURL, setImageURL] = useState(null);
  const imgFilenames = [];

  // TODO: Implement
  // const retrieveImage = async (filename) => {
    // const response = await fetch(`/api/${filename}`, {
    //   method: 'GET',
    // });
    //
    // if (response.status === 200) {
    //   let
    // }
  // };

  if (props.imgFilenames) {
    props.imgFilenames.forEach((filename, i) => {
      imgFilenames.push(
        <a key={i} href="#" className="list-group-item list-group-item-action bg-light">{ filename }</a>
      );
    });
  }

  return (
    <div className="bg-light border-right vh-100" id="sidebar-wrapper">
      <div className="list-group list-group-flush overflow-auto h-100">
        { imgFilenames }
      </div>
    </div>
  );
}

export default ImageList;
