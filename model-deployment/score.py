import os
import os.path as osp
import io
import base64
import json

import numpy as np
from skimage import transform
from PIL import Image
import torch
import torchvision.transforms as transforms


def init():
    global model
    global transform_fn

    CHANNEL_MEAN = [0.485, 0.456, 0.406]
    CHANNEL_STD = [0.229, 0.224, 0.225]

    class Rescale(object):
        """Rescale the image in a sample to a given size."""

        def __init__(self, output_size):
            assert isinstance(output_size, (int, tuple))
            self.output_size = output_size

        def __call__(self, image):
            h, w = image.shape[:2]
            if isinstance(self.output_size, int):
                if h > w:
                    new_h, new_w = self.output_size * h / w, self.output_size
                else:
                    new_h, new_w = self.output_size, self.output_size * w / h
            else:
                new_h, new_w = self.output_size
            new_h, new_w = int(new_h), int(new_w)
            img = transform.resize(image, (new_h, new_w))
            return img

    transform_fn = transforms.Compose([Rescale((224, 224)),
                                       transforms.ToTensor(),
                                       transforms.Normalize(CHANNEL_MEAN, CHANNEL_STD)])

    # AZUREML_MODEL_DIR is an environment variable created during deployment.
    # It is the path to the model folder (./azureml-models/$MODEL_NAME/$VERSION)
    # For multiple models, it points to the folder containing all deployed models (./azureml-models)
    model_path = osp.join(os.getenv('AZUREML_MODEL_DIR'), 'asirra_ResNet50.pth')
    model = torch.load(model_path, map_location=lambda storage, loc: storage)
    model.eval()


def run(data):
    data_json = json.loads(data)
    img_b64 = data_json['image']    # Get the base64 encoded string
    img_bytes = base64.b64decode(img_b64.encode('utf-8'))    # Convert it into bytes
    img = np.array(Image.open(io.BytesIO(img_bytes)))    # Convert bytes data to PIL Image object

    input = torch.unsqueeze(transform_fn(img), dim=0).float()    # (1, C, H, W)

    # Mode the input and model to GPU for speed if available
    if torch.cuda.is_available():
        input = input.to('cuda')
        model.to('cuda')

    with torch.no_grad():
        output = model(input)
    result = output.cpu().numpy().tolist()[0]

    return result
