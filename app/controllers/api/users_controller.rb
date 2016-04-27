class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      @errors = @user.errors.full_messages
      render :errors, status: 400
    end
  end

  def show
    @user = current_user
    if @user.nil?
      #@errors = ["You are not logged in."]
      @errors = []
      render :errors, status: 400
    end
  end

  def guest
    @user = User.guest_user
    login!(@user)
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :fname, :lname, :email, :user_type, :password)
  end
end