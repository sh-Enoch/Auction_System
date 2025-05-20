from ninja import File
from .schemas import UserSchema, AuctionSchema, BidSchema, AuctionCreateSchema, BidCreateSchema, UserDetailSchema
from typing import List
from ninja.files import UploadedFile
from .models import CustomUser, Auction, Bid
from django.shortcuts import get_object_or_404
from ninja_extra import NinjaExtraAPI, api_controller, http_get, http_post
from datetime import datetime, timedelta
app = NinjaExtraAPI()


@api_controller("/users",  tags=["Users"], permissions=[])
class UserController:
    """" Controller for User operations """
    @http_get("/", response=List[UserSchema])
    def list_users(self, request):
        """
        Get a list of all users from the database.
        
        Args:
            request: The HTTP request object.
            
        Returns: List[UserSchema]: A list of users.

        """
        users = CustomUser.objects.all()
        return users

    @http_get("/me", response=UserDetailSchema)
    def get_user(self, request):
    
       pass
    
       


@api_controller("/auctions",  tags=["Auctions"], permissions=[])
class AuctionController:
    """Controller for Auction operations"""

    @http_get("/", response=List[AuctionSchema])
    def list_auctions(self, request):
        """
        Get a list of all auctions from the database.
        
        Args:
            request: The HTTP request object.
            
        Returns: List[AuctionSchema]: A list of auctions.

        """
        auctions = Auction.objects.all()
        return auctions
    
    @http_post("/create_auction/", response=AuctionSchema)
    def create_auction(self, request, payload: AuctionCreateSchema, image: UploadedFile = File(...)):
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

                # Set default timestamps if not provided
        if not auction_raw.get("start_time"):
            auction_raw["start_time"] = datetime.now()
        if not auction_raw.get("end_time"):
            auction_raw["end_time"] = datetime.now() + timedelta(days=7)
        
        # Create auction with image
        auction = Auction(**auction_raw)
        if image:
            auction.image.save(image.name, image)
        auction.save()
        return auction
    
    @http_get("/{slug}/", response=AuctionSchema)
    def get_auction(self, request, slug: str):
        """
        Get a specific auction by its slug.
        
        Args:
            request: The HTTP request object.
            slug: The slug of the auction to retrieve.
            
        Returns: AuctionSchema: The auction with the specified slug.

        """
        auction = get_object_or_404(Auction, slug=slug)
        return auction


@api_controller("/bids",  tags=["Bids"], permissions=[])
class BidController:
    """Controller for Bid operations"""

    @http_get("/", response=List[BidSchema])
    def list_bids(self, request):
        """
        Get a list of all bids from the database.
        
        Args:
            request: The HTTP request object.
            
        Returns: List[BidSchema]: A list of bids.

        """
        bids = Bid.objects.all()
        return bids
    

    @http_post("/bids/", response=BidSchema)
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
    
    @http_get("/{id}/", response=BidSchema)
    def get_bid(self, request, id: int):
        """
        Get a specific bid by its ID.
        
        Args:
            request: The HTTP request object.
            id: The ID of the bid to retrieve.
            
        Returns: BidSchema: The bid with the specified ID.

        """
        bid = get_object_or_404(Bid, id=id)
        return bid


app.register_controllers(UserController, AuctionController, BidController)
