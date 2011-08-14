require "exvo_globalize/version"
require "exvo_globalize/backend/chain"
require "exvo_globalize/backend/fallback"
require 'exvo_globalize/backend/flatten'
require "exvo_globalize/backend/globalize_store"
require "exvo_globalize/backend/simple"
require 'exvo_globalize/globalize_app'
require 'haml'
require 'httparty'
require 'awesome_print'
require 'ya2yaml'

# Make it a Rails engine
module ExvoGlobalize
  require 'exvo_globalize/engine' if defined?(Rails)
end
