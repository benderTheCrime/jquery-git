(function() {
    'use strict';

    var d = document;

    $.fn.git = function(options) {

        // Without a username, cannot lookup repos
        var me = this,
            opts = typeof options !== 'object' ? {} : options,
            username = opts.username,
            data = opts.data || 'repos',
            uri = [
                'https://api.github.com/users',
                username,
                data
            ].join('/'),
            exclude = opts.exclude || [],
            include = opts.include || [],
            limit = !isNaN(opts.limit) ? opts.limit : undefined,
            err;

        if (!username) {
            throw new Error('$.git: Cannot get information without a username');
        }

        // Add an error message to the div
        err = $(
            '<div class="jquery-git-error">No GitHub repos found for ' +
            username + '</div>'
        );
        me.append(err);

        // Get the repositories
        $.getJSON(uri, function(data) {
            if (data && data.length) {
                err.remove();
                var html = '',
                    dataLengthLimited = false;

                // Check to see if a limit has been set
                if (limit && data.length > limit) {
                    data = data.slice(0, limit);
                    dataLengthLimited = true;
                }

                $(data).each(function(i, v) {
                    var date = new Date(v.updated_at);
                    html += '<a class="jquery-git-repo-link" href="' +
                    v.html_url + '" target="_blank">' +
                        (
                            exclude.indexOf('name') > -1 ?
                                '' : '<h3>' + v.name + '</h3>'
                        ) +
                        (
                            exclude.indexOf('updatedAt') > -1 ?
                                '' : '<i>Last Updated: ' + [
                                    date.getMonth() + 1,
                                    date.getDate(),
                                    date.getFullYear()
                                ].join('/') + ' ' + [
                                    date.getHours() > 12 ?
                                        date.getHours() - 12 : date.getHours(),
                                    date.getMinutes()
                                ].join(':') +
                                (date.getHours() > 12 ? 'PM' : 'AM') +
                                '</i>'
                        ) +
                        (
                            v.description && exclude.indexOf('description') > -1 ?
                                '' : '<div>' + v.description + '</div>'
                        );
                    $(include).each(function(i, w) {
                        html += '<span>' + (v[ w ] || '') + '</span>';
                    });
                    html += '</a>';
                });

                if (dataLengthLimited) {
                    html += '<a class="jquery-git-owner-link" href="' +
                    data[ 0 ].owner.html_url + '" target="_blank">' + (
                        opts.limitText || 'See More Here!'
                    ) +'</a>';
                }

                me.append(html);
            }
        }).error(function() {
            console.warn(
                '$.git: Repositories cannot be fetched while not connected to the internet.'
            );
        });

        return this;
    };
})();