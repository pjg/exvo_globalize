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
  s.add_dependency 'i18n', ['~> 0.6.0']
end
