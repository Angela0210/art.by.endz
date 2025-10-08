#ovoj e novo za authorization

from fastapi import Header, HTTPException, status
from jose import jwt, JWTError

# IMPORTANT: Use an environment variable for the secret key!
SECRET_KEY = "YOUR_SUPER_SECRET_KEY"  # Replace with actual secret from config
ALGORITHM = "HS256"


def verify_token(token: str = Header(..., alias="Authorization")):
    """
    Verifies the JWT token from the Authorization header.
    Expects header format: "Bearer <token>"
    """

    # Check if the header starts with "Bearer " and extract the token
    if not token.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing or invalid format (Expected: Bearer <token>)",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = token.split(" ")[1]  # Extract the actual token string

    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # You can add checks here (e.g., check expiration time)
        user_id = payload.get("id")
        if user_id is None:
            raise JWTError

        return payload  # Returns the user data (id, role, etc.)

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials or token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )