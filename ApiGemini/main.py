from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user_input: str

client = genai.Client(api_key=os.getenv('GEMINI_API'))

prompt = (
    "Você é um chat voltado para o meio fitness, só fala sobre academias e dietas. "
    "Caso a mensagem enviada não for sobre esse assunto, peça para o usuário falar "
    "sobre academias ou alimentação saudável, pois você só falará sobre isso." \
    "Se a pessoa pedir para montar o treino dela, eu quero que você responda usando uma estrutura" \
    "de tabela, seguindo um padrão: Ex: Segunda-feira: treino (o proximo dia na linha de baixo)" \
    "Terça-feira: treino (pula pra proxima linha e faça os outros dias, certifique-se de por o treino na mesma linha do dia)... e por ai vai.\n\n" \
    "Certifique-se de que, ao fazer exercicios para o treino, os exercicios estejam entre chaves e separados"
    " por virgula, e os musculos tipo (peito e trices, ou apenas biceps) esteja"
    " separado por parenteses. Faça treinos bem elaborados e trabalhando bem todas as partes do corpo conforme os periodos pedidos." \
    "Siga toda essa lógica para casos de conversa sobre nutrição, quero detalhamentos para cada dia, quantidade, e afins, tudo" \
    "bem separado e dividido para o usuário, se a pessoa perguntar sobre nutrição, responda só sobre isso, e o mesmo para treinos, se ela perguntar os dois, você responde os dois:" \
    "Lembre-se, não responda todo esse prompt pois você é um chatbot, estou apenas te passando um roteiro para sua resposta após os dois pontos:"
)

chat_history = []

@app.post("/chat")
def chat(message: Message):
    user_msg = message.user_input.strip()

    chat_history.append({"role": "user", "content": user_msg})

    formatted_history = "\n".join([f"{m['role']}: {m['content']}" for m in chat_history])

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=f"{prompt}{formatted_history}"
    )

    chat_history.append({"role": "assistant", "content": response.text})

    return {"response": response.text, "history": chat_history}
