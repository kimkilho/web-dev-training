from azureml.core import Workspace
from azureml.core import Environment
from azureml.core import Model
from azureml.core.model import InferenceConfig
from azureml.core.webservice import AciWebservice

# Reference 1: https://docs.microsoft.com/en-us/python/api/overview/azure/ml/?view=azure-ml-py#model-deploy
# Reference 2: https://docs.microsoft.com/en-us/azure/machine-learning/how-to-deploy-and-where?tabs=python
# Reference 3: https://docs.microsoft.com/en-us/azure/machine-learning/tutorial-train-deploy-notebook
# Reference 4: https://github.com/hnky/amls-pytorch/blob/master/Transfer%20Learning%20with%20PyTorch%20AMLS.ipynb


if __name__ == '__main__':
    # Set up the key components for deployment
    ws = Workspace.from_config(path='./ws-config.json')
    # env = Environment.get(
    #     workspace=ws,
    #     name='AzureML-pytorch-1.10-ubuntu18.04-py38-cuda11-gpu'
    # )
    env = Environment.from_conda_specification(
        name='pytorch-env',
        file_path='./pytorch-env.yml'
    )
    inference_config = InferenceConfig(
        environment=env,
        entry_script='score.py',
    )
    deployment_config = AciWebservice.deploy_configuration(
        cpu_cores=1,
        memory_gb=2,
        tags={'data': 'Asirra', 'method': 'PyTorch'},
        description='Predict dogs vs cats with PyTorch model',
    )

    # Register trained model from external training script
    # NOTE (training script): https://github.com/kimkilho/asirra-dogs-vs-cats-classification-pytorch
    model = Model(workspace=ws, name='asirra-resnet50', version=1)

    # Deploy the model
    service = Model.deploy(
        workspace=ws,
        name='asirra-inference-service',
        models=[model],
        inference_config=inference_config,
        deployment_config=deployment_config,
        overwrite=True,
    )
    service.wait_for_deployment(show_output=True)
    print(service.get_logs())
