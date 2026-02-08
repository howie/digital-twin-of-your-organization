from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Digital Twin Server"
    debug: bool = False
    gemini_api_key: str = Field(default="", alias="GEMINI_API_KEY")
    data_dir: Path = Path(__file__).resolve().parent.parent.parent / "data"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
