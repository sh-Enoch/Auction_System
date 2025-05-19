from django.db import models
from django_extensions.db.fields import AutoSlugField
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.

class CustomUser(AbstractUser):
    """AUthenicationa and authorization model. Add Roles to user"""
    ROLE_CHOICES = (
        ('seller', "Seller"),
        ('admin', "Admin"),
        ('user', 'Bidder'),
    
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.username} ({self.role})"


class Auction(models.Model):
    """Captures the information needed to control bidding and display auction state."""
    name = models.CharField(max_length=255, unique=True)
    slug = AutoSlugField(populate_from='name', unique=True)
    image = models.ImageField(upload_to='auctions/', blank=True, null=True)
    description = models.TextField(max_length=1000)
    start_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_by = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="auctions")


    @property
    def is_active(self):
        """Check if the auction is active based on the current time."""
        return self.start_time <= timezone.now() <= self.end_time


    def __str__(self):
        return f"{self.name} ({self.start_time} - {self.end_time})"


class Bid(models.Model):
    """Need to capture biddding information and its logic"""
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="bids")
    auction = models.ForeignKey("Auction", on_delete=models.CASCADE, related_name="bid_auctions")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} {self.auction} ({self.amount})"