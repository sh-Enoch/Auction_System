from ninja import Schema
from decimal import Decimal as decimal
from datetime import datetime


class UserSchema(Schema):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str



class AuctionSchema(Schema):
    id: int
    name: str
    slug: str
    current_price: decimal



class BidSchema(Schema):
    user: UserSchema | None 
    auction: AuctionSchema | None
    amount: decimal
    timestamp: datetime

