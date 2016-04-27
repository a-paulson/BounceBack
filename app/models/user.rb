class User < ActiveRecord::Base
  validates :username, :fname, :lname, :email, :user_type, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 8, allow_nil: true}
  validates :email, :username, :session_token, uniqueness: true

  has_many(:messages,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :Message)

  has_many :conversation_users
  has_many :conversations, through: :conversation_users

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.guest_user
    username = nil
    while(username.nil? || User.find_by(username: username))
      username = "Guest" + rand(10000).to_s.rjust(4, "0")
    end
    guest_user = User.create!(username: username, fname: "guest", lname: "guest",
                              email: username, user_type: "guest", password_digest: "guest")
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
