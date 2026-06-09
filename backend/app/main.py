from datetime import datetime, timedelta, timezone
import os

import jwt
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 1800
ALGORITHM = "HS256"
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "development-secret-key")
VALID_USERNAME = os.getenv("JWT_VALID_USERNAME", "admin")
VALID_PASSWORD = os.getenv("JWT_VALID_PASSWORD", "admin123")

CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:4173,http://localhost:3000",
).split(",")

app = FastAPI(title="JWT Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


class RefreshRequest(BaseModel):
    refresh_token: str


class RefreshResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


def create_token(subject: str, token_type: str, expires_seconds: int) -> str:
    payload = {
        "sub": subject,
        "type": token_type,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=expires_seconds),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_refresh_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expired",
        ) from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        ) from exc

    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
        )

    return payload


@app.post("/auth/token", response_model=TokenResponse)
def login(credentials: LoginRequest) -> TokenResponse:
    if credentials.username != VALID_USERNAME or credentials.password != VALID_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return TokenResponse(
        access_token=create_token(
            subject=credentials.username,
            token_type="access",
            expires_seconds=ACCESS_TOKEN_EXPIRE_SECONDS,
        ),
        refresh_token=create_token(
            subject=credentials.username,
            token_type="refresh",
            expires_seconds=REFRESH_TOKEN_EXPIRE_SECONDS,
        ),
    )


@app.post("/auth/refresh", response_model=RefreshResponse)
def refresh_token(request: RefreshRequest) -> RefreshResponse:
    payload = decode_refresh_token(request.refresh_token)
    return RefreshResponse(
        access_token=create_token(
            subject=payload["sub"],
            token_type="access",
            expires_seconds=ACCESS_TOKEN_EXPIRE_SECONDS,
        )
    )
