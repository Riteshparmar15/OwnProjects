import os
import pandas as pd
import pytest
from app import app, DATA_FILE

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False
    with app.test_client() as client:
        if os.path.exists(DATA_FILE):
            os.remove(DATA_FILE)
        yield client


def test_student_detail_page_and_promotion_flow(client):
    df = pd.DataFrame([
        {'Name': 'Ava', 'Class': 'Nursery', 'Fee Status': 'Paid', 'DOB': '2021-01-01', 'Allergies': 'None'}
    ])
    df.to_excel(DATA_FILE, index=False)

    resp = client.get('/students/0')
    assert resp.status_code == 200
    assert b'Ava' in resp.data

    resp = client.post('/students/promote', data={'from_class': 'Nursery', 'to_class': 'LKG'})
    assert resp.status_code == 302
    assert '/students' in resp.headers['Location']
