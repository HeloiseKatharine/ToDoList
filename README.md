# To-Do List Project
## Descrição
Este projeto é uma aplicação de lista de tarefas (To-Do List) construída com Django no backend e React no frontend.

## Configuração do Projeto
### 1. Clonar o Repositório
Primeiro, clone o repositório do projeto para sua máquina local:

```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configuração do Backend (Django)

## 2.1. Instalar Dependências 
Instale as dependências do backend listadas no arquivo requirements.txt:

```
pip install -r requirements.txt
```
### 2.2. Configurar o Banco de Dados
Abra o arquivo settings.py localizado em todo_project/todo_project/settings.py e edite a seção DATABASES para incluir suas informações de banco de dados:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'database_nome',
        'USER': 'database_user',
        'PASSWORD': 'database_password',
        'HOST': 'database_host',
        'PORT': 'database_port',
    }
}
```
### 2.3. Migrar o Banco de Dados
Navegue até o diretório todo_project e execute os seguintes comandos para criar as migrações e aplicar as migrações ao banco de dados:

```
cd todo_project
python manage.py makemigrations
python manage.py migrate
```
### 2.4. Rodar o Servidor de Desenvolvimento
Ainda dentro do diretório todo_project, execute o servidor de desenvolvimento do Django:

```
python manage.py runserver
```
## 3. Configuração do Frontend (React)
### 3.1. Instalar Dependências
Navegue até o diretório todo_frontend e instale as dependências do projeto React:

```
cd ../todo_frontend
npm install
```
### 3.2. Rodar o Servidor de Desenvolvimento
Ainda dentro do diretório todo_frontend, execute o servidor de desenvolvimento do React:
```
npm start
```
## Conclusão
Agora você deve ter tanto o backend quanto o frontend rodando em sua máquina local. Você pode acessar a aplicação de lista de tarefas no seu navegador e começar a utilizá-la.

Se encontrar qualquer problema ou tiver alguma dúvida, por favor, abra uma issue no repositório ou entre em contato.