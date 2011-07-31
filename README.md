# Exvo Globalize

This plugin lets you make use of the Globalize app (http://globalize.exvo.com/)
to handle the translation of your Rails app into multiple languages.


## Installation

Install the gem

```bash
$ gem install exvo_globalize
```

add it to the Gemfile

```ruby
gem 'exvo_globalize'
```

bundle

```bash
$ bundle
```

and generate the database migration

```bash
$ rails generate exvo_globalize
```


Is is advised to have your `/globalize/` actions behind an authorization barrier (besides `/globalize/translations.json`, which is by default publicly accessible).
Create a `config/initializers/exvo_globalize.rb` file with similar contents:

```ruby
I18n::Backend::GlobalizeStore.authenticator = proc {
  authenticate_user!
  require_admin!
}
```

`authenticate_user!` and `require_admin!` are just exemplary authorization actions.



Copyright © 2011 Exvo.com Development BV, released under the MIT license
