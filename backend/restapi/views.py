from rest_framework import views, serializers, status
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User
from rest_framework.reverse import reverse
from rest_framework import permissions

class UserHelpers():
    
    @staticmethod
    def user_representation(user, request):
        return {
            'url': reverse('user-detail', args=(user.id,), request=request),
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }


class UserSeralizer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField()


# My implementation of IsAuthenticatedOrReadOnly for illustration
class IsAuthenticatedForUnsafe(permissions.BasePermission):
    message = 'Authenticated user required.'

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return permissions.IsAuthenticated().has_permission(request, view)


class UserList(views.APIView):
    """
    List all users, or create a new user.
    """
    serializer_class = UserSeralizer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        result = [UserHelpers.user_representation(user, request) for user in User.objects.all()]
        return Response(result)

    def post(self, request):
        serializer = UserSeralizer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.data
        new_user = None
        try:
            new_user = User.objects.create(username=user['username'], first_name=user.get('first_name', ''),
                last_name=user.get('last_name', ''), email=user.get('email'))
        except Exception as e:
            return Response(dict(error=e.args[0]), status=status.HTTP_400_BAD_REQUEST)
        user['id'] = new_user.id
        return Response(user, status=status.HTTP_201_CREATED)

user_list_view = UserList.as_view()


class UserDetail(views.APIView):
    """
    Retreive, update or delete a user.
    """
    serializer_class = UserSeralizer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, pk):
        user = User.objects.filter(id=pk)
        if (len(user)) == 0:
            return Response(dict(message="User by that ID does not exist."), status=status.HTTP_404_NOT_FOUND)
        return Response(UserHelpers.user_representation(user[0], request))

    def put(self, request, pk):
        user = User.objects.filter(id=pk)
        if (len(user)) == 0:
            return Response(dict(message="User by that ID does not exist."), status=status.HTTP_404_NOT_FOUND)
        user = user[0]
        serializer = UserSeralizer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data
        if (user_data['id'] != user.id):
            return Response(dict(error="User ID does not match."), status=status.HTTP_400_BAD_REQUEST)
        if (user_data['username'] != user.username):
            return Response(dict(error="Username does not match."), status=status.HTTP_400_BAD_REQUEST)
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        user = User.objects.filter(id=pk)
        if (len(user)) == 0:
            return Response(dict(message="User by that ID does not exist."), status=status.HTTP_404_NOT_FOUND)
        user = user[0]
        if (user.id == request.user.id):
            return Response(dict(error="User cannot delete itself."), status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({}, status=status.HTTP_200_OK)

user_detail_view = UserDetail.as_view()


class UserSelf(views.APIView):
    """
    Details about the logged in user
    """

    def get(self, request):
        return Response(UserHelpers.user_representation(request.user, request))

user_self_view = UserSelf.as_view()