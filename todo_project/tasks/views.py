from django.http import HttpResponse, JsonResponse
import json
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Task

def index(request):
    return HttpResponse("")

def user(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            body_user_name = body['username']
            body_email = body['email']
        
            if body_user_name:
                try:
                    user_name = User.objects.get(username=body_user_name)
                    if(user_name):
                        return HttpResponse(f"Erro: Usuário já existe.")
                except User.DoesNotExist:
                    try:
                        email = User.objects.get(email=body_email)
                        if(email):
                          
                            return HttpResponse(f"Erro: E-mail já existe. {email} {body['email']}")
                    except User.DoesNotExist:
                        pass
                        
            user = User.objects.create_user(body['username'], body['email'], body['password'])
            return HttpResponse(f"POST request feito. {user}")
        except IntegrityError:
            return HttpResponse(f"POST request feito.")
        except Exception as e:
            return HttpResponse(f"Erro: {e}")
  
def getUserByEmailOrUsername(request, username):
    try:
        user = User.objects.get(username=username)
        return HttpResponse(f"Usuário encontrado:{user}")
    except User.DoesNotExist:
        user = User.objects.get(email=username)
        return HttpResponse(f"Usuário encontrado: {user}")
    except User.DoesNotExist:
        return HttpResponse(f"Usuário não encontrado")    
    except Exception as e:
        return HttpResponse(f"Erro: {e}")
    
def getAllUsers(request):
    if request.method == 'GET':
        try:
            # Busca todos os usuários
            users = User.objects.all()
            # Cria uma lista de dicionários contendo os detalhes dos usuários
            users_list = [{"username": user.username, "email": user.email} for user in users]
            return JsonResponse({"Usuários:": users_list})
        except Exception as e:
            return HttpResponse(f"Erro: {e}", status=500)
    else:
        return HttpResponse("Método de solicitação inválido", status=400)
    
def tasks(request):
    token = JWTAuthentication().authenticate(request)
    if token == None:
        return HttpResponse("Não autorizado", status=401)
    if request.method == "POST":
        try:
            print('user', token[1]['user_id'])
            body = json.loads(request.body)
            user = User.objects.get(id=token[1]['user_id'])
            print('user', user)
            tak = Task(name=body['name'], description=body['description'], user=user)
            tak.create_task()
            responseBody = {
                "id": tak.id,
                "name": tak.name,
                "description": tak.description,
                "createdAt": str(tak.createdAt.date()),
                "isDone": tak.isDone,
                "user": tak.user.email
            }
            resp = json.dumps(responseBody)
            return HttpResponse(resp, status=201)
        except Exception as e:
            return HttpResponse(f"Erro: {e}", status=400)
    if request.method == "GET":
        tak = Task.objects.filter(user=token[1]['user_id'])
        responseBody = {
            "tasks": [
            ]
        }
        for t in tak:
            responseBody['tasks'].append({
                "id": t.id,
                "name": t.name,
                "description": t.description,
                "createdAt": str(t.createdAt.date()),
                "isDone": t.isDone,
                "user": t.user.email
            })
        resp = json.dumps(responseBody)
        return HttpResponse(resp)

    if request.method == "PUT":
        try:
            body = json.loads(request.body)
            user = User.objects.get(id=token[1]['user_id'])
            
            task = Task.objects.get(id=body['id'])
            updated_task = Task(id=body['id'], name=body['name'], description=body['description'], user=user, isDone=body['is_done'], createdAt=task.createdAt)
            updated_task.save()
            return HttpResponse(f"Task atualizada: {task}")
        except Exception as e:
            return HttpResponse(f"Erro: {e}")
def delete_task(request, task_id):
    token = JWTAuthentication().authenticate(request)
    if token == None:
        return HttpResponse("Não autorizado", status=401)    
    if request.method == "DELETE":
        try:
            task = Task.objects.get(id=task_id)
            task = task.delete_task()
            return HttpResponse(f"Task deletada")
        except Exception as e:
            return HttpResponse(f"Erro: {e}")


    
    