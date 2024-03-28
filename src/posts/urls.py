from django.urls import path
from .views import (
    post_list_and_create,
    like_unlike_post,
    load_post_data_view,
    post_detail
)

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='main-board'),
    path('like-unlike/', like_unlike_post, name='like-unlike'),
    path('<pk>/', post_detail, name='post_detail'),
    path('data/<int:num_posts>/', load_post_data_view, name='posts-data')

]