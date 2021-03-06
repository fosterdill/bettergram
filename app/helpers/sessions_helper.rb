module SessionsHelper
  def login!(user)
    user.reset_session_token!
    session[:token] = user.session_token
    user.save!
  end

  def logout!
    current_user.reset_session_token!
    session[:token] = nil
  end

  def current_user
    User.find_by_session_token(session[:token])
  end

  def logged_in?
    !current_user.nil?
  end

  def require_current_user
    redirect_to new_session_url unless logged_in?
  end

  def require_no_current_user
    redirect_to root_url unless !logged_in?
  end
end
