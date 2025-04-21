from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import datetime

class ReferenceBase(BaseModel):
    title: str
    url: str
    description: Optional[str] = None

class ReferenceCreate(ReferenceBase):
    pass

class Reference(ReferenceBase):
    id: int
    article_id: int
    
    class Config:
        orm_mode = True

class ArticleBase(BaseModel):
    title: Optional[str] = None
    topic: str
    style: str
    keywords: Optional[str] = None
    length: int

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(BaseModel):
    content: str

class Article(ArticleBase):
    id: int
    content: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    references: List[Reference] = []
    
    class Config:
        orm_mode = True

class GenerationRequest(BaseModel):
    topic: str
    length: int
    style: str  # academic, friendly, entertaining, serious
    keywords: Optional[str] = None
    include_references: bool = False