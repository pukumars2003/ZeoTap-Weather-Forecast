from flask import Flask, render_template
from models import DailyWeatherSummary, Session
import requests
import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from config import Config
from flask_mail import Message,Mail
from collections import defaultdict

app = Flask(__name__)
app.config.from_object(Config)

scheduler = BackgroundScheduler()

def fetch_weather_data():
    for city in app.config['LOCATIONS']:
        response = requests.get(
            f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid=bd5e378503939ddaee76f12ad7a97608&units=metric"
        )
        
        print(f"Fetching data for {city}: {response.status_code}")  # Debug log
        if response.status_code == 200:
            data = response.json()
            print(f"Data for {city}: {data}")  # Log the data
            process_weather_data(data)
        else:
            print(f"Error fetching data for {city}: {response.text}")  # Log the error

alert_history = defaultdict(list)
def process_weather_data(data):
    city = data['name']
    main = data['weather'][0]['main']
    temp = data['main']['temp']
    humidity = data['main']['humidity']  # Capture humidity
    wind_speed = data['wind']['speed']    # Capture wind speed
    timestamp = datetime.datetime.now().date()

    session = Session()
    summary = session.query(DailyWeatherSummary).filter_by(date=timestamp, city=city).first()

    print(f"Processing data for {city}: Temp = {temp}, Condition = {main}, Humidity = {humidity}, Wind Speed = {wind_speed}")

    if not summary:
        summary = DailyWeatherSummary(date=timestamp, city=city)
        summary.avg_temp = temp
        summary.max_temp = temp
        summary.min_temp = temp
        summary.dominant_condition = main
        summary.avg_humidity = humidity  # New: Save humidity
        summary.avg_wind_speed = wind_speed  # New: Save wind speed
    else:
        summary.avg_temp = (summary.avg_temp + temp) / 2
        summary.max_temp = max(summary.max_temp, temp)
        summary.min_temp = min(summary.min_temp, temp)
        summary.dominant_condition = main
        summary.avg_humidity = humidity # Update humidity
        summary.avg_wind_speed =wind_speed  # Update wind speed
    
    session.add(summary)
    session.commit()
    print(f"Data saved for {city} on {timestamp}.")


    # Check for alerts
    if temp > app.config['TEMP_THRESHOLD']:
        alert_history[city].append(temp)
        if len(alert_history[city]) >= app.config['ALERT_COUNT']:
            print(f"ALERT: {city} - Temperature exceeded {app.config['TEMP_THRESHOLD']}°C!")
            # Here you can add functionality to send email notifications if needed
            alert_history[city] = []  # Reset after alert
    else:
        alert_history[city] = []  # Clear alert history if temp is below threshold



def send_alert_email(city, temp):
    msg = Message("Weather Alert", recipients=["recipient@example.com"])
    msg.body = f"ALERT: {city} - Temperature exceeded {app.config['TEMP_THRESHOLD']}°C! Current temperature: {temp}°C."
    mail.send(msg)

mail = Mail(app)

@app.route('/')
def dashboard():
    session = Session()
    summaries = session.query(DailyWeatherSummary).all()
     # Prepare data for visualization
    weather_data = {}
    for summary in summaries:
        weather_data[summary.city] = {
            'avg_temp': summary.avg_temp,
            'dominant_condition': summary.dominant_condition,
            'avg_humidity': summary.avg_humidity,
            'avg_wind_speed': summary.avg_wind_speed,
            'date': summary.date
        }

    # Prepare data for visualization
    labels = list(set(summary.city for summary in summaries))  # Unique city names
    avg_temps = [sum(s.avg_temp for s in summaries if s.city == city) / 
                 len([s for s in summaries if s.city == city]) for city in labels]  # Average for each city
    
    return render_template('dashboard.html', summaries=summaries, labels=labels, avg_temps=avg_temps,weather_data=weather_data)

if __name__ == "__main__":
    fetch_weather_data()  # Fetch data immediately for testing
    scheduler.add_job(fetch_weather_data, 'interval', seconds=app.config['INTERVAL'])
    scheduler.start()
    app.run(debug=True)
