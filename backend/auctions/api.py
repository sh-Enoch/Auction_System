from ninja import File
from .schemas import UserSchema,AuthSchema, AuctionSchema, BidSchema, AuctionCreateSchema, BidCreateSchema, UserDetailSchema, UserCreateSchema
from typing import List
from ninja.files import UploadedFile
from .models import CustomUser, Auction, Bid
from django.shortcuts import get_object_or_404
from ninja_extra import NinjaExtraAPI, api_controller, http_get, http_post, http_patch, route
from datetime import datetime, timedelta
from ninja.errors import HttpError
from django.utils import timezone
from .permissions import IsAdmin, IsSeller, IsUser, IsAdminOrSeller, IsAdminOrUser
from ninja_extra import permissions
from django.contrib.auth import get_user_model
from ninja.security import HttpBearer
from django.contrib.auth import authenticate


app = NinjaExtraAPI()


User = get_user_model()

class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        try:
            return User.objects.get(auth_token=token)
        except:
            return None
        




@api_controller("/auth", tags=['Auth'])
class AuthController:
    @route.post('/register' , response={201: UserSchema, 400: dict})
    def register(self, payload: UserCreateSchema):
        """
        Register a new user.
        
        Args:
            payload: The data for the new user.
            
        Returns: UserSchema: The newly registered user.

        """
        if CustomUser.objects.filter(email=payload.email).exists():
            return {"error": "User with this email already exists."}
        
        user = CustomUser.objects.create_user(
            username=payload.username,
            email=payload.email,
            password=payload.password,
            role=payload.role or "user"  # Default to "user" if no role is provided
        )
        return 201, user
    
    @route.post("/login")
    def login(self, payload: AuthSchema):
        user = authenticate(email=payload.email, password=payload.password)
        if not user:
            return {"error": "Invalid credentials."}
        
        token = user.auth_token
        return {
            'token': token,
        }




@api_controller("/users",  tags=["Users"], permissions=[])
class UserController:
    """" Controller for User operations """
    
    @http_get("/me", response=UserSchema, permissions=[permissions.IsAuthenticated])
    def get_user(self, request):
        """
        Get the current authenticated user.

        Args:

            request: The HTTP request object.

        Returns: UserSchema: The current authenticated user.
        """
        user = request.user
        if not user:
            return 404, {"error": "User not found."}
        return user
       
    
    
    
    @http_post("register_role/{id}/", response=UserSchema, permissions=[])
    def register_user_role(self, request, role: str, id: int, payload: UserCreateSchema):
        """
        Register a new user with a specific role in the database.
        
        Args:
            request: The HTTP request object.
            role: The role to assign to the user.
            id: The ID of the user to update.
            
        Returns: UserSchema: The updated user.

        """
        user = get_object_or_404(CustomUser, id=id)
        
        if role not in ["admin", "seller", "user"]:
            return 400, {"error": "Invalid role."}
        
        user.role = role
        user.save()
        return user

    
    @http_get("/", response=List[UserSchema], permissions=[IsAdmin])
    def list_users(self, request):
        """
        Get a list of all users from the database.
        
        Args:
            request: The HTTP request object.
            
        Returns: List[UserSchema]: A list of users.

        """
        users = CustomUser.objects.all()
        return users


    
       


@api_controller("/auctions",  tags=["Auctions"], permissions=[])
class AuctionController:
    """Controller for Auction operations"""

    @http_get("/", response=List[AuctionSchema], permissions=[permissions.IsAuthenticatedOrReadOnly])
    def list_auctions(self, request):
        """
        Get a list of all auctions from the database.
        
        Args:
            request: The HTTP request object.
            
        Returns: List[AuctionSchema]: A list of auctions.

        """
        auctions = Auction.objects.all()
        return auctions
    
    @http_post("/create_auction/", response=AuctionSchema, permissions=[IsAdminOrSeller])
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
    
    @http_get("/{slug}/", response=AuctionSchema, permissions=[permissions.IsAuthenticatedOrReadOnly])
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
    

    @http_patch("/{id}", response={200: AuctionSchema ,400: dict,  403: dict}, permissions=[IsAdminOrSeller])
    def set_auction_time(self, request, id: int, start_time: datetime = None, endtime: datetime = None):
        """
        Update the start and end time of an auction.
        
        Args:
            request: The HTTP request object.
            id: The ID of the auction to update.
            start_time: The new start time for the auction.
            end_time: The new end time for the auction.
            
        Returns: AuctionSchema: The updated auction.

        """
        auction = get_object_or_404(Auction, id=id)

        if auction.created_by != request.user and request.user.role != "admin":
            return 403, {"error": "You do not have permission to update this auction."}

        if start_time:
            if start_time < timezone.now():
                return 400, {"error":"Start time cannot be in the past."}
            auction.start_time = start_time

        if endtime:
        # End time must be after start time
            if start_time:
                min_end_time = start_time + timedelta(days=14) 
            else:
                auction.start_time
            min_increment = auction.start_time + timedelta(hours=1)  # At least 1 hour duration
            if endtime <= min_increment:
                    return 400, {
                            "error": f"Auction must last at least 1 hour (end after {min_increment.isoformat()})"
            }

        if auction.end_time < timezone.now():
            return 400, {"error": "Cannot update an auction that has already ended."}
        

        auction.save()
        return 200, auction


@api_controller("/bids",  tags=["Bids"], permissions=[])
class BidController:
    """Controller for Bid operations"""

    @http_get("/", response=List[BidSchema], permissions=[permissions.IsAuthenticatedOrReadOnly])
    def list_bids(self, request):
        """
        Get a list of all bids from the database.
        
        Args:
            request: The HTTP request object.
            
        Returns: List[BidSchema]: A list of bids.

        """
        bids = Bid.objects.all()
        return bids
    

    @http_post("/bids/", response=BidSchema, permissions=[IsAdminOrUser])
    def create_bid(self, request, bid: BidCreateSchema):
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
    
    @http_get("/{id}/", response=BidSchema, permissions=[permissions.IsAuthenticatedOrReadOnly])
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


app.register_controllers(UserController, AuctionController, BidController, AuthController)
