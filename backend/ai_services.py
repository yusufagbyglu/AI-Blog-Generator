import os
import json
import httpx
import asyncio
from typing import Dict, Any, List, AsyncGenerator
import datetime
from dotenv import load_dotenv

load_dotenv()

class GroqService:

    def __init__(self):
        """Initialize Groq service with API configuration"""
        print("\n=== GROQ SERVICE INIT ===")
        print(f"API key: {bool(os.getenv('GROQ_API_KEY'))}")
        
        # Set base URL first
        self.base_url = "https://api.groq.com/openai/v1/chat/completions"  # Removed the extra brackets
        print(f"Base URL: {self.base_url}")
        
        self.api_key = os.getenv("GROQ_API_KEY")
        if not self.api_key:
            raise ValueError("GROQ_API_KEY environment variable is not set")
            
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        print("\n=== GROQ SERVICE INIT COMPLETE ===")

    async def generate_article(self, 
                             topic: str, 
                             length: int, 
                             style: str, 
                             keywords: str = None,
                             research_results: List[Dict[str, Any]] = None) -> str:
        """Generate article content"""
        print(f"\n=== STARTING GROQ GENERATION ===")
        print(f"Topic: {topic}")
        print(f"Length: {length}")
        print(f"Style: {style}")
        print(f"Keywords: {keywords}")
        print(f"Research results: {research_results}")
        
        # Get current date for context
        current_date = datetime.datetime.now().strftime("%B %d, %Y")
        print(f"Current date: {current_date}")
        
        # Prepare the prompt based on style
        style_instructions = {
            "academic": "Write in a formal, objective tone with thorough analysis and precise language. Include scholarly references where appropriate.",
            "friendly": "Write in a warm, conversational tone that feels like a friend explaining the topic in an approachable way.",
            "entertaining": "Write with humor, engaging stories or examples, and a lively tone that keeps the reader interested.",
            "serious": "Write with a professional, authoritative tone focusing on facts and insights without casual language."
        }
        
        style_prompt = style_instructions.get(style.lower(), style_instructions["friendly"])
        print(f"Style prompt: {style_prompt}")
        
        # Format keywords instructions if provided
        keywords_prompt = ""
        if keywords:
            keywords_list = [k.strip() for k in keywords.split(",")]
            keywords_prompt = f"The article must incorporate the following keywords for SEO purposes: {', '.join(keywords_list)}. Make sure these are integrated naturally into the content."
            print(f"Keywords prompt: {keywords_prompt}")
        
        # Format research instructions if provided
        research_prompt = ""
        if research_results:
            research_prompt = "Use the following research information to enrich your article:\n\n"
            for result in research_results:
                research_prompt += f"- {result.get('title')}: {result.get('snippet')}\n"
            research_prompt += "\nIncorporate this information naturally and cite sources where appropriate."
            print(f"Research prompt: {research_prompt}")
            
        # Approximate word count based on requested length
        word_count = length * 150  # Assuming 150 words per "unit" of length
        print(f"Approximate word count: {word_count}")
            
        system_prompt = f"""
        You are a professional blog writer creating an article on the topic: "{topic}".
        Today's date is {current_date}, so ensure content is contextually relevant.
        
        {style_prompt}
        
        {keywords_prompt}
        
        {research_prompt}
        
        The article should be approximately {word_count} words in length.
        
        Structure the article with:
        1. An engaging title
        2. Introduction
        3. Multiple subtopics with appropriate headings
        4. Conclusion
        
        Format the content using markdown for headings and other structural elements.
        """
        print(f"\n=== SYSTEM PROMPT ===")
        print(system_prompt)
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Write a blog article about '{topic}'"}
        ]
        print(f"\n=== MESSAGES ===")
        print(messages)
        
        payload = {
            "model": "llama3-70b-8192",  # Using Llama 3 model via Groq
            "messages": messages,
            "temperature": 0.7,
            "stream": False
        }
        print(f"\n=== PAYLOAD ===")
        print(payload)
        
        print("\nSending request to Groq API...")
        async with httpx.AsyncClient() as client:
            response = await client.post(self.base_url, json=payload, headers=self.headers)
            print(f"Groq API response status: {response.status_code}")
            
            if response.status_code != 200:
                error_detail = await response.text()
                print(f"Groq API error response: {error_detail}")
                raise Exception(f"Error from Groq API: {error_detail}")
            
            result = response.json()
            print(f"\n=== GROQ API RESPONSE ===")
            print(result)
            
            content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
            print(f"\nGenerated content length: {len(content)}")
            return content




class TavilyService:
    def __init__(self):
        self.api_key = os.getenv("TAVILY_API_KEY")
        self.base_url = "https://api.tavily.com/v1/search"
        self.headers = {
            "Content-Type": "application/json"
        }

    async def research_topic(self, topic: str, keywords: str = None) -> List[Dict[str, Any]]:
        """Research a topic using Tavily API"""
        query = topic
        if keywords:
            query += f" {keywords}"
            
        payload = {
            "api_key": self.api_key,
            "query": query,
            "search_depth": "advanced",
            "include_answer": True,
            "include_domains": ["wikipedia.org", "britannica.com", "scholar.google.com", "news.google.com"],
            "max_results": 5
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(self.base_url, json=payload)
            
            if response.status_code != 200:
                error_text = await response.text()  # Get the error text
                raise Exception(f"Error from Tavily API: {error_text}")
                
            result = response.json()
            return result.get("results", [])    