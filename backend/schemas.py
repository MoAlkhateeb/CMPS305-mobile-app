from pydantic import BaseModel, field_validator


class UserRegister(BaseModel):
    username: str
    password: str

    @field_validator("password")
    @classmethod
    def password_length(cls, v):
        if len(v) < 8:
            raise ValueError("password cannot be less than 8 characters")
        return v


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ItemOut(BaseModel):
    id: int
    name: str
    price: float
    description: str


class ItemSchema(BaseModel):
    name: str
    price: float
    description: str


class PaymentIn(BaseModel):
    amount: int


class PaymentOut(BaseModel):
    client_secret: str


class Message(BaseModel):
    message: str = "Price must be more than 10c"
