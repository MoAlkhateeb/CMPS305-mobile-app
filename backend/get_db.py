from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from db import session


async def get_db():
    yield session


DBSessionDep = Annotated[Session, Depends(get_db)]
