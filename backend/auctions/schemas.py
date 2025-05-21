from ninja import Schema, ModelSchema
from decimal import Decimal as decimal
from datetime import datetime
from .models import Bid
from typing import List 


class UserSchema(Schema):
    id: int
    username: str
    email: str
    role: str

class UserCreateSchema(Schema):
    username: str
    email: str
    password: str
    role: str | None = "user"

    @staticmethod
    def resolve_role(obj) -> str:
        return obj.role if obj.role else "user"

class AuctionSchema(Schema):
    id: int
    name: str
    slug: str
    current_price: decimal
    created_by: UserSchema
    is_active: bool
    image_url: str | None

    @staticmethod
    def resolve_image_url(obj) -> str | None:
        if obj.image:
            return obj.image.url
        return None

    

class BidSchema(Schema):
    id: int
    user: UserSchema | None
    auction: AuctionSchema
    amount: decimal
    timestamp: datetime
  

class BidCreateSchema(Schema):
    amount: decimal
    auction_id: int


class UserDetailSchema(UserSchema):
    bids: List[BidSchema] | None
    auctions: List[AuctionSchema] | None
