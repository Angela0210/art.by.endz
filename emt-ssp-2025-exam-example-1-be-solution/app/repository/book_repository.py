from sqlalchemy.orm import Session

from app.model.models import Book
from app.model.schemas import BookCreate, BookUpdate


def list_all(db: Session):
    return db.query(Book).all()


def find_by_id(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()


def save(db: Session, book_create: BookCreate):
    # TODO 8: Create a new Book instance and save it to the database
    new_book = Book(
        title=book_create.title,
        price=book_create.price,
        quantity=book_create.quantity,
        category=book_create.category,
        author_id=book_create.author_id
    )
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


def update(db: Session, book_update: BookUpdate, book_id: int):
    # TODO 9: Find the book, and if it exists, update only the fields provided in book_update
    book = find_by_id(db, book_id)

    if not book:
        return

    for key, value in book_update.model_dump(exclude_unset=True).items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)

    return book


def delete_by_id(db: Session, book_id: int):
    # TODO 10: Find the book and remove it from the database
    book = find_by_id(db, book_id)

    if book:
        db.delete(book)
        db.commit()

    return book
