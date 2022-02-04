from typing import Optional

from pydantic import BaseModel


# Create LabelBase schema (Pydantic model)
class LabelBase(BaseModel):
    filename: str
    label_idx: int


class LabelCreate(LabelBase):
    pass


class Label(LabelBase):
    id: int

    class Config:
        orm_mode = True
