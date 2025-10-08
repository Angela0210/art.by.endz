from fastapi import FastAPI
from contextlib import asynccontextmanager

from starlette.middleware.cors import CORSMiddleware

from app.database.database import get_db
from app.database.seeder import reset_database, seed_data
from app.web import cart_router, book_router, author_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    reset_database()  # Drops + creates all tables
    db = next(get_db())
    seed_data(db)      # Fills DB with test data
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(book_router.router)

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#TODO 21: Register the routers
app.include_router(book_router.router)
app.include_router(cart_router.router)
app.include_router(author_router.router)