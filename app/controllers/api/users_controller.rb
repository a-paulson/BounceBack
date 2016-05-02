class Api::UsersController < ApplicationController
  def show
    @user = current_user
    if @user.nil?
      #@errors = ["You are not logged in."]
      @errors = []
      render :errors, status: 404
    end
  end
end
