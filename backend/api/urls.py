from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from api.views import ManageUserView, TaskViewSet, UserViewSet

router = routers.DefaultRouter()
router.register("tasks", TaskViewSet)
router.register("users", UserViewSet)

urlpatterns = [
    # genericsを継承しているviewはrouterが使えないのでas_view()を使ってルーティング
    path("myself/", ManageUserView.as_view(), name="myself"),
    path("", include(router.urls)),
]
