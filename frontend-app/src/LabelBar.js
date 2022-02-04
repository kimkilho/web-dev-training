function LabelBar(props) {
  const handleLabelOnClick = (labelIdx) => {
    props.updateLabel(labelIdx);
  };
  const handleExportLabelsOnClick = async () => {
    const labelsData = await props.retrieveLabels();
    const jsonData = JSON.stringify(labelsData);
    const blob = new Blob([jsonData], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_labels.json';
    a.click();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a
              className={(props.label === 0 ? 'selected ' : '') + "nav-link"}
              href="#"
              onClick={() => handleLabelOnClick(0)}
            >
              Dogs
            </a>
          </li>
          <li className="nav-item">
            <a
              className={(props.label === 1 ? 'selected ' : '') + "nav-link"}
              href="#"
              onClick={() => handleLabelOnClick(1)}
            >
              Cats
            </a>
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleExportLabelsOnClick}>Export Labels</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LabelBar;
