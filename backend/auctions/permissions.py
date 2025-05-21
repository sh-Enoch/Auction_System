from ninja_extra import permissions
from enum import Enum
from typing import Union

class UserRole(str, Enum):
    ADMIN = "admin"
    SELLER = "seller"
    USER = "user"

class BaseRolePermission(permissions.BasePermission):
    role = None  # Must be set in subclasses
    
    def has_permission(self, request, controller):
        """Base permission check for roles"""
        if not request.user.is_authenticated:
            return False
        return request.user.role == self.role

class IsAdmin(BaseRolePermission):
    """Allow only admin users"""
    role = UserRole.ADMIN

class IsSeller(BaseRolePermission):
    """Allow only seller users"""
    role = UserRole.SELLER

class IsUser(BaseRolePermission):
    """Allow only regular users"""
    role = UserRole.USER

class IsOwnerOrAdmin(permissions.BasePermission):
    """Allow object owners or admins"""
    def has_object_permission(self, request, controller, obj):
        owner = getattr(obj, 'created_by', None) or getattr(obj, 'owner', None)
        return (
            request.user.role == UserRole.ADMIN or
            owner == request.user
        )

class IsAdminOrSeller(permissions.OR):
    """Combine Admin and Seller permissions"""
    def __init__(self):
        super().__init__(IsAdmin(), IsSeller())

class IsAdminOrUser(permissions.OR):
    """Combine Admin and User permissions"""
    def __init__(self):
        super().__init__(IsAdmin(), IsUser())
