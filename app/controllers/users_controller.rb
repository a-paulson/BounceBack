class UsersController < ApplicationController

  def new
    if current_user
      redirect_to app_url
    else
      render :new
    end
  end

  def create
    @user = User.new(user_params)
    @user.user_type = "user"
    if @user.save
      login!(@user)
      redirect_to app_url
    else
      @errors = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = current_user
    if @user.nil?
      #@errors = ["You are not logged in."]
      @errors = []
      render :errors, status: 404
    end
  end

  def guest
    @user = User.guest_user
    login!(@user)
    redirect_to app_url
  end

  private

  def user_params
    params.require(:user).permit(:username, :fname, :lname, :email, :user_type, :password)
  end
end
