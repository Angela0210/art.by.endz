from sqlalchemy.orm import Session

from app.model.models import Cart, CartItem, Book
from app.model.schemas import CartItemCreate


def get_cart_by_user(db: Session, user_id: int):
    return db.query(Cart).filter(Cart.user_id == user_id).first()


def create_cart(db: Session, user_id: int):
    new_cart = Cart(user_id=user_id)
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)
    return new_cart


def add_item_to_cart(db: Session, cart_id: int, item_data: CartItemCreate):
    # TODO 11: Create a new CartItem and add it to the given cart
    new_item = CartItem(
        cart_id=cart_id,
        book_id=item_data.book_id,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


def remove_item_from_cart(db: Session, cart_id: int, item_id: int):
    # TODO 12: Find the CartItem by cart_id and item_id, then delete it if it exists
    item = db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item


def clear_cart(db: Session, cart_id: int):
    # TODO 13: Remove all items from the cart with the given ID
    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    db.commit()


def buy_items(db: Session, cart_id: int):
    # TODO 13: Reduce quantity of each book in the cart if enough stock is available
    cart_items = get_cart_items(db, cart_id)

    for item in cart_items:
        book = db.query(Book).filter(Book.id == item.book_id).first()
        if book and book.quantity >= 1:
            book.quantity -= 1

    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    # db.query(Cart).filter(CartItem.cart_id == cart_id).delete()
    db.commit()


def get_cart_items(db: Session, cart_id: int):
    return db.query(CartItem).filter(CartItem.cart_id == cart_id).all()
