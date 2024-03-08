# Database connection details
username = 'e2101098'
password = 'cqgYeaFEN6A'
host = 'mariadb.vamk.fi'
database = 'e2101098_'

# SQLAlchemy configuration
SQLALCHEMY_DATABASE_URI = 'mariadb+pymysql://{}:{}@{}/{}'.format(username, password, host, database)

class Config:
    # Flask configuration
    SECRET_KEY = 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Email configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'your_email_address'
    MAIL_PASSWORD = 'your_email_password'

    # Other configuration options
    ...
