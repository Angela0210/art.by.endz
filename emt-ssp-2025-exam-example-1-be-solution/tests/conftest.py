import pytest
from app.database.seeder import reset_database, seed_data
from app.database.database import get_db


@pytest.fixture(scope="session", autouse=True)
def prepare_test_db():
    reset_database()
    db = next(get_db())
    seed_data(db)
    db.close()
