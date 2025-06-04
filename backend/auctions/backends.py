from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model


User = get_user_model()

class EmailAuthBackend(ModelBackend):
    """
    Custom authentication backend that allows users to log in using their email address.
    """
    def authenticate(self, request, email=None, password=None, **kwargs):
        print(f"Attempting auth for email: {email}") 
        try:
            user = User.objects.get(email=email)
            print(f"User found: {user.email}") 
            if user.check_password(password):
                print("Password valid!")
                return user
        except User.DoesNotExist:
            print("User not found!")
            return None