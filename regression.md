# Regression Testing
Serves to ensure that new changes have not introduced new bugs in older programming.

Note: unit tests are automatically regression tests (just another benefit of TDD).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [CSS Visual Regression Testing](#css-visual-regression-testing)
  - [BackstopJS](#backstopjs)
    - [Installing](#installing)
    - [backstop.json](#backstopjson)
    - [Flags](#flags)
    - [Cross-browser testing](#cross-browser-testing)
    - [.gitignore](#gitignore)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## CSS Visual Regression Testing
> “Breaking CSS is easy, testing it is hard”

General idea is about **comparing test screenshots to a set of reference screenshots** (source of truth created previously).


### [BackstopJS](https://garris.github.io/BackstopJS/)
BackstopJS automates visual regression testing of responsive web UI by comparing DOM screenshots over time.

#### [Installing](https://github.com/garris/BackstopJS#installation)

```Shell
npm install [-g] backstopjs

# Generate backstop.json
backstop genConfig
```

#### backstop.json

##### id
The unique name of config file. Used to manage and name files.

##### viewports
###### Useful resolution info:

- [Global Web Stats](https://www.w3counter.com/globalstats.php)
- [Screen resolution stats Worldwide](http://gs.statcounter.com/screen-resolution-stats)
- [Liveinternet Stats](http://www.liveinternet.ru/stat/us/resolutions.html?period=month)
- [A quick reference for iOS devices.](http://iosres.com/)

###### Example:
```json
{
    "viewports": [
        {
            "name": "nHD",
            "width": 360,
            "height": 640
        },
        {
            "name": "iPhone 7",
            "width": 375,
            "height": 667
        },
        {
            "name": "VGA / 480p",
            "width": 480,
            "height": 640
        },
        {
            "name": "XGA (Extended Graphics Array)",
            "width": 1024,
            "height": 768
        },
        {
            "name": "HD",
            "width": 1280,
            "height": 720
        },
        {
            "name": "WXGA (Wide Extended Graphics Array)",
            "width": 1366,
            "height": 768
        },
        {
            "name": "FHD (Full HD) 21-27",
            "width": 1920,
            "height": 1080
        }
    ]
}
```

##### scenarios
Each scenario is a test for a specific static page or global app state.

It includes the URLs and element selectors to test (each selector will be screenshoted and tested).

Selectors accept standard CSS notation and a magic selector `document` for entire document to be tested.

##### Workflow
```Shell
# Create source of truth from current app state
backstop reference
# Compare current app state to the source of truth (reference)
backstop test
```

#### Flags
```Shell
# Custom config file with relative path
backstop [reference/test] --configPath=backstopTests/someTest.json

# Incremental scenario reference/testing
backstop [reference/test] --i

# Run only for specific scenarios
## --filter argument takes a regEx string
backstop [reference/test] --i --filter=<scenario.label>
````

#### Cross-browser testing
By now is achieved with `engine` selection in `backstop.json`:

1. PhantomJS uses webkit (more or less Chrome)
2. SlimerJS uses Gecko (more or less Firefox).

Also, keep track of that issues: [#183](https://github.com/garris/BackstopJS/issues/183),
[#274](https://github.com/garris/BackstopJS/issues/274).

#### .gitignore
In case of excluding tests results:
```
backstop_data/bitmaps_test
backstop_data/html_report
```
