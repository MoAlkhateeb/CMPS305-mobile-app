import os
import bcrypt
import uvicorn
import stripe
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy import select

from models import User, Item
from security import encode_jwt
from schemas import (
    PaymentIn,
    PaymentOut,
    Message,
    UserRegister,
    ItemOut,
    ItemSchema,
    TokenOut,
)
from get_db import DBSessionDep
from get_current_user import CurrentUserDep
from security import encode_jwt, decode_jwt

load_dotenv()

app = FastAPI()
stripe.api_key = os.environ.get("SECRET_KEY")


@app.post("/register")
def register(user_data: UserRegister, session: DBSessionDep):
    username = user_data.username.strip().lower()
    password = user_data.password

    query = select(User).where(User.username == username)
    existing_user = session.execute(query).scalar_one_or_none()

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="username already exists"
        )

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(username=username, password=hashed_password)

    session.add(user)
    session.commit()

    return TokenOut(access_token=encode_jwt(user.id))


@app.post("/login")
def login(
    session: DBSessionDep,
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    username = form_data.username.strip().lower()
    password = form_data.password

    query = select(User).where(User.username == username)
    user = session.execute(query).scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="username or password incorrect",
        )

    if not bcrypt.checkpw(password.encode(), user.password.encode()):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="username or password incorrect",
        )

    return TokenOut(access_token=encode_jwt(user.id))


@app.post("/me")
def get_user(current_user: CurrentUserDep):

    return {"id": current_user.id, "username": current_user.username}


@app.post("/items")
def create_item(
    item_data: ItemSchema, current_user: CurrentUserDep, session: DBSessionDep
):

    item = Item(
        name=item_data.name, price=item_data.price, description=item_data.description
    )
    session.add(item)
    session.commit()

    return {"detail": "successfully created item"}


@app.get("/items")
def items(current_user: CurrentUserDep, session: DBSessionDep) -> list[ItemOut]:
    query = select(Item)
    items = session.execute(query).all()
    return [item[0] for item in items]


@app.post(
    "/create-payment-intent",
    responses={400: {"model": Message}},
)
def payment(payment_in: PaymentIn, current_user: CurrentUserDep) -> PaymentOut:

    if payment_in.amount < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Price must be more than 10c",
        )

    intent = stripe.PaymentIntent.create(
        amount=payment_in.amount, currency="usd", payment_method_types=["card"]
    )

    return {"client_secret": intent["client_secret"]}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
