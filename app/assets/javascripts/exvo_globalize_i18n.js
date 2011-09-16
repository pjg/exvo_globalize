//
// exvo_globalize_i18n.js
// Version: 0.5.0
//
(function() {

  I18n = {};

  var interpolatePattern = /%\{([^}]+)\}/g;

  // Replace %{foo} with obj.foo
  function interpolate(str, obj) {
    return str.replace(interpolatePattern, function() {
      return typeof obj[arguments[1]] == 'undefined' ? arguments[0] : obj[arguments[1]];
    });
  };

  //Check if an Array contains an object
  function isInArray(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
  };

  // Split "foo.bar" to ["foo", "bar"] if key is a string
  function keyToArray(key) {
    if (!key) return [];
    if (typeof key != "string") return key;
    return key.split('.');
  };

  function locale() {
    return I18n.locale || I18n.defaultLocale;
  };

  I18n.isValidNode = function(obj, node) {
    // local undefined variable in case another library corrupts window.undefined
    var undef;
    return obj[node] !== null && obj[node] !== undef;
  };

  // Merge serveral hash options, checking if value is set before
  // overwriting any value. The precedence is from left to right.
  //
  // I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
  // #=> {name: "John Doe", role: "user"}
  I18n.prepareOptions = function() {
    var options = {};
    var opts;
    var count = arguments.length;

    for (var i = 0; i < count; i++) {
      opts = arguments[i];

      if (!opts) {
        continue;
      }

      for (var key in opts) {
        if (!this.isValidNode(options, key)) {
          options[key] = opts[key];
        }
      }
    }

    return options;
  };

  // Works mostly the same as the Ruby equivalent, except there are
  // no symbols in JavaScript, so keys are always strings. The only time
  // this makes a difference is when differentiating between keys and values
  // in the defaultValue option. Strings starting with ":" will be considered
  // to be keys and used for lookup, while other strings are returned as-is.
  I18n.translate = function(key, opts) {
    if (typeof key != "string") { // Bulk lookup
      var a = [], i;
      for (i=0; i<key.length; i++) {
        a.push(this.translate(key[i], opts));
      }
      return a;
    } else {
      opts = opts || {};
      opts.defaultValue = opts.defaultValue || null;
      key = keyToArray(opts.scope).concat(keyToArray(key));
      var value = this.lookup(locale(), key, opts.defaultValue);

      // fall back to I18n.default_locale for missing translations
      if (value == null && I18n.locale != I18n.default_locale) value = this.lookup(I18n.default_locale, key, opts.defaultLocale);

      if (typeof value != "string" && value) value = this.pluralize(value, opts.count);
      if (typeof value == "string") value = interpolate(value, opts);
      if (value == null) value = this.missingTranslation(key)
      return value;
    }
  };

  I18n.t = I18n.translate;

  // Looks up a translation using an array of strings where the last
  // is the key and any string before that define the scope. The current
  // locale is always prepended and does not need to be provided. The second
  // parameter is an array of strings used as defaults if the key can not be
  // found. If a key starts with ":" it is used as a key for lookup.
  // This method does not perform pluralization or interpolation.
  I18n.lookup = function(locale, keys, defaults) {
    var i = 0, value = this.translations[locale];
    defaults = typeof defaults == "string" ? [defaults] : (defaults || []);
    while (keys[i]) {
      value = value && value[keys[i]];
      i++;
    }
    if (value) {
      return value;
    } else {
      if (defaults.length == 0) {
        return null;
      } else if (defaults[0].substr(0,1) == ':') {
        return this.lookup(locale, keys.slice(0, keys.length - 1).concat(keyToArray(defaults[0].substr(1))), defaults.slice(1));
      } else {
        return defaults[0];
      }
    }
  };

  I18n.localize = function(scope, value) {
    switch (scope) {
      case "currency":
        return this.toCurrency(value);
      case "number":
        scope = this.lookup(locale(), ["number", "format"]);
        return this.toNumber(value, scope);
      case "percentage":
        return this.toPercentage(value);
      default:
        if (scope.match(/^(date|time)/)) {
          return this.toTime(scope, value);
        } else {
          return value.toString();
        }
    }
  };

  I18n.l = I18n.localize;

  I18n.parseDate = function(d) {
    var matches, date;
    matches = d.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ |T](\d{2}):(\d{2}):(\d{2}))?(Z)?/);

    if (matches) {
      // date/time strings: yyyy-mm-dd hh:mm:ss or yyyy-mm-dd or yyyy-mm-ddThh:mm:ssZ
      for (var i = 1; i <= 6; i++) {
        matches[i] = parseInt(matches[i], 10) || 0;
      }

      // month starts on 0
      matches[2] -= 1;

      if (matches[7]) {
        date = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6]));
      } else {
        date = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6]);
      }
    } else if (typeof(d) == "number") {
      // UNIX timestamp
      date = new Date();
      date.setTime(d);
    } else {
      // an arbitrary javascript string
      date = new Date();
      date.setTime(Date.parse(d));
    }

    return date;
  };

  I18n.toTime = function(scope, d) {
    var date = this.parseDate(d);
    var format = this.lookup(locale(), keyToArray(scope));

    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }

    if (!format) {
      return date.toString();
    }

    return this.strftime(date, format);
  };

  I18n.strftime = function(date, format) {
    var options = this.lookup(locale(), ["date"]);

    if (!options) {
      return date.toString();
    }

    // get meridian from ":time" i18n key
    options.time = this.lookup(locale(), ["time"]);
    if (!options.time || !options.time.am || !options.time.pm) {
      options.time = { am: "AM", pm: "PM" };
    }

    var weekDay = date.getDay();
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var hour = date.getHours();
    var hour12 = hour;
    var meridian = hour > 11 ? "pm" : "am";
    var secs = date.getSeconds();
    var mins = date.getMinutes();
    var offset = date.getTimezoneOffset();
    var absOffsetHours = Math.floor(Math.abs(offset / 60));
    var absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60);
    var timezoneoffset = (offset > 0 ? "-" : "+") + (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) + (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes);

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    var padding = function(n) {
      var s = "0" + n.toString();
      return s.substr(s.length - 2);
    };

    var f = format;
    f = f.replace("%a", options.abbr_day_names[weekDay]);
    f = f.replace("%A", options.day_names[weekDay]);
    f = f.replace("%b", options.abbr_month_names[month]);
    f = f.replace("%B", options.month_names[month]);
    f = f.replace("%d", padding(day));
    f = f.replace("%-d", day);
    f = f.replace("%H", padding(hour));
    f = f.replace("%-H", hour);
    f = f.replace("%I", padding(hour12));
    f = f.replace("%-I", hour12);
    f = f.replace("%m", padding(month));
    f = f.replace("%-m", month);
    f = f.replace("%M", padding(mins));
    f = f.replace("%-M", mins);
    f = f.replace("%p", options.time[meridian]);
    f = f.replace("%S", padding(secs));
    f = f.replace("%-S", secs);
    f = f.replace("%w", weekDay);
    f = f.replace("%y", padding(year));
    f = f.replace("%-y", padding(year).replace(/^0+/, ""));
    f = f.replace("%Y", year);
    f = f.replace("%z", timezoneoffset);

    return f;
  };

  I18n.toNumber = function(number, options) {
    options = this.prepareOptions(
      options,
      this.lookup(locale(), ["number", "format"]),
      {precision: 3, separator: ".", delimiter: ",", strip_insignificant_zeros: false}
    );

    var negative = number < 0;
    var string = Math.abs(number).toFixed(options.precision).toString();
    var parts = string.split(".");

    number = parts[0];
    var precision = parts[1];

    var n = [];

    while (number.length > 0) {
      n.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length -3);
    }

    var formattedNumber = n.join(options.delimiter);

    if (options.precision > 0) {
      formattedNumber += options.separator + parts[1];
    }

    if (negative) {
      formattedNumber = "-" + formattedNumber;
    }

    if (options.strip_insignificant_zeros) {
      var regex = {
          separator: new RegExp(options.separator.replace(/\./, "\\.") + "$")
        , zeros: /0+$/
      };

      formattedNumber = formattedNumber
        .replace(regex.zeros, "")
        .replace(regex.separator, "");
    }

    return formattedNumber;
  };

  I18n.toCurrency = function(number, options) {
    options = this.prepareOptions(
      options,
      this.lookup(locale(), ["number", "currency", "format"]),
      this.lookup(locale(), ["number", "format"]),
      {unit: "$", precision: 2, format: "%u%n", delimiter: ",", separator: "."}
    );

    number = this.toNumber(number, options);
    number = options.format
      .replace("%u", options.unit)
      .replace("%n", number);

    return number;
  };

  I18n.toHumanSize = function(number, options) {
    var kb = 1024
      , size = number
      , iterations = 0
      , unit
      , precision
    ;

    while (size >= kb && iterations < 4) {
      size = size / kb;
      iterations += 1;
    }

    if (iterations === 0) {
      unit = this.t("number.human.storage_units.units.byte", {count: size});
      precision = 0;
    } else {
      unit = this.t("number.human.storage_units.units." + [null, "kb", "mb", "gb", "tb"][iterations]);
      precision = (size - Math.floor(size) === 0) ? 0 : 1;
    }

    options = this.prepareOptions(
      options,
      {precision: precision, format: "%n%u", delimiter: ""}
    );

    number = this.toNumber(size, options);
    number = options.format
      .replace("%u", unit)
      .replace("%n", number);

    return number;
  };

  I18n.toPercentage = function(number, options) {
    options = this.prepareOptions(
      options,
      this.lookup(locale(), ["number", "percentage", "format"]),
      this.lookup(locale(), ["number", "format"]),
      {precision: 3, separator: ".", delimiter: ""}
    );

    number = this.toNumber(number, options);
    return number + "%";
  };

  // Pluralization function
  I18n.pluralize = function(value, count) {
    if (typeof count != 'number') return value;
    return I18n.plurals[I18n.locale](value, count);
  };

  // Default pluralization rules
  I18n.default_pluralization_rule = function(value, count) {
    return count == 1 ? value.one : value.other;
  }
  I18n.other_default_pluralization_rule = function(value, count) {
    return count == 1 || count == 0 ? value.one : value.other;
  }

  // Pluralization Rules for each language
  I18n.plurals = {
    "af": I18n.default_pluralization_rule,
    "am": I18n.other_default_pluralization_rule,
    "ar": function(value,  count) {
      if (typeof count != 'number') return value;
      return count == 0 ? value.zero : count == 1 ? value.one : count == 2 ? value.two : isInArray([3, 4, 5, 6, 7, 8, 9, 10], count % 100) ? value.few : isInArray([3, 4, 5, 6, 7, 8, 9, 10], count % 100) ? value.few : isInArray([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99], count % 100) ? value.many : value.other;
    },
    "az": function(value, count) { return value.other},
    "be": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one : isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : valye.other;
    },
    "bg": I18n.default_pluralization_rule,
    "bh": I18n.default_pluralization_rule,
    "bn": I18n.default_pluralization_rule,
    "bo": function(value, count) { return value.other},
    "bs": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one : isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : value.other;
    },
    "ca": I18n.default_pluralization_rule,
    "cs": function(value, count) { return count == 1 ? value.one : isInArray([2,3,4], count) ? value.few : value.other },
    "cy": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : count == 8 || count == 11 ? value.many : value.other },
    "da": I18n.default_pluralization_rule,
    "de": I18n.default_pluralization_rule,
    "dz": function(value, count) { return value.other },
    "el": I18n.default_pluralization_rule,
    "en": I18n.default_pluralization_rule,
    "eo": I18n.default_pluralization_rule,
    "es": I18n.default_pluralization_rule,
    "et": I18n.default_pluralization_rule,
    "eu": I18n.default_pluralization_rule,
    "fa": function(value, count) { return value.other },
    "fi": I18n.default_pluralization_rule,
    "fil": I18n.other_default_pluralization_rule,
    "fo": I18n.default_pluralization_rule,
    "fr": function(value, count) { return count && count != 2 ? value.one : value.other },
    "fur": I18n.default_pluralization_rule,
    "fy": I18n.default_pluralization_rule,
    "ga": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other },
    "gl": I18n.default_pluralization_rule,
    "gu": I18n.default_pluralization_rule,
    "guw": I18n.other_default_pluralization_rule,
    "ha": I18n.default_pluralization_rule,
    "he": I18n.default_pluralization_rule,
    "hi": I18n.other_default_pluralization_rule,
    "hr": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one : isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : value.other
    },
    "hu": function(value, count) { return value.other },
    "id": function(value, count) { return value.other },
    "is": I18n.default_pluralization_rule,
    "it": I18n.default_pluralization_rule,
    "iw": I18n.default_pluralization_rule,
    "ja": function(value, count) { return value.other },
    "jv": function(value, count) { return value.other },
    "ka": function(value, count) { return value.other },
    "km": function(value, count) { return value.other },
    "kn": function(value, count) { return value.other },
    "ko": function(value, count) { return value.other },
    "ku": I18n.default_pluralization_rule,
    "lb": I18n.default_pluralization_rule,
    "ln": I18n.other_default_pluralization_rule,
    "lt": function(value, count) {
      return count % 10 == 1 && !  isInArray([11, 12, 13, 14, 15, 16, 17, 18, 19], count % 100) ? value.one : isInArray([2, 3, 4, 5, 6, 7, 8, 9], count % 10) && ! isInArray([11, 12, 13, 14, 15, 16, 17, 18, 19], count % 100) ? value.few : value.other
    },
    "lv": function(value, count) { return count == 0 ? value.zero : count % 10 == 1 && count % 100 != 11 ? value.one : value.other },
    "mg": I18n.default_pluralization_rule,
    "mk": function(value, count) { return count % 10 == 1 ? value.one : value.other },
    "ml": I18n.default_pluralization_rule,
    "mn": I18n.default_pluralization_rule,
    "mo": function(value, count) { return count ==1 ? value.one : count == 0 ? value.few : value.other },
    "mr": I18n.default_pluralization_rule,
    "ms": function(value, count) { return value.other },
    "mt": function(value, count) {
      return count == 1 ? value.one : count == 0 || isInArray([2,3,4,5,6,7,8,9,10], count % 100) ? value.few : isInArray([11,12,13,14,15,16,17,18,19], count % 100) ? value.many : value.other;
    },
    "my": function(value, count) { return value.other },
    "nah": I18n.default_pluralization_rule,
    "nb": I18n.default_pluralization_rule,
    "ne": I18n.default_pluralization_rule,
    "nl": I18n.default_pluralization_rule,
    "nn": I18n.default_pluralization_rule,
    "no": I18n.default_pluralization_rule,
    "nso": I18n.other_default_pluralization_rule,
    "or": I18n.default_pluralization_rule,
    "pa": I18n.default_pluralization_rule,
    "pap": I18n.default_pluralization_rule,
    "pl": function(value, count) {
      return count == 1 ? value.one : isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : value.other;
    },
    "ps": I18n.default_pluralization_rule,
    "pt": I18n.other_default_pluralization_rule,
    "pt-PT": I18n.default_pluralization_rule,
    "ro": function(value, count) { return count == 1 ? value.one : count == 0 ? value.few : value.other},
    "ru": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one : isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : value.other;
    },
    "se": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other},
    "sh": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one : isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : value.other;
    },
    "sk": function(value, count) { return count == 1 ? value.one : isInArray([2,3,4], count) ? valuer.few : value.other; },
    "sl": function(value, count) { return count % 100 == 1 ? value.one : count % 100 == 2 ? value.two :  isInArray([3,4], count % 100) ? value.few : value.other},
    "sma": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other },
    "smi": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other },
    "smj": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other },
    "smn": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other },
    "sms": function(value, count) { return count == 1 ? value.one : count == 2 ? value.two : value.other },
    "so": I18n.default_pluralization_rule,
    "sq": I18n.default_pluralization_rule,
    "sr": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one : isInArray([2,3,4], count % 10) && ! isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : value.other;
    },
    "sv": I18n.default_pluralization_rule,
    "sw": I18n.default_pluralization_rule,
    "ta": I18n.default_pluralization_rule,
    "te": I18n.default_pluralization_rule,
    "th": function(value, count) { return value.other },
    "ti": I18n.other_default_pluralization_rule,
    "tk": I18n.default_pluralization_rule,
    "tl": I18n.other_default_pluralization_rule,
    "to": function(value, count) { return value.other},
    "tr": function(value, count) { return value.other},
    "uk": function(value, count) {
      return count % 10 == 1 && count % 100 != 11 ? value.one :  isInArray([2,3,4], count % 10) && !isInArray([12,13,14], count % 100) ? value.few : count % 10 == 0 || isInArray([5,6,7,8,9], count % 10) || isInArray([11,12,13,14], count % 100) ? value.many : value.other;
    },
    "ur": I18n.default_pluralization_rule,
    "vi": function(value, count) { return value.other},
    "wa": I18n.other_default_pluralization_rule,
    "yo": function(value, count) { return value.other},
    "zh": function(value, count) { return value.other},
    "zu": I18n.default_pluralization_rule
  }

  // Returns '[missing translation: "en.missing"]' when translation is not found
  I18n.missingTranslation = function(key) {
    var message = '[missing translation: "' + locale();
    for (var i in key) {
      message += "." + key[i];
    }
    return message += '"]';
  };

})();

var t = (function(key, options) {
  return I18n.t(key, options);
});

var l = (function(scope, value) {
  return I18n.l(scope, value);
});
