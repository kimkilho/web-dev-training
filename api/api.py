import os
import os.path as osp
import random

from fastapi import FastAPI, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

img_dir = osp.join(os.getcwd(), 'images')
filenames = os.listdir(img_dir)
random.Random(2022).shuffle(filenames)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/api/')
def read_root():
    return filenames


@app.get('/api/{filename}')
def read_file(filename: str):
    file_path = osp.join(img_dir, filename)
    return FileResponse(file_path, media_type='image/png')


@app.get('/api/labels/{filename}', response_model=schemas.Label)
def read_label(filename: str, db: Session = Depends(get_db)):
    db_label = crud.read_label_by_filename(db, filename=filename)
    if db_label is None:
        # Create an 'unlabeled' label instance manually
        label = schemas.LabelCreate(filename=filename, label_idx=-1)
        return crud.create_label(db, label=label)
    return db_label


@app.get('/api/labels/')
def read_labels_as_file(skip: int = 0, limit: int = 110, db: Session = Depends(get_db)):
    db_labels = crud.read_labels(db, skip=skip, limit=limit)

    # Filter label instances whose label_idx == -1
    filtered_labels = []
    for db_label in db_labels:
        if db_label.label_idx == -1:
            continue
        filtered_labels.append({
            'filename': db_label.filename,
            'label': 'dogs' if db_label.label_idx == 0 else 'cats',
        })

    return filtered_labels


@app.post('/api/labels', response_model=schemas.Label)
def create_or_update_label(label: schemas.LabelCreate, db: Session = Depends(get_db)):
    db_label = crud.read_label_by_filename(db, filename=label.filename)
    if db_label:
        return crud.update_label(db, label=label)
    return crud.create_label(db, label=label)
