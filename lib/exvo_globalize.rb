require "exvo_globalize/version"
require "exvo_globalize/backend/chain"
require "exvo_globalize/backend/globalize_store"
require "exvo_globalize/backend/simple"

# Make it a Rails engine
module ExvoGlobalize
  require 'exvo_globalize/engine' if defined?(Rails) && Rails::VERSION::MAJOR == 3
end
