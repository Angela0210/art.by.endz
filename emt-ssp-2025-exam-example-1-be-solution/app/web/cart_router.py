
'''from typing import List

from fastapi import APIRouter, Depends,HTTPException, status
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app.database.database import get_db
from app.model.schemas import CartItemCreate, CartSchema, CartItemCreateResponseModel, CartItemSchema
from app.service import cart_service

router = APIRouter(prefix="/api/cart", tags=["Cart"])


@router.get("/{user_id}", response_model=CartSchema)
async def get_cart(user_id: int, db: Session = Depends(get_db)):
    cart = cart_service.get_cart_by_user(db, user_id)
    if cart:
        return cart
    return JSONResponse(status_code=404, content={"message": f"Cart for user {user_id} not found"})


@router.post("/{user_id}", response_model=CartSchema)
async def create_cart(user_id: int, db: Session = Depends(get_db)):
    return cart_service.create_cart(db, user_id)


# TODO 17: Annotate the methods with the correct mappings
@router.post("/{cart_id}/add-item", response_model=CartItemCreateResponseModel)
async def add_item(cart_id: int, item_data: CartItemCreate, db: Session = Depends(get_db)):
    return cart_service.add_item_to_cart(db, cart_id, item_data)


# TODO 18 Annotate the methods with the correct mappings
@router.delete("/{cart_id}/items/{item_id}")
async def remove_item(cart_id: int, item_id: int, db: Session = Depends(get_db)):
    item = cart_service.remove_item_from_cart(db, cart_id, item_id)
    if item:
        return JSONResponse(status_code=200, content={"message": f"Item {item_id} removed from cart {cart_id}"})
    return JSONResponse(status_code=404, content={"message": f"Item {item_id} not found in cart {cart_id}"})


# TODO 19: Annotate the methods with the correct mappings
@router.delete("/{cart_id}/clear")
async def clear_cart(cart_id: int, db: Session = Depends(get_db)):
    cart_service.clear_cart(db, cart_id)
    return JSONResponse(status_code=200, content={"message": f"Cart {cart_id} cleared successfully"})


# TODO 20: Annotate the methods with the correct mappings
@router.post("/{cart_id}/buy_items")
async def buy_items(cart_id: int, db: Session = Depends(get_db)):
    cart_service.buy_items(db, cart_id)
    return JSONResponse(status_code=200, content={"message": f"Items from Cart: {cart_id} bought successfully"})


@router.get("/{cart_id}/items", response_model=List[CartItemSchema])
async def get_cart_items(cart_id: int, db: Session = Depends(get_db)):
    cart_items = cart_service.get_cart_items(db, cart_id)
    return cart_items
'''
#novo
# backend/web/cart_router.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException
from starlette.responses import JSONResponse
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.model.schemas import CartItemCreate, CartSchema, CartItemCreateResponseModel, CartItemSchema
from app.service import cart_service
from ..middleware.auth import verify_token

router = APIRouter(prefix="/api/cart", tags=["Cart"])

# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Get the authenticated user's cart
# ----------------------------------------------------------------------
@router.get("/", response_model=CartSchema)
async def get_cart(
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    cart = cart_service.get_cart_by_user(db, user_id)
    if cart:
        return cart
    raise HTTPException(status_code=404, detail=f"Cart for user {user_id} not found")


# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Create a cart for the authenticated user
# ----------------------------------------------------------------------
@router.post("/", response_model=CartSchema)
async def create_cart(
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    return cart_service.create_cart(db, user_id)


# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Add an item to the authenticated user's cart
# ----------------------------------------------------------------------
@router.post("/{cart_id}/add-item", response_model=CartItemCreateResponseModel)
async def add_item(
    cart_id: int,
    item_data: CartItemCreate,
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    cart = cart_service.get_cart_by_user(db, user_id)
    if not cart or cart.id != cart_id:
        raise HTTPException(status_code=403, detail="Not allowed to modify this cart")
    return cart_service.add_item_to_cart(db, cart_id, item_data)


# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Remove an item from the authenticated user's cart
# ----------------------------------------------------------------------
@router.delete("/{cart_id}/items/{item_id}")
async def remove_item(
    cart_id: int,
    item_id: int,
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    cart = cart_service.get_cart_by_user(db, user_id)
    if not cart or cart.id != cart_id:
        raise HTTPException(status_code=403, detail="Not allowed to modify this cart")
    item = cart_service.remove_item_from_cart(db, cart_id, item_id)
    if item:
        return JSONResponse(status_code=200, content={"message": f"Item {item_id} removed from cart {cart_id}"})
    return JSONResponse(status_code=404, content={"message": f"Item {item_id} not found in cart {cart_id}"})


# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Clear the authenticated user's cart
# ----------------------------------------------------------------------
@router.delete("/{cart_id}/clear")
async def clear_cart(
    cart_id: int,
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    cart = cart_service.get_cart_by_user(db, user_id)
    if not cart or cart.id != cart_id:
        raise HTTPException(status_code=403, detail="Not allowed to modify this cart")
    cart_service.clear_cart(db, cart_id)
    return JSONResponse(status_code=200, content={"message": f"Cart {cart_id} cleared successfully"})


# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Buy all items in the authenticated user's cart
# ----------------------------------------------------------------------
@router.post("/{cart_id}/buy_items")
async def buy_items(
    cart_id: int,
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    cart = cart_service.get_cart_by_user(db, user_id)
    if not cart or cart.id != cart_id:
        raise HTTPException(status_code=403, detail="Not allowed to buy items from this cart")
    cart_service.buy_items(db, cart_id)
    return JSONResponse(status_code=200, content={"message": f"Items from Cart {cart_id} bought successfully"})


# ----------------------------------------------------------------------
# 🔒 PROTECTED ROUTE: Get all items in the authenticated user's cart
# ----------------------------------------------------------------------
@router.get("/{cart_id}/items", response_model=List[CartItemSchema])
async def get_cart_items(
    cart_id: int,
    verified_user: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = verified_user.get("id")
    cart = cart_service.get_cart_by_user(db, user_id)
    if not cart or cart.id != cart_id:
        raise HTTPException(status_code=403, detail="Not allowed to view items from this cart")
    cart_items = cart_service.get_cart_items(db, cart_id)
    return cart_items
