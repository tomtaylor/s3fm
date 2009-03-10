require 'rubygems'
require 'sinatra'
require 'playlist'
require 'json'

before do
  if options.environment.to_sym == :production && request.host != 's3fm.co.uk'
    redirect "http://s3fm.co.uk" + request.path_info
  end
end

get '/' do
  haml :index
end

get '/:playlist' do
  begin
    @playlist = Playlist.new(params[:playlist])
    case params[:format]
    when 'json'
      content_type 'application/json'
      @playlist.mp3s(params[:order]).to_json
    when nil
      haml :playlist
    else
      status 415
    end
  rescue
    haml :not_found
  end
end

post '/bucketredirect' do
  redirect "/#{params[:bucket]}"
end