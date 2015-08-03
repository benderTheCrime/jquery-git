## jquery-github ($.git)
Populate your repos into your personal site. It's easy as pie:
```javascript

// Specify a reference element, it doesn't really matter what the selector is
$('#jquery-git').git({
    username: 'benderTheCrime'
});

// Username is the only real requirement, other options are listed below:
var opts = {
    username:   'benderTheCrime',
    exclude:    [],                 // Leave out some of the default fields: name, updatedAt, description
    include:    []                  // Include additional information from the GitHub repositories endpoint
};