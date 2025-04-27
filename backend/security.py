import jwt

SECRET_KEY = "secret-key"


def encode_jwt(user_id):
    return jwt.encode({"id": user_id}, SECRET_KEY, algorithm="HS256")


def decode_jwt(token):
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
