from sqlalchemy.orm import Session

from app.repository import author_repository


def list_all(db: Session):
    return author_repository.list_all(db)


def find_by_id(db: Session, manufacturer_id: int):
    return author_repository.find_by_id(db, manufacturer_id)

