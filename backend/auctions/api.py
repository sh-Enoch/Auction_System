from ninja import NinjaAPI
from .schemas import UserSchema, AuctionSchema, BidSchema
from typing import List
from .models import CustomUser, Auction, Bid


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