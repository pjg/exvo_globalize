class GlobalizeApp

  attr_reader :request_host

  def initialize(request_host)
    @request_host = request_host
  end

  def updated_translations_available?
    # TODO fetch_translations and sha1 compare them with database stored sha1 of previously fetched translations
    true
  end

  # returns a Hash with translations: { "en" => { "intro" => "Introduction" } }
  def fetch_translations
    resp = HTTParty.get(translations_uri)
    if resp.response.is_a?(Net::HTTPOK)
      resp.parsed_response
    else
      {}
    end
  end

  private

  def globalize_host
    Rails.env.production? || ENV['GLOBALIZE_USE_PRODUCTION_SERVER'] == 'true' ? "globalize.exvo.com" : "globalize.exvo.co"
  end

  def translations_uri
    "http://#{globalize_host}/translations.json?host=#{@request_host}"
  end

end
