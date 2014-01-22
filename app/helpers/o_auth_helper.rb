module OAuthHelper
  def current_instagram_client
    if (logged_in?)
      access_token = current_user.access_token
      client = Instagram.client(:access_token => access_token)
      return client
    else
      return nil
    end
  end

  def has_client?
    current_instagram_client && !current_instagram_client.access_token.nil?
  end

  def require_current_instagram_client
    redirect_to connect_url unless has_client?
  end

  def cache_user_info
    session[:redis_token] ||= SecureRandom.urlsafe_base64
    user = current_instagram_client.user;
    user[:posts] = current_instagram_client.user_recent_media;
    REDIS.set("user_info#{session[:redis_token]}", 
              user.to_json)
  end
end
