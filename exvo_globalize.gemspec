# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)

require "exvo_globalize/version"

Gem::Specification.new do |s|
  s.name        = "exvo_globalize"
  s.version     = ExvoGlobalize::VERSION
  s.authors     = ["Paweł Gościcki"]
  s.email       = ["pawel.goscicki@gmail.com"]
  s.homepage    = "https://github.com/Exvo/exvo_globalize"
  s.summary     = 'Rails gem to translate your app into multiple languages using Globalize web app'
  s.description = 'It exposes `/globalize/translations.json` with JSON of all translations in the app'

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.licenses = ['MIT']

  s.add_dependency 'rails', ['>= 3.0.0']
  s.add_dependency 'i18n', ['~> 0.5.0']
  s.add_dependency 'haml', ['>= 3.0.0']
  s.add_dependency 'awesome_print', ['>= 0.3.2']
  s.add_dependency 'ya2yaml', ['>= 0.30']
  s.add_dependency 'httparty', ['>= 0.6.1']
  s.add_development_dependency 'guard', ['>= 0.5.0']
  s.add_development_dependency 'guard-rspec', ['>= 0.4.0']
  s.add_development_dependency 'sqlite3', ['>= 1.3']
  s.add_development_dependency 'rspec', ['>= 2.6']
  s.add_development_dependency 'rspec-rails', ['>= 2.6']
  s.add_development_dependency 'factory_girl_rails', ['>= 1.1.0']
  s.add_development_dependency 'shoulda-matchers', ['>= 1.0.0.beta3']
  s.add_development_dependency 'capybara', ['>= 1.0.0']
  s.add_development_dependency 'json', ['>= 1.5.1']
end
