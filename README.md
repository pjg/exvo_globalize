# Exvo Globalize

Rails gem providing universal I18n support for your application. Supports I18n of both your normal Ruby/Rails app (based on the i18n gem) as well as javascript using a custom i18n library.

Ruby/Rails features:

* additional database backed I18n backend to store the translations
* in-memory caching of database backed translations
* pluralization rules for 108 languages (`config/locales/plurals.rb`)
* localization rules for 51 languages (`config/locales/*.(yml|rb)`)
* locale fallback support (will search for translation using `I18n.default_locale` when not found using requested locale)
* web UI to view your application’s translations (`/globalize/translations`)

Javascript features:

* all translations defined in `config/locales/*` are available in javascript
* localization support for dates, times, numbers, currencies (localization rules are read from `config/locales/*.(yml|rb)`)
* locale fallback support (will search for translation using `I18n.default_locale` when not found using requested locale)
* global t() and l() helpers to translate and localize phrases, respectively
* does not depend on any other external javascript library


This gem also integrates your application with [Globalize](http://store.exvo.com/apps/shops/globalize/items/globalize-125). Globalize is a service for website owners, who want to translate their websites into multiple languages by using human (as opposed to machine/automatic) translators.



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
t("hello")
=> "Hello world!"
```

The above, of course, expects you to have the `:hello` key for the current `I18n.locale` in one of your `config/locales/*.yml` files.


The following I18n features are supported in javascript:


### Locale fallback

If there is no translation in the desired `locale`, there will be another check performed to see if there is a translation available in the `default_locale`. If there is, display it.

By default, when including two javascript tags in your application (see installation notes), you will have translations in the desired locale merged with translations for the default_locale available in the javascript.


### Localization

All standard I18n keys (see `config/locales/*` in this gem’s directory) are used for various localization rules. Examples follows (for `:en` locale).


#### Numbers

```js
I18n.toNumber(1234)
=> "1,234.000"

l("number", 1234)
=> "1,234.000"
```

#### Percentages

```js
I18n.toPercentage(1234)
=> "1234.000%"

l("percentage", 1234)
=> "1234.000%"
```

#### Currencies

```js
I18n.toCurrency(12)
=> "12,00 USD"

l("currency", 12)
=> "12,00 USD"
```


#### Numbers in human sizes

```js
I18n.toHumanSize(1024)
=> "1KB"
```


#### Dates and times

```js
// uses ERB Ruby interpolation
I18n.strftime(I18n.parseDate("<%= Time.now %>"), "%Y/%m/%d %H:%M")
=> "2011/09/14 12:03"

// uses formats from `config/locale/en.yml` file
I18n.l("date.formats.default", "Wed Sep 14 12:03:11 +0200 2011")
=> "2011-09-14"

I18n.l("date.formats.long", "2011-09-14")
=> "September 14, 2011"
```

See `spec/javascripts/exvo_globalize_i18n_spec.js` for all available localization forms.



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

In order to fully integrate this gem with Globalize, after installing it you need to [register your application](http://store.exvo.com/apps/shops/globalize/items/globalize-125) and order some translations (Globalize should automatically detect the gem installation and should let you choose the JSON translations option).

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



## Running the tests

Running tests via `Guard` is the recommended way:

```bash
$ bundle exec guard
```

But tests can be run separately as well:

```bash
$ bundle exec rspec spec
```

and

```bash
$ jasmine-headless-webkit -c
```

There is a [great guide](http://johnbintz.github.com/jasmine-headless-webkit/) for setting up `jasmine-headless-webkit` in your OS if you have problems with it.



## Copyrights

[exvo_globalize](https://github.com/Exvo/exvo_globalize/) is based on the following projects:

* [i18n](https://github.com/svenfuchs/i18n)
* [rails-i18n](https://github.com/svenfuchs/rails-i18n/)
* [babilu](https://github.com/toretore/babilu)
* [i18n-js](https://github.com/spider-network/i18n-js)


Copyright © 2011 Exvo.com Development BV, released under the MIT license
