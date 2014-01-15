class User < ActiveRecord::Base
  attr_accessible :username, :password
  attr_reader :password
  validates :username, :password_digest, :session_token, :presence => true
  validates :password, 
    :presence => true, 
    :length => {:minimum => 6}, 
    :on => :create

  before_validation :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64;
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username

    if user && user.is_password?(password)
      return user
    end

    nil
  end

  def password=(plain_password)
    @password = plain_password
    self.password_digest = BCrypt::Password.create(plain_password)
  end

  def is_password?(plain_password)
    BCrypt::Password.new(self.password_digest).is_password?(plain_password)
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end
end
