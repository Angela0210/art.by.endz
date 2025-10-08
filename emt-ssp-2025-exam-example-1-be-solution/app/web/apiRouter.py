# src/routes/apiRouter.py

from fastapi import APIRouter, Depends
from ..middleware.auth import verify_token # Import the new function

router = APIRouter()

# Use the function as a dependency: verified_user will hold the payload if successful
@router.get("/protected-profile")
def get_protected_profile(verified_user: dict = Depends(verify_token)):
    # If the function returns successfully, the user is authenticated.
    # The user data is now in 'verified_user'
    return {
        "message": "Welcome to your private data!",
        "userId": verified_user.get("id"),
        "role": verified_user.get("role")
    }

# ... other routes ...