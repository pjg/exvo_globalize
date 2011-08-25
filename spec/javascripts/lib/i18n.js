var I18n = I18n || {};
I18n.locale = I18n.locale || 'en';
I18n.translations = I18n.translations || {"new":"new","deselect_all":"Deselect all","number":{"format":{"separator":".","precision":3,"delimiter":",","strip_insignificant_zeros":false,"significant":false},"human":{"format":{"precision":3,"delimiter":"","significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"kb":"KB","tb":"TB","gb":"GB","byte":{"one":"Byte","other":"Bytes"},"mb":"MB"}},"decimal_units":{"format":"%n %u","units":{"trillion":"Trillion","quadrillion":"Quadrillion","billion":"Billion","million":"Million","unit":"","thousand":"Thousand"}}},"percentage":{"format":{"delimiter":""}},"currency":{"format":{"format":"%u%n","unit":"$","separator":".","precision":2,"delimiter":",","significant":false,"strip_insignificant_zeros":false}},"precision":{"format":{"delimiter":""}}},"sign_up":"Sign Up","resubscribe":"Resubscribe","profiles":{"edit":{"send_exvo_newsletter":"Send Exvo Newsletter?","send_daily_local_deals":"Send Daily Local Deals?","preferred_language":"Preferred language","send_daily_task_updates":"Send Daily Task Updates?","title":"My Account","change_your_password":"Change Your Password","new_password":"New Password","change_your_details":"Change Your Details","view_account_balance":"View Your Account Balance","send_account_news":"Send Account News?","new_password_confirmation":"New Password Confirmation","send_daily_club_deals":"Send Daily Club Deals?"}},"activerecord":{"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","taken":"has already been taken"},"template":{"body":"There were problems with the following fields:","header":{"one":"1 error prohibited this %{model} from being saved","other":"%{count} errors prohibited this %{model} from being saved"}}}},"remember_me":"Remember Me?","confirm":"Confirm","cancel":"Cancel","forgotten_your_password":"Forgotten Your Password?","nickname":"Nickname","from":"from","upload":"Upload","time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","short":"%d %b %H:%M","long":"%B %d, %Y %H:%M"},"pm":"pm"},"done":"Done","errors":{"messages":{"not_found":"not found","not_locked":"was not locked","greater_than_or_equal_to":"must be greater than or equal to %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","confirmation":"doesn't match confirmation","not_an_integer":"must be an integer","blank":"can't be blank","exclusion":"is reserved","invalid":"is invalid","odd":"must be odd","even":"must be even","wrong_length":"is the wrong length (should be %{count} characters)","too_short":"is too short (minimum is %{count} characters)","empty":"can't be empty","already_confirmed":"was already confirmed","less_than":"must be less than %{count}","greater_than":"must be greater than %{count}","equal_to":"must be equal to %{count}","too_long":"is too long (maximum is %{count} characters)","accepted":"must be accepted","not_a_number":"is not a number","inclusion":"is not included in the list"},"format":"%{attribute} %{message}","dynamic_format":"%{message}"},"admin":{"actions":{"exported":"exported","delete":"delete","deleted":"deleted","create":"create","updated":"updated","export":"export","update":"update","created":"created"},"new":{"required":"Required","save_and_edit":"Save and edit","chose_all":"Choose all","cancel":"Cancel","optional":"Optional","clear_all":"Clear all","down":"Down","up":"Up","save":"Save","save_and_add_another":"Save and add another","one_char":"character.","select_choice":"Select your choice(s) and click","basic_info":"Basic info","chosen":"Chosen %{name}","many_chars":"characters or fewer."},"list":{"delete_action":"Delete","edit_action":"Edit","show_all":"Show all","delete_selected":"Delete selected","select_action":"Select","export_action":"Export current view","add_new":"Add new","export_selected":"Export selected","select":"Select %{name} to edit","search":"Search"},"history":{"name":"History","no_activity":"No Activity","page_name":"History for %{name}"},"dashboard":{"name":"Dashboard","model_name":"Model name","add_new":"Add new","pagename":"Site administration","modify":"Modify","records":"Records","show":"Show","ago":"ago","last_used":"Last used"},"delete":{"confirmation":"Yes, I'm sure","flash_confirmation":"%{name} was successfully destroyed"},"credentials":{"log_out":"Log out"},"flash":{"noaction":"No actions were taken","successful":"%{name} was successfully %{action}","error":"%{name} failed to be %{action}"},"export":{"confirmation":"Export to %{name}","options_for":"Options for %{name}","fields_from_associated":"Fields from associated %{name}","csv":{"col_sep":"Column separator","header_for_root_methods":"%{name}","encoding_to":"Encode to","header_for_association_methods":"%{name} [%{association}]","col_sep_help":"Leave blank for default ('%{value}')","default_col_sep":",","skip_header":"No header","encoding_to_help":"Choose output encoding. Leave empty to let current input encoding untouched: (%{name})","skip_header_help":"Do not output a header (no fields description)"},"display":"Display %{name}: %{type}","fields_from":"Fields from %{name}","empty_value_for_associated_objects":"<empty>","select":"Select fields to export"}},"payments":"Payments","date":{"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"],"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"formats":{"default":"%Y-%m-%d","short":"%b %d","long":"%B %d, %Y"},"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},"change":"change","newsletters":{"unsubscribe":{"title":"Unsubscribed Successfully","success_unsubscribed":"You have successfully unsubscribed from Exvo Emails","you_can_resubscribe":"You can resubscribe at any time in the future"}},"devise":{"failure":{"unauthenticated":"","invalid":"Invalid email or password.","timeout":"Your session expired, please sign in again to continue.","inactive":"Your account was not activated yet.","unconfirmed":"You have to confirm your account before continuing.","locked":"Your account is locked.","invalid_token":"Invalid authentication token."},"passwords":{"new":{"title":"Recover Your Password"},"edit":{"title":"Change Your Password"},"send_instructions":"You will receive an email with instructions about how to reset your password in a few minutes.","updated":"Your password was changed successfully. You are now signed in."},"mailer":{"unlock_instructions":{"subject":"Unlock Instructions"},"reset_password_instructions":{"subject":"Reset password instructions"},"confirmation_instructions":{"subject":"Confirmation instructions"}},"unlocks":{"unlocked":"Your account was successfully unlocked. You are now signed in.","send_instructions":"You will receive an email with instructions about how to unlock your account in a few minutes."},"registrations":{"destroyed":"Bye! Your account was successfully cancelled. We hope to see you again soon.","updated":"You updated your account successfully.","signed_up":"You have signed up successfully. If enabled, a confirmation was sent to your e-mail."},"sessions":{"new":{"title":"Login with Your Exvo ID","popout":"It\u2019s Free and Easy!","message":"Login with an account from:"},"signed_out":"Signed out successfully.","signed_in":"Signed in successfully."},"confirmations":{"confirmed":"Your account was successfully confirmed. You are now signed in.","send_instructions":"You will receive an email with instructions about how to confirm your account in a few minutes."}},"support":{"array":{"words_connector":", ","last_word_connector":", and ","two_words_connector":" and "}},"accounts":"Account","import":"Import","save":"Save","emails":{"sites_description":"A  revolutionary way to browse the web. Navigate to your fav sites and  then add them as shortcuts. They are then accessible from any device.  Just one URL away!","live_free":"Live Free","books_description":"Start  reading all the classics anywhere in the world. Books are presented in a  gorgeous reader. When you are finished a book you can read your fav  magazines.","welcome_header":"Thanks for signing up!","welcome_body":"It's time to get started! Use your email and password to login.","music_description":"You  have a lot of songs. Some are on your iPod, some are on your computer.  Having your collection online removes the need to sync so you can enjoy  your music.","invitation_message":"Signing up is easy. Just enter your email and a password and you are ready to go.","inbox_description":"We  all get lots of messages. Inbox is the place to store them. You can  favourite messages well as sorting them into any amount of folders you  want.","change_your_password":"Change Your Password","company_description":"Simply  the best way to start your own company. Setting up a new company is  simple and free, browse the Store for your type of company and click  'Start Company'","university_description":"Whether you need to brush up on your skills or want to start a whole new career, University has you covered. Learn at your pace anywhere in the world.","they_go_anywhere":"They go anywhere. Like you.","quick_register_header":"Thanks for signing up!","globalize_description":"Let  your websites 'speak the world'. Globalizing can now be a standard step  in launching any site, a no-brainer with regards to costs. Market  websites to the world.","all_your_fav_things":"We want all your favourite things to be free from devices, operating systems, browsers or locations.","your_password_wont_change_until":"Your password won't change until you access the link above and create a new one.","sent_by_exvo":"This message was sent to you by Exvo.com where your have a registered account.","free_and_fun":"It's Free and Fun","docs_description":"Some  files you just need access to wherever you are. Docs makes that simple.  Just upload your files. They can then be viewed wherever you are.","apps_description":"Using  web apps couldn't be simpler. Browse our Apps Store and find a wide  range of  free and paid web apps. They can be used the second you  activate them.","hello":"Hello","pics_description":"Pics  is the best app for storing your photos online. Just upload your them.  You can share them with friends and family or display them in the  Gallery for the world to see.","invitation_header":"has Invited you to Join Exvo","someone_has_requested":"Someone has requested a link to change your password, and you can do this through the link below.","contacts_description":"Everyone  has lots of friends, family members, and colleges. These details are  important so you need one place to store it all, thats accessible  anywhere.","believe_in_freedom":"At Exvo we believe in freedom.","videos_description":"Need  to catch up on that latest episode or got some spare time to watch your  fav flick? Sit back and relax with Videos. The one place to watch all  your videos.","teams_description":"Teams  is the best way to do what you love. Browse the Store to apply for  Skills and Positions. After that, check your Dashboard to see if there  any new tasks.","quick_register_body":"Your login is %{login} & your password is: %{password}","ignore_this_email":"If you didn't request this, please ignore this email.","games_description":"Kick  off your shoes, crack those knuckles, and get your game on. Play all  your favourites right in your web browser with your saved games  available everywhere.","welcome_to_exvo":"Welcome to Exvo"},"notifications":"Notifications","i18n":{"plural":{"keys":["one","other"],"rule":{}}},"try_again":"Try Again","recover":"Recover","select_all":"Select All","next":"Next","registrations":{"new":{"create_new_account":"Create a New Exvo Account","title":"Sign Up","info_music":"Your Song Anywhere","accounts_from":"Sign up with an account from","info_apps":"Web Apps for Everyone","terms_conditions":"View Terms & Conditions","info_pics":"Your Pics Anywhere","accept_terms":"Accept Terms","hint":"Click on the arrows to find out more","info_sites":"Your Bookmarks Everywhere","message":"Just some of the things you get when you sign up"}},"invitations":{"import_from_vcard":"Import from a Multi vCard","import_from_another_service":"Import from Another Service","emails_are_separated":"Emails are separated by spaces.","title":"Select your contacts to import","extra_storage":"1 GB extra storage for both you and your friend for each  friend that successfully signs up","import_contacts":"Import Contacts","every_dollar":"For every dollar that your friends spend, you get 5% of it to spend on whatever you want.","tell_your_friends":"Tell Your Friends","copy_paste_url":"Copy and paste this URL to refer anyone","twitter_message":"I've just joined Exvo.com. Get Your Personal Cloud too","try_another_service":"Try Another Service","referrer_url":"Referrer URL","no_concats_found":"No Contacts found for this","contacts_successfully_imported":{"one":"1 Contact successfully imported","other":"%{count} Contacts successfully imported"},"inviting_allows":"Inviting your friends to Exvo allows the both of you to receive a special offer","finish_and_start":"Finish and Start Using Exvo","import_title":"Import and Invite Your Friends","no_contacts_imported":"No contacts imported","type_emails":"To add email addresses, just type them in the box."},"login":"Login","helpers":{"submit":{"submit":"Save %{model}","create":"Create %{model}","update":"Update %{model}"},"select":{"prompt":"Please select"}},"continue":"Continue","home":{"name":"home"},"password":"Password","datetime":{"prompts":{"minute":"Minute","second":"Seconds","month":"Month","hour":"Hour","day":"Day","year":"Year"},"distance_in_words":{"less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_seconds":{"one":"1 second","other":"%{count} seconds"},"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"x_months":{"one":"1 month","other":"%{count} months"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"half_a_minute":"half a minute"}},"email":"Email"};

var t = (function(key, options) {
  return search_translation.t(key, options)
})

var search_translation = (function() {
    // Replace {{foo}} with obj.foo
    function interpolate(string, object) {
        return string.replace(/\{\{([^}]+)\}\}/g, function() {
            return object[arguments[1]] || arguments[0];
        });
    };

    // Split "foo.bar" to ["foo", "bar"] if key is a string
    function keyToArray(key) {
        if(!key) {
            return [];
        }
        if(typeof key != "string") {
            return key;
        }
        return key.split('.');
    };

    // Looks up a translation using an array of strings where the last
    // is the key and any string before that define the scope. The
    // current locale is always prepended and does not need to be
    // provided. The second parameter is an array of strings used as
    // defaults if the key can not be found. If a key starts with ":"
    // it is used as a key for lookup. This method does not perform
    // pluralization or interpolation.
    function lookup(keys, defaults) {
        var i = 0, value = I18n.translations;
        defaults = (typeof defaults === "string") ? [defaults] : (defaults || []);
        while(keys[i]) {
            value = value && value[keys[i]];
            i++;
        }
        if(value) {
            return value;
        } else {
            if(defaults.length === 0) {
                return null;
            } else if (defaults[0].substr(0,1) === ':') {
                return lookup(keys.slice(0, keys.length - 1).concat(keyToArray(defaults[0].substr(1))), defaults.slice(1));
            } else {
                return defaults[0];
            }
        }
    };

    // Returns other when 0 given
    function pluralize(value, count) {
        if(count === undefined) return value;
        return count === 1 ? value.one : value.other;
    };

    // Works mostly the same as the Ruby equivalent, except there are
    // no symbols in JavaScript, so keys are always strings. The only
    // time this makes a difference is when differentiating between
    // keys and values in the defaultValue option. Strings starting
    // with ":" will be considered to be keys and used for lookup,
    // while other strings are returned as-is.
    function translate(key, options) {
        if(typeof key != "string") {
            // Bulk lookup
            var a = [], i;
            for(i = 0; i < key.length; i++) {
                a.push(translate(key[i], options));
            }
            return a;
        } else {
            options = options || {};
            options.defaultValue = options.defaultValue || null;
            key = keyToArray(options.scope).concat(keyToArray(key));
            var value = lookup(key, options.defaultValue);
            if(typeof value !== "string" && value) {
                value = pluralize(value, options.count);
            }
            if(typeof value === "string") {
                value = interpolate(value, options);
            }
            return value;
        }
    }

    return {
        translate: translate,
        t: translate
    };
})();