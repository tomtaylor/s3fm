require 'openssl'
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE

require 'hpricot'
require 'open-uri'

class Playlist
  
  def initialize(bucket)
    @bucket = bucket
    uri = URI.parse("https://#{bucket}.s3.amazonaws.com/")
    
    doc = Hpricot::XML(open(uri))
    all_keys = doc.search('/ListBucketResult/Contents/Key').map{ |k| k.inner_text.strip }
    @mp3s = all_keys.select{ |k| k =~ /.mp3$/i }.map { |m| uri.to_s + m }
  end
  
  def title
    @bucket
  end
  
  def mp3s(order = nil)
    case order.to_sym
    when :shuffle
      @mp3s.sort_by { |m| rand }
    when :name
      @mp3s.sort_by { |m| m.downcase }
    end
  end
  
end