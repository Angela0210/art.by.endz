from sqlalchemy.orm import Session

from app.model.schemas import BookCreate, BookUpdate
from app.repository import book_repository


def list_all(db: Session):
    return book_repository.list_all(db)


def find_by_id(db: Session, book_id: int):
    return book_repository.find_by_id(db, book_id)


def save(db: Session, book_create: BookCreate):
    return book_repository.save(db, book_create)


def update(db: Session, book_update: BookUpdate, book_id: int):
    return book_repository.update(db, book_update, book_id)


def delete(db: Session, book_id: int):
    return book_repository.delete_by_id(db, book_id)
