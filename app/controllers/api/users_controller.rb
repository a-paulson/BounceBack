class Api::UsersController < ApplicationController
  def show
    @user = current_user
    if @user.nil?
      #@errors = ["You are not logged in."]
      @errors = []
      render :errors, status: 404
    end
  end

  def search_index
    @users = User.where("id != ?", [current_user.id])
    render :search_index
  end
end
