class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params["user"]["username"],
                                     params["user"]["password"])

    if @user.nil?
      @errors = ["Your username or password is incorrect."]
      render :errors, status: 400
    else
      login!(@user)
      redirect_to api_user_url
    end
  end

  def destroy
    @user = current_user;
    logout!
  end

  # private
  #
  # def session_params
  #   [params[:user][:username], params[:user][:password]]
  # end
end
