require 'rubygems'
require 'sinatra'
require 'playlist'
require 'json'

get '/' do
  haml :index
end

get '/:playlist' do
  @playlist = Playlist.new(params[:playlist])
  case params[:format]
  when 'json'
    content_type 'application/json'
    @playlist.mp3s.to_json
  when nil
    haml :playlist
  else
    status 415
  end
end