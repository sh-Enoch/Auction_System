from ninja import Schema, ModelSchema
from decimal import Decimal as decimal
from datetime import datetime
from .models import Bid
from ninja.files import UploadedFile
from ninja import File
from typing import Annotated

class UserSchema(Schema):
    id: int
    username: str
    email: str
    role: str


class AuctionCreateSchema(Schema):
    name:str
    description: str
    start_price: decimal
    start_time: datetime
    end_time: datetime


class AuctionSchema(Schema):
    id: int
    name: str
    slug: str
    current_price: decimal
    created_by: UserSchema
    is_active: bool
class AuctionImaheSchema(Schema):
    image: Annotated[UploadedFile, File(..., description="Auction image")]


    

class AuctionOutSchema(AuctionSchema):
    image_url: str | None

    @staticmethod
    def resolve_image_url(obj):
        return obj.image.url if obj.image else None

    

class BidSchema(Schema):
    id: int
    user: UserSchema | None
    auction: AuctionSchema
    amount: decimal
    timestamp: datetime
  

class BidCreateSchema(Schema):
    amount: decimal
    auction_id: int