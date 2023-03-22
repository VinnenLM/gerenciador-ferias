from fastapi import FastAPI
from pydantic import BaseModel

class Objeto(BaseModel):
    nome: str
    sobrenome: str | None = None
    email: str

app = FastAPI()

@app.get("/")
def teste_get():
    return {"message": "Teste"}

@app.post("/")
async def teste_post(obj: Objeto):
    return obj

#uvicorn main:app --reload -> rodar o server