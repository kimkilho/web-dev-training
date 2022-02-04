import os
import os.path as osp
import io, base64
from typing import Optional
import random

import numpy as np
from PIL import Image
from fastapi import FastAPI
from fastapi.responses import Response, FileResponse


img_dir = osp.join(os.getcwd(), '..', 'images')
filenames = os.listdir(img_dir)
random.Random(2022).shuffle(filenames)

app = FastAPI()


@app.get('/api/')
def read_root():
    return filenames


@app.get('/api/{filename}')
def read_file(filename: str):
    file_path = osp.join(img_dir, filename)

    return FileResponse(file_path, media_type='image/png')

