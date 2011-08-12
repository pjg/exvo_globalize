# encoding: utf-8

Factory.define :i18n_header, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key    'header'
  u.value  'This is a header'
end

Factory.define :i18n_nested_header, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key    'nested.header'
  u.value  'This is a nested header'
end

Factory.define :i18n_title, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key    'title'
  u.value  'This is a title'
end

Factory.define :i18n_title_pl, :class => GlobalizeTranslation do |u|
  u.locale 'pl'
  u.key    'title'
  u.value  'To jest tytuł'
end
