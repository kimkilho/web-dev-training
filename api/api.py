import os
import os.path as osp
import io, base64
from typing import Optional
import random
random.seed(2022)

import numpy as np
from PIL import Image
from fastapi import FastAPI
from starlette.responses import StreamingResponse


img_dir = osp.join(os.getcwd(), '..', 'images')
app = FastAPI()


def encode_img(img):
    """img: PIL.Image"""
    img_bytes = io.BytesIO()
    img.save(img_bytes, format='PNG')
    img_encoded = base64.encodebytes(img_bytes.getvalue()).decode('ascii')

    return img_encoded


@app.get('/api/')
def read_root():
    filenames = os.listdir(img_dir)
    # random.shuffle(filenames)

    return filenames


@app.get('/api/{filename}')
def read_file(filename: str):
    file_path = osp.join(img_dir, filename)
    img = Image.open(file_path).convert('RGBA')
    img_encoded = encode_img(img)

    return StreamingResponse(img_encoded)

