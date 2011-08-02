Factory.define :i18n_example, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key  'example'
  u.value 'This is an example'
end

Factory.define :i18n_title, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key  'title'
  u.value 'This is a title'
end

Factory.define :i18n_title_pl, :class => GlobalizeTranslation do |u|
  u.locale 'pl'
  u.key  'title'
  u.value 'To jest tytuł'
end
