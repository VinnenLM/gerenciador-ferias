from fastapi import FastAPI
from pydantic import BaseModel
import requests

class Objeto(BaseModel):
    nome: str
    sobrenome: str | None = None
    email: str

class IdNotificacao(BaseModel):
    id: str

app = FastAPI()

@app.get("/")
def teste_get():
    return {"message": "Teste"}

@app.post("/")
async def teste_post(obj: Objeto):
    return obj

@app.post("/enviarNotificacao")
async def teste_post(id: IdNotificacao):
    url = "https://graph.facebook.com/v4.0/me/messages"

    token='DQVJzbi1raTJheGV6Ump4NE5RYUVUTTZAwNGx5dmdJOE00VTRDUHR6RjVxdTdYOHYtaTcxQW9pVHBhOVhiTW9BQkdrU3A3dUdpOU1EQ0ZAfeU1HaHloSGZAuVGFNQkctSlhMVjJHUHZAMcU82OG90dG5heE9uLW9YSTlOdExBWU8zVnNybm5vMU5kMEFoalBDRUZAvNlkyVG5PSlhqWTEtaWZAyazJ3di0yTTJ1aEdmTG5JMTRTd0tUWFlpb3ctSWFDNndpUWh3OXdn'

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
        }
    
    data = {
        "messaging_type": "UPDATE",
        "recipient": {
        "id": f"{id.id}"
        },
        "message": {
        "text": "Teste API Python"
        }
        }
    
    print(data)

    r = requests.post(url, json=data, headers=headers)
    print("Status Code", r.status_code)
    print("JSON Response ", r.json())

    #return obj

#uvicorn main:app --reload -> rodar o server