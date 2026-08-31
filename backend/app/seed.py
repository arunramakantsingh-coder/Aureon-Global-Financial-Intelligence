from sqlalchemy import select
from .db import Base, SessionLocal, engine
from .models import Country, DataSource, Instrument, Market, Organization

SOURCES = [
    ("market", "Market Data", "prices/ohlcv"),
    ("macro", "Macro Data", "rates/inflation/gdp"),
    ("corporate", "Corporate Data", "fundamentals/events"),
    ("news", "News & Events", "global intelligence"),
]

COUNTRIES = [("IND", "India"), ("USA", "United States"), ("GBR", "United Kingdom")]

MARKETS = [
    ("nse", "National Stock Exchange of India", "IND", "equity"),
    ("nasdaq", "NASDAQ", "USA", "equity"),
    ("nyse", "New York Stock Exchange", "USA", "equity"),
    ("fx", "Foreign Exchange", None, "fx"),
    ("ice-brent", "ICE Brent Crude", "GBR", "commodity"),
]

ORGANIZATIONS = [
    ("org-rbi", "Reserve Bank of India", "central_bank", "IND"),
    ("org-fed", "Federal Reserve", "central_bank", "USA"),
    ("org-apple", "Apple Inc.", "company", "USA"),
]

INSTRUMENTS = [
    ("nifty50", "NIFTY 50", "NIFTY 50", "index", "INR", "nse"),
    ("sensex", "SENSEX", "BSE SENSEX", "index", "INR", None),
    ("aapl", "AAPL", "Apple Inc.", "equity", "USD", "nasdaq"),
    ("msft", "MSFT", "Microsoft Corp.", "equity", "USD", "nasdaq"),
    ("usd-inr", "USD/INR", "US Dollar / Indian Rupee", "fx", "INR", "fx"),
    ("eur-usd", "EUR/USD", "Euro / US Dollar", "fx", "USD", "fx"),
    ("xau-usd", "XAU/USD", "Gold / US Dollar", "commodity", "USD", "fx"),
    ("brent", "BRENT", "Brent Crude", "commodity", "USD", "ice-brent"),
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for item in SOURCES:
            if not db.get(DataSource, item[0]):
                db.add(DataSource(id=item[0], name=item[1], domain=item[2], provider_type="external", is_enabled=False))
        for code, name in COUNTRIES:
            if not db.get(Country, code):
                db.add(Country(code=code, name=name))
        for item in MARKETS:
            if not db.get(Market, item[0]):
                db.add(Market(id=item[0], name=item[1], country_code=item[2], asset_class=item[3]))
        for item in ORGANIZATIONS:
            if not db.get(Organization, item[0]):
                db.add(Organization(id=item[0], name=item[1], org_type=item[2], country_code=item[3]))
        db.flush()
        for item in INSTRUMENTS:
            if not db.scalar(select(Instrument).where(Instrument.symbol == item[1])):
                db.add(Instrument(id=item[0], symbol=item[1], name=item[2], asset_class=item[3], currency=item[4], market_id=item[5]))
        db.commit()
    finally:
        db.close()
