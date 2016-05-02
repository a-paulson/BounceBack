class SessionsController < ApplicationController

  def new
    if current_user
      redirect_to app_url
    else
      render :new
    end
  end

  def create
    @user = User.find_by_credentials(params["user"]["username"],
                                     params["user"]["password"])

    if @user.nil?
      @errors = ["Your username or password is incorrect."]
      render :new
    else
      login!(@user)
      redirect_to app_url
    end
  end

  def destroy
    @user = current_user;
    logout!
    redirect_to app_url
  end
end
