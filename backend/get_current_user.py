from typing import Annotated

from sqlalchemy import select
from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer

from models import User
from get_db import get_db
from security import decode_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
) -> User:
    payload = decode_jwt(token)
    user_id = payload.get("id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    query = select(User).where(User.id == user_id)
    return db.execute(query).scalar_one_or_none()


CurrentUserDep = Annotated[User, Depends(get_current_user)]
