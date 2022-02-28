import base64
import requests

SERVICE_ENDPOINT_URI = 'http://cf1cd246-d51c-435b-bf4f-9484db1b3275.koreacentral.azurecontainer.io/score'


if __name__ == '__main__':
    scoring_uri = SERVICE_ENDPOINT_URI
    img_file_path = '../images/cat.0.jpg'

    with open(img_file_path, 'rb') as fid:
        img_b64 = base64.b64encode(fid.read())
    req_data = '{"image": "' + img_b64.decode('utf-8') + '"}'
    headers = {'Content-Type': 'application/json'}

    response = requests.post(scoring_uri, req_data, headers=headers)

    resp_data = response.json()

    print(resp_data)
