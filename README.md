## jquery-git ($.git)
jQuery Extension to easily display a user's GitHub repositories
```javascript

// Specify a reference element, it doesn't really matter what the selector is
$('#jquery-git').git({
    username: 'benderTheCrime'
});

// Username is the only real requirement, other options are listed below:
var opts = {
    username:   'benderTheCrime',
    exclude:    [],                     // Leave out some of the default fields: name, updatedAt, description
    include:    [],                     // Include additional information from the GitHub repositories endpoint
    limit:      10,                     // Limit the number of repos added to div
    limitText:  'test'                  // Text to appear in the link back to the Owner's GitHub page, does nothing if no limit property or not enough repos
};