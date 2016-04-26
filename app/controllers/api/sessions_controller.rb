class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(*session_params)

    if @user.nil?
      render json: {error: "Credentials Are Wrong"}
    else
      login!(@user)
      redirect_to api_user_url
    end
  end

  def destroy

  end

  private

  def session_params
    [params[:user][:username], params[:user][:password]]
  end
end
