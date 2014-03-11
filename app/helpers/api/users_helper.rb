module Api::UsersHelper
  def get_specific_user_data id
    user = current_instagram_client.user(id)
    user[:posts] = current_instagram_client.user_recent_media(id)
    user[:following] = current_instagram_client.user_relationship(id)
    user
  end

  def get_current_user_data
    user = current_instagram_client.user;
    user[:posts] = current_instagram_client.user_recent_media;
    user
  end
end
