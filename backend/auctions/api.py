from ninja import NinjaAPI
from .schemas import UserSchema, AuctionSchema, BidSchema, AuctionCreateSchema, BidCreateSchema
from typing import List
from .models import CustomUser, Auction, Bid
from django.shortcuts import get_object_or_404


app = NinjaAPI()


@app.get("/users/", response=List[UserSchema])
def list_users(request):
    """
    Get a list of all users from the database.
    
    Args:
        request: The HTTP request object.
        
    Returns: List[UserSchema]: A list of users.

    """
    users = CustomUser.objects.all()
    return users


@app.get("/auctions/", response=List[AuctionSchema])
def list_auctions(request):
    """
    Get a list of all auctions from the database.
    
    Args:
        request: The HTTP request object.
        
    Returns: List[AuctionSchema]: A list of auctions.

    """
    auctions = Auction.objects.all()
    return auctions


@app.get("/bids/", response=List[BidSchema])
def list_bids(request):
    """
    Get a list of all bids from the database.
    
    Args:
        request: The HTTP request object.
        
    Returns: List[BidSchema]: A list of bids.

    """
    bids = Bid.objects.all()
    return bids



@app.post("/auctions/", response=AuctionSchema)
def create_auction(request, payload: AuctionCreateSchema):
    """
    Create a new auction in the database.
    
    Args:
        request: The HTTP request object.
        payload: The data for the new auction.
        
    Returns: List[AuctionSchema]: A list of auctions.
        
    """
    
    auction_raw = payload.dict()
    auction_raw["created_by"] = request.user
    auction_raw["current_price"] = auction_raw["start_price"]
    auction = Auction.objects.create(**auction_raw)
    auction.save()
    return auction


@app.get("/auctions/{slug}/", response=AuctionSchema)
def get_auction(request, slug: str):
    """
    Get a specific auction by its slug.
    
    Args:
        request: The HTTP request object.
        slug: The slug of the auction to retrieve.
        
    Returns: AuctionSchema: The auction with the specified slug.

    """
    auction = get_object_or_404(Auction, slug=slug)
    return auction


@app.post("/bids/", response=BidSchema)
def create_bid(request, bid: BidCreateSchema):
    """
    Create a new bid in the database.
    
    Args:
        request: The HTTP request object.
        bid: The data for the new bid.
        
    Returns: List[BidSchema]: A list of bids.

    """
    bid_raw = bid.dict()
    bid_raw["user"] = request.user
    bid_raw["auction"] = get_object_or_404(Auction, id=bid_raw.pop("auction_id"))

    auction = bid_raw["auction"]
    if bid_raw["amount"] <= auction.current_price:
        return {"error": "Bid amount must be greater than the current price."}
    
    bid = Bid.objects.create(**bid_raw)

    # Update the auction's current price
    auction.current_price = bid_raw["amount"]
    bid.save()

    return bid