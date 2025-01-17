from django.db.models import Avg, Max, Min, Sum, Count
from ..submodels.project import *
from ..submodels.user import User
from backend.actions.general import create_dirs_along_path
from backend.actions.amb import get_project_known_model
from django.conf import settings
import matplotlib.image as mpimg
from PIL import Image as pil
import matplotlib.pyplot as plt
from django.core.files.images import get_image_dimensions
import re

def get_project(project_id):
    return Project.objects.get(pk=project_id)

def get_project_model_file(project):
    if project.user_upload():
        return settings.MEDIA_ROOT + "/projects/" + str(project.id) + "/model.py"
    id = get_project_known_model(project).id
    return settings.MEDIA_ROOT + "/known/" + str(id) + ".txt"

def check_class_validation(project):
    if not project.user_upload():
        return True
    model_file = get_project_model_file(project)
    file = open(model_file, 'r')
    for line in file:
        found = re.search(".*class Model.*", line)
        if found:
            return True
    return False

def save_deploy_image(project_id, image):
    path = settings.MEDIA_ROOT + "/projects/" + str(project_id) + "/deploy/"
    create_dirs_along_path(path)
    item_path = path + image.name
    img = pil.open(image.file)
    img.save(item_path, "PNG")
    return item_path

# returns project object by its identifaction number
def project_by_id(project_id):
    return Project.objects.filter(id=project_id)[0]

def update_project(project_data):
    project = Project.objects.filter(id=project_data['id'])[0]
    project.project_name = project_data['name']
    project.description = project_data['description']
    project.result = project_data['result']
    project.train_percentage = project_data['train_percentage']
    project.dev_percentage = project_data['dev_percentage']
    project.test_percentage = project_data['test_percentage']
    project.width =  project_data['width']
    project.height =  project_data['height']
    project.model_type =  project_data['type']
    dataset_id = project_data['dataset']
    print (dataset_id)
    if dataset_id == None or dataset_id == "null" or int(dataset_id) < 1:
        project.dataset = None
    else:
        project.dataset = Dataset.objects.filter(id=project_data['dataset'])[0]
    project.save()

def project_files_quantity(project_id):
    return ProjectFiles.objects.filter(project=project_id).count()

def get_file_content(file_id):
    file_object = ProjectFiles.objects.filter(id=file_id)[0].file
    file_object.open(mode='rb') 
    content = b"".join(line for line in file_object)  
    return content

def update_file_content(file_id, content):
    file_object = ProjectFiles.objects.filter(id=file_id)[0].file
    file_object.open(mode='w')
    file_object.write(content)
    file_object.close()

def upload_file(files_quantity, files, project_id, username):
    files_list = []
    for i in range(files_quantity):
        files_list.append(files[str(i)])
    project = Project.objects.filter(id=project_id)[0]
    user = User.objects.filter(username=username)[0]
    for file_model in files_list:
        ProjectFiles.objects.create(project=project ,file=file_model, insert_by=user, name=file_model.name, type=file_model.content_type)

def get_total_size(files):
    size = 0
    for record in files:
        file = record.file
        size = size + file.size
    return size

def most_query(files, category):
    grouped_results = files.values(category).annotate(favorite=Count(category)).order_by('-favorite').first()
    return {
        category: grouped_results[category],
        'count': grouped_results['favorite'],
    }
