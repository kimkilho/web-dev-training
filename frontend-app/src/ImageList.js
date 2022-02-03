import { useEffect, useState } from 'react';

function ImageList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Temporary code for populating files
    if (items.length === 0) {
      const tempItems = [];
      for (let i = 0; i < 50; i++) {
        tempItems.push(
          <a href="#" className="list-group-item list-group-item-action bg-light">File</a>
        );
      }
      setItems(tempItems);
    }
  }, [items]);

  return (
    <div className="bg-light border-right vh-100" id="sidebar-wrapper">
      <div className="list-group list-group-flush overflow-auto h-100">
        { items }
      </div>
    </div>
  );
}

export default ImageList;
