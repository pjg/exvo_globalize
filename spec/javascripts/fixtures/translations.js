I18n.locale = 'en'
I18n.default_locale = 'en'

I18n.translations = {
  en: {

    hello: "Hello %{name}!",
    world: "World",

    contact: {
      one: "1 Contact",
      other: "%{count} Contacts"
    },

    page: {
      footer: "Footer",
      title: "Title",

      intro: {
        heading: "Heading"
      }
    }
  },

  fr: {
    contact: {
      one: "%{count} contact",
      other: "%{count} contacts"
    }
  },

  pl: {
    date: {
      formats: {
        "default": "%d-%m-%Y",
        "short": "%d %b",
        "long": "%B %d, %Y"
      },
      day_names: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"],
      abbr_day_names: ["nie", "pon", "wto", "śro", "czw", "pia", "sob"],
      month_names: [null, "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
      abbr_month_names: [null, "sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
      order: ["day", "month", "year"]
    },
    time: {
      formats: {
        "default": "%a, %d %b %Y %H:%M:%S %z",
        "short": "%d %b %H:%M",
        "long": "%B %d, %Y %H:%M"
      },
      am: "przed południem",
      pm: "po południu"
    },
    number: {
      format: {
        separator: ",",
        delimiter: " ",
        precision: 3,
        significant: false,
        strip_insignificant_zeros: false
      },
      currency: {
        format: {
          format: "%u %n",
          unit: "PLN",
          separator: ",",
          delimiter: " ",
          precision: 2,
          significant: false,
          strip_insignificant_zeros: true
        }
      },
      percentage: {
        format: {
          delimiter: "",
          separator: ",",
          precision: 2
        }
      },
      precision: {
        format: {
          delimiter: ""
        }
      },
      human: {
        format: {
          delimiter: "",
          precision: 3,
          significant: true,
          strip_insignificant_zeros: true
        },
        storage_units: {
          format: "%n %u",
          units: {
            byte: {
              one:   "bajt",
              few: "bajty",
              many: "bajty"
            },
            kb: "KB",
            mb: "MB",
            gb: "GB",
            tb: "TB"
          }
        }
      }
    },

    world: "Świat",

    contact: {
      one: "1 Kontakt",
      few: "%{count} Kontakty",
      other: "%{count} Kontaktów"
    }
  },

  pt: {
    contact: {
      one: "%{count} Contato",
      other: "%{count} Contatos"
    }
  }
}
