import os
import os.path as osp
import io, base64
from typing import Optional
import random
random.seed(2022)

import numpy as np
from PIL import Image
from fastapi import FastAPI
from fastapi.responses import Response, FileResponse


img_dir = osp.join(os.getcwd(), '..', 'images')
app = FastAPI()


@app.get('/api/')
def read_root():
    filenames = os.listdir(img_dir)
    # random.shuffle(filenames)

    return filenames


@app.get('/api/{filename}')
def read_file(filename: str):
    file_path = osp.join(img_dir, filename)

    return FileResponse(file_path, media_type='image/png')

