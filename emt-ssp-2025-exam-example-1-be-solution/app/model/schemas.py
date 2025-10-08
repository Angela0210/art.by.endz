from typing import Optional, List

from pydantic import BaseModel

#TODO 7:  These should be schemas used for data validation and serialization
class AuthorSchema(BaseModel):
    id: int
    name: str
    biography: Optional[str] = None

    class Config:
        from_attributes = True


class BookSchema(BaseModel):
    id: int
    title: str
    price: float
    quantity: int
    category: str
    author: AuthorSchema

    class Config:
        from_attributes = True


class BookCreate(BaseModel):
    title: str
    price: float
    quantity: int
    category: str
    author_id: int


class BookUpdate(BaseModel):
    title: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    category: Optional[str] = None
    author_id: Optional[int] = None


class UserSchema(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class CartItemSchema(BaseModel):
    id: int
    book: BookSchema

    class Config:
        from_attributes = True


class CartItemCreate(BaseModel):
    book_id: int


class CartItemCreateResponseModel(BaseModel):
    book: BookSchema


class CartSchema(BaseModel):
    id: int
    user: UserSchema
    items: List[CartItemSchema] = []

    class Config:
        from_attributes = True


class CartCreate(BaseModel):
    user_id: int


class CartItemsForUser(BaseModel):
    items: List[CartItemSchema] = []
