from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from datetime import datetime, timedelta
from decimal import Decimal
from ninja_extra.testing import TestClient

from .models import Auction, Bid
from .schemas import AuctionCreateSchema, BidCreateSchema
from .api import app

User = get_user_model()

class BaseAPITestCase(TestCase):
    def setUp(self):
        self.client = TestClient(app)
        
        # Create test users
        self.admin = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='password',
            role='admin'
        )
        
        self.seller = User.objects.create_user(
            username='seller',
            email='seller@example.com',
            password='password',
            role='seller'
        )
        
        self.user = User.objects.create_user(
            username='user',
            email='user@example.com',
            password='password',
            role='user'
        )
        
        # Create test auction
        self.auction = Auction.objects.create(
            title='Test Auction',
            slug='test-auction',
            description='Test description',
            start_price=Decimal('100.00'),
            current_price=Decimal('100.00'),
            created_by=self.seller,
            end_time=datetime.now() + timedelta(days=7),
            is_active=True
        )

    def authenticate(self, user):
        self.client.force_authenticate(user)