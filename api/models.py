from sqlalchemy import Column, Integer, String

from .database import Base


# Define Label class inheriting from Base
class Label(Base):
    __tablename__ = 'labels'

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    label_idx = Column(Integer, default=-1)
