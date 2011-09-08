# Exvo Globalize

This gem lets you make use of the Globalize app (http://globalize.exvo.com/)
to handle the translation of your Rails app into multiple languages.



## Requirements

Rails 3.0+



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

finally generate the database migration and the javascript library:

```bash
$ rails generate exvo_globalize:install
```

If you don’t plan on using I18n in javascript you can just delete the generated `public/javascripts/exvo_globalize_i18n.js` file.


It is advised to have your `/globalize/` actions behind an authorization barrier (besides `/globalize/translations.json` and `/globalize/translations/js/*.js`, which are by default publicly accessible).
Create a `config/initializers/exvo_globalize.rb` file with similar contents:

```ruby
I18n::Backend::GlobalizeStore.authenticator = proc {
  authenticate_user!
  require_admin!
}
```

`authenticate_user!` and `require_admin!` are just exemplary authorization actions.



### Javascript support

Basic support for I18n in the javascript is included. In order for it to work you need to include two javascript files in your application’s layout (the order is important):

```ruby
= javascript_include_tag 'exvo_globalize_i18n'
= i18n_translations_javascript_include_tag(I18n.locale)
```


Now you can use translations inside your javascript:

```js
t("new")
=> "New"
```

The above, of course, expects you to have the `:new` key for the current `I18n.locale` in one of your `config/locales/*.yml` files.



## Getting back your database stored translations

If you wish to extract your database stored translations to a separate YAML/Ruby file, there are two rake task to help you with that:

```bash
$ bundle exec rake globalize:translations:dump:yaml
```

and

```bash
$ bundle exec rake globalize:translations:dump:ruby
```



## Globalize integration

In order to fully integrate this gem with Globalize, after installing it you need to register your application (http://globalize.exvo.com/) and order some translations (Globalize should automatically detect the gem installation and should let you choose the JSON translations option).

By default a link between your application and Globalize is established by using `request.host` by the gem. If your application’s main DNS record is a CNAME (as is the common case when using Heroku), you can set your application’s domain in the `config/initializers/exvo_globalize.rb` file:

```ruby
ENV['GLOBALIZE_REQUEST_HOST'] = 'yourawesomewebapp.com'
```

Note that this host must be the same as the one you have used when registering your application at Globalize. Otherwise updating translations will not be possible.


When Globalize translations are ready, you need to manually update them at your application by going to this url:

```
http://yourawesomewebapp.com/globalize/translations
```

And pressing `Update translations`.



Copyright © 2011 Exvo.com Development BV, released under the MIT license
