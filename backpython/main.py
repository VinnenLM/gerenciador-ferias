from fastapi import FastAPI
from pydantic import BaseModel
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from fastapi.middleware.cors import CORSMiddleware


class ObjetoNotificacao(BaseModel):
    id: str | None = None
    idSolicitacao: str
    colaborador: str
    email: str | None = None

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/enviarNotificacao")
async def enviar_notificacao(obj: ObjetoNotificacao):
    url = "https://graph.facebook.com/v4.0/me/messages"

    token='DQVJzbi1raTJheGV6Ump4NE5RYUVUTTZAwNGx5dmdJOE00VTRDUHR6RjVxdTdYOHYtaTcxQW9pVHBhOVhiTW9BQkdrU3A3dUdpOU1EQ0ZAfeU1HaHloSGZAuVGFNQkctSlhMVjJHUHZAMcU82OG90dG5heE9uLW9YSTlOdExBWU8zVnNybm5vMU5kMEFoalBDRUZAvNlkyVG5PSlhqWTEtaWZAyazJ3di0yTTJ1aEdmTG5JMTRTd0tUWFlpb3ctSWFDNndpUWh3OXdn'

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
        }

    data = {
        "messaging_type": "UPDATE",
        "recipient": {
        "id": f"{obj.id}"
        },
        "message": {
        "text": f"Efetuada solicitação de férias pelo colaborador {obj.colaborador}. Possível ser acessado pelo " + f'<a href="www.localhost:3001/solicitacao/{obj.idSolicitacao}">link</a>.'
        }
        }
    
    r = requests.post(url, json=data, headers=headers)
    print("Status Code", r.status_code)
    print("JSON Response ", r.json())

    return r.status_code

@app.post("/enviarEmail")
async def enviar_email(obj: ObjetoNotificacao):

    try:
        print(obj)

        host = '10.0.0.241'
        port = 25
        email_de = 'qqtech-alunos@quero-quero.com.br'
        email_para = [f'{obj.email}']

        email_body = f"Efetuada solicitação de férias pelo colaborador {obj.colaborador}. Possível ser acessado pelo <a href='localhost:3001/solicitacao/'>link</a>."

        msg = MIMEText(email_body, 'html')

        msg['Subject'] = "Solicitação QQFérias"
        msg['From'] = email_de
        msg['To'] = ','.join(email_para)

        s = smtplib.SMTP(host, port)
        s.ehlo()
        s.sendmail(email_de, email_para, msg.as_string())
        s.quit()

        return { "message": "E-mail enviado com sucesso!" }
    
    except:
        return { "message": "Erro no envio do e-mail!" }
    

#uvicorn main:app --reload -> rodar o server