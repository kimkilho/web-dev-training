from sqlalchemy.orm import Session

import models, schemas


def read_label_by_filename(db: Session, filename: str):
    return db.query(models.Label).filter(models.Label.filename == filename).first()


def create_label(db: Session, label: schemas.LabelCreate):
    db_label = models.Label(filename=label.filename, label_idx=label.label_idx)
    db.add(db_label)
    db.commit()
    db.refresh(db_label)
    return db_label


def update_label(db: Session, label: schemas.LabelCreate):
    db_label = db.query(models.Label).filter(models.Label.filename == label.filename).first()

    if not db_label:
        raise NotImplementedError

    db_label.label_idx = label.label_idx
    db.commit()
    db.refresh(db_label)
    return db_label
