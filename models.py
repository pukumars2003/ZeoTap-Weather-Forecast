from sqlalchemy import create_engine, Column, Integer, Float, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class DailyWeatherSummary(Base):
    __tablename__ = 'daily_weather_summary'
    
    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    city = Column(String, nullable=False)  # Add city field
    avg_temp = Column(Float)
    max_temp = Column(Float)
    min_temp = Column(Float)
    dominant_condition = Column(String)
    avg_humidity = Column(Float)  # New field for humidity
    avg_wind_speed = Column(Float)  # New field for wind speed

# Database setup
engine = create_engine('sqlite:///weather.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
