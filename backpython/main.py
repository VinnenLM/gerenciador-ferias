from fastapi import FastAPI, Request
from pydantic import BaseModel
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json as js

class ObjetoNotificacao(BaseModel):
    idWorkplace: str | None = None
    idSolicitacao: str
    resposta: bool
    email: str | None = None
    analise: str | None = None
    nomeColaborador: str | None = None

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
    try:

        url = "https://graph.facebook.com/v4.0/me/messages"

        token='DQVJzbi1raTJheGV6Ump4NE5RYUVUTTZAwNGx5dmdJOE00VTRDUHR6RjVxdTdYOHYtaTcxQW9pVHBhOVhiTW9BQkdrU3A3dUdpOU1EQ0ZAfeU1HaHloSGZAuVGFNQkctSlhMVjJHUHZAMcU82OG90dG5heE9uLW9YSTlOdExBWU8zVnNybm5vMU5kMEFoalBDRUZAvNlkyVG5PSlhqWTEtaWZAyazJ3di0yTTJ1aEdmTG5JMTRTd0tUWFlpb3ctSWFDNndpUWh3OXdn'

        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
            }

        if obj.resposta == False:
            text = f"Efetuada solicitação (Id {obj.idSolicitacao}) de férias pelo colaborador {obj.nomeColaborador}. Possível ser acessado pelo link localhost:3001/solicitacao/{obj.idSolicitacao}."
        else:
            text = f"O pedido de sua solicitação (id {obj.idSolicitacao}) foi {obj.analise}. Possível ser acessado pelo link localhost:3001/solicitacao/{obj.idSolicitacao}."

        data = {
            "messaging_type": "UPDATE",
            "recipient": {
            "id": f"{obj.idWorkplace}"
            },
            "message": {
            "text": text
            }
            }
        
        r = requests.post(url, json=data, headers=headers)

        return r.status_code
    
    except:

        return { "message": "Erro no envio do e-mail!" }

@app.post("/enviarEmail")
async def enviar_email(obj: ObjetoNotificacao):

    try:
      
        host = '10.0.0.241'
        port = 25
        email_de = 'qqtech-alunos@quero-quero.com.br'

        if obj.resposta == False:
            email_body = f"Efetuada solicitação (Id {obj.idSolicitacao}) de férias pelo colaborador {obj.nomeColaborador}. Possível ser acessado pelo link localhost:3001/solicitacao/{obj.idSolicitacao}."
        else:
            email_body = f"O pedido de sua solicitação (id {obj.idSolicitacao}) foi {obj.analise}. Possível ser acessado pelo link localhost:3001/solicitacao/{obj.idSolicitacao}."

        msg = MIMEText(email_body, 'html')
        msg['Subject'] = "Solicitação QQFérias"
        msg['From'] = email_de
        msg['To'] = obj.email

        s = smtplib.SMTP(host, port)
        s.ehlo()
        s.sendmail(email_de, obj.email, msg.as_string())
        s.quit()

        return { "message": "E-mail enviado com sucesso!" }
    
    except:

        return { "message": "Erro no envio do e-mail!" }
    
@app.post("/enviarRelatorio")
async def enviar_relatorio(obj: Request):

    try:

        json = await obj.json()

        print(json)

        msg = MIMEMultipart()
        host = '10.0.0.241'
        port = 25
        email_de = 'qqtech-alunos@quero-quero.com.br'

        email_body = f"Solicitação do relatório efetuada, favor checar arquivo em anexo."

        msg.attach(MIMEText(email_body, 'html'))

        if 'colaboradores' in json:
            dataFrame = pd.DataFrame.from_dict(json['data'])
            listaColaboradores = dataFrame['colaboradores'].tolist()
            df = pd.json_normalize(listaColaboradores)
        else:
            df = pd.DataFrame.from_dict(json['data'], orient='index').T
        
        df.to_csv('relatorio.csv', index=False)

        with open('relatorio.csv', 'rb') as f:
            anexo = MIMEApplication(f.read(), _subtype='csv')
            anexo.add_header('content-disposition', 'attachment', filename='relatorio.csv')
            msg.attach(anexo)

        msg['Subject'] = "Solicitação Relatório QQFérias"
        msg['From'] = email_de
        msg['To'] = json['email']

        s = smtplib.SMTP(host, port)
        s.ehlo()
        s.sendmail(email_de, json['email'], msg.as_string())
        s.quit()

        return { "message": "O relatório solicitado foi enviado ao seu email!" }
    
    except:

        return { "message": "Erro no envio do e-mail!" }

#uvicorn main:app --reload -> rodar o server