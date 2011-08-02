Factory.define :example, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key  'example'
  u.value 'This is an example'
end

Factory.define :title, :class => GlobalizeTranslation do |u|
  u.locale 'en'
  u.key  'title'
  u.value 'This is a title'
end

Factory.define :title_pl, :class => GlobalizeTranslation do |u|
  u.locale 'pl'
  u.key  'title'
  u.value 'To jest tytuł'
end
