from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.nlp import translate_and_score

router = APIRouter()

class TranslateReq(BaseModel):
    text: str
    
class TranslateRes(BaseModel):
    source:str
    translated: str
    sentiment: dict
    
@router.post("/translate", response_model=TranslateRes)
async def translate_endpoint(req: TranslateReq):
    try:
        data=translate_and_score(req.text)
        return TranslateRes(**data)
    except Exception as e:
       raise HTTPException(status_code=500, detail=str(e)) 