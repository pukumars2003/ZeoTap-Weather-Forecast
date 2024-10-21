import os
from flask_mail import Mail

class Config:
    API_KEY = 'bd5e378503939ddaee76f12ad7a97608'  # Set your OpenWeatherMap API key as an environment variable
    INTERVAL = 300  # Interval in seconds (5 minutes)
    TEMP_THRESHOLD = 35  # Temperature threshold in Celsius
    ALERT_COUNT = 2  # Consecutive updates for alerts
    LOCATIONS = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad']
    MAIL_SERVER = 'smtp.example.com'  # Change to your mail server
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'your-email@example.com'
    MAIL_PASSWORD = 'your-password'
    MAIL_DEFAULT_SENDER = 'your-email@example.com'
