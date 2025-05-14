from ninja import Schema, ModelSchema
from decimal import Decimal as decimal
from datetime import datetime
from .models import Bid


class UserSchema(Schema):
    id: int
    username: str
    email: str
    role: str


class AuctionSchema(Schema):
    id: int
    name: str
    slug: str
    current_price: decimal
    created_by: str
    is_active: bool



class BidSchema(Schema):
    id: int
    user: UserSchema
    auction: AuctionSchema
    amount: decimal
    timestamp: datetime

class AuctionCreateSchema(Schema):
    name:str
    description: str
    start_price: decimal
    start_time: datetime
    end_time: datetime
    

class BidCreateSchema(Schema):
    amount: decimal
    auction_id: int