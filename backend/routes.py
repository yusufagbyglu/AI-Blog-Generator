from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import json

from database import get_db
import models
import schemas
from ai_services import GroqService, TavilyService

router = APIRouter()
groq_service = GroqService()
tavily_service = TavilyService()

@router.post("/articles/", response_model=schemas.Article)
async def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db)):
    db_article = models.Article(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@router.get("/articles/", response_model=List[schemas.Article])
def get_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    articles = db.query(models.Article).offset(skip).limit(limit).all()
    return articles

@router.get("/articles/{article_id}", response_model=schemas.Article)
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.put("/articles/{article_id}", response_model=schemas.Article)
def update_article(article_id: int, article_update: schemas.ArticleUpdate, db: Session = Depends(get_db)):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Update attributes
    db_article.content = article_update.content
    
    db.commit()
    db.refresh(db_article)
    return db_article

@router.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db)):
    db_article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    db.delete(db_article)
    db.commit()
    return {"detail": "Article deleted successfully"}


@router.post("/generate/stream")
async def generate_article_stream(request: schemas.GenerationRequest):
    """Generate article content with streaming response"""
    try:
        print("\n=== START OF ROUTE HANDLER ===")
        print(f"Request type: {type(request)}")
        print(f"Request body: {request}")
        print(f"Request dict: {request.dict() if hasattr(request, 'dict') else 'No dict method'}")
        print(f"Request include_references: {getattr(request, 'include_references', 'Not found')}")
        print(f"Request topic: {getattr(request, 'topic', 'Not found')}")
        print(f"Request length: {getattr(request, 'length', 'Not found')}")
        print(f"Request style: {getattr(request, 'style', 'Not found')}")
        print(f"Request keywords: {getattr(request, 'keywords', 'Not found')}")
        print("\n=== END OF ROUTE HANDLER ===")
        
        # First, perform research if required
        research_results = []
        if getattr(request, 'include_references', False):
            try:
                print("\nStarting research...")
                research_results = await tavily_service.research_topic(
                    topic=getattr(request, 'topic', ''), 
                    keywords=getattr(request, 'keywords', '')
                )
                print(f"Got research results: {research_results}")
            except Exception as e:
                print(f"Research error: {str(e)}")
                # Continue even if research fails
        
        try:
            print("\nStarting article generation...")
            # Generate complete article content
            content = await groq_service.generate_article(
                topic=getattr(request, 'topic', ''),
                length=getattr(request, 'length', 0),
                style=getattr(request, 'style', ''),
                keywords=getattr(request, 'keywords', ''),
                research_results=research_results
            )
            print(f"\nGenerated content successfully!")
            print(f"Content length: {len(content)} characters")
            print(f"First 100 chars: {content[:100]}")
            
            return {"content": content}
        except Exception as e:
            print(f"\nError in generate_article: {str(e)}")
            print(f"Full error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        print(f"\n=== CRITICAL ERROR IN ROUTE HANDLER ===")
        print(f"Error type: {type(e)}")
        print(f"Error message: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save-article")
async def save_generated_article(
    article_data: schemas.ArticleCreate,
    content: str,
    db: Session = Depends(get_db)
):
    """Save a generated article to the database"""
    try:
        # Create article record
        db_article = models.Article(
            title=article_data.title,
            content=content,
            topic=article_data.topic,
            style=article_data.style,
            keywords=article_data.keywords,
            length=article_data.length
        )
        
        db.add(db_article)
        db.commit()
        db.refresh(db_article)
        
        return {"id": db_article.id, "status": "success"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save article: {str(e)}")