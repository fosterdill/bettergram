module OAuthHelper
  def current_instagram_client
    access_token = current_user.access_token
    client = Instagram.client(:access_token => access_token)
    return client
  end

  def has_client?
    !current_instagram_client.access_token.nil?
  end

  def require_current_instagram_client
    redirect_to connect_url unless has_client?
  end
end
