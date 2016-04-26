class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      render :show
    else
      @errors = @user.errors.full_messages
      render :show
    end
  end

  def show
    @user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:username, :fname, :lname, :email, :user_type, :password)
end
