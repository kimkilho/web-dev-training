import os
import os.path as osp
import random

from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

img_dir = osp.join(os.getcwd(), '..', 'images')
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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Label not found')
    return db_label


@app.post('/api/labels', response_model=schemas.Label)
def create_or_update_label(label: schemas.LabelCreate, db: Session = Depends(get_db)):
    db_label = crud.read_label_by_filename(db, filename=label.filename)
    if db_label:
        return crud.update_label(db, label=label)
    return crud.create_label(db, label=label)
