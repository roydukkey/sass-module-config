# sass-module-config

This Sass module is for defining immutable configuration singletons.

## Install

Install the package:

```bash
npm install sass-true
```

Use the package like any other Sass module:

```scss
@use 'sass-module-config';
```

Depending on your setup, you may need to use the module by its full path:

```scss
// This is only an example
@use '../node_modules/sass-module-config';
```

## One Setting

`$config` (Map), defaults to an empty map.

- A map which is expected to be configured when using the module.
- The map many contain values of any type, including other maps.
- There is no limit to the depth of this map.

## Usage

The following example will define a private variable for the configuration. The variable is then used to configure the `$config` variable of the `sass-module-config` module. The `$config` variable is also hidden to ensure only the `sass-module-config`'s functions are used to get configuration values.

```scss
// config.scss
$-config: (
  header: (
    width: 100%,
    height: 200px
  ),
  color: (
    text: #ddd,
    background: (
      &: #222,
      light: #fff
    )
  )
);

@forward 'sass-module-config'
  hide $config
  with ($config: $-config);

// main.scss
@use 'config';

body {
  color: config.get('color' 'text');
  background: config.get('color' 'background');
  header {
    width: config.get('header' 'width');
    height: config.get('header' 'height');
    background: config.get('color' 'background' 'light');
  }
}
```

*Notice:* The ampersand (`&`) indicates the default value for the map on which it is defined. The use of ampersand is no different than using `null` as the map key.

## Public API

#### `@function get($names)`

Gets a configured value by the specified names.

<dl>
  <dt><code>@param {String | List} $names</code></dt>
  <dd>A list of configuration names that indicate the value to be selected.</dd>
  <dt><code>@return {*}</code></dt>
  <dd>The configured value.</dd>
  <dt><code>@throw</code></dt>
  <dd>The configuration for `get(#{$names})` has not been defined.</dd>
</dl>

### Helpers

Two helpers have been provided to improve type checking and organisation of color and size values. These may be accessed at the `sass-module-config/helpers` namespace.

#### `@function color($names)`

Gets a configured color or color map by the specified names.

<dl>
  <dt><code>@param {String | List} $names</code></dt>
  <dd>A list of configuration names that indicate the color to be selected.</dd>
  <dt><code>@return {Color | Map}</code></dt>
  <dd>The configured color.</dd>
  <dt><code>@throw</code></dt>
  <dd>The configuration for `color(#{$names})` has not been defined.</dd>
  <dt><code>@throw</code></dt>
  <dd>No color or color map was found for `color(#{$names})`.</dd>
</dl>

#### `@function size($names)`

Gets a configured size or size map by the specified names.

<dl>
  <dt><code>@param {String | List} $names</code></dt>
  <dd>A list of configuration names that indicate the size to be selected.</dd>
  <dt><code>@return {Number | Map}</code></dt>
  <dd>The configured size.</dd>
  <dt><code>@throw</code></dt>
  <dd>The configuration for `size(#{$names})` has not been defined.</dd>
  <dt><code>@throw</code></dt>
  <dd>No size or size map was found for `size(#{$names})`.</dd>
</dl>

## Example with Helpers

```scss
// config.scss
$-config: (
  size: (
    header: (
      width: 100%,
      height: 200px
    )
  ),
  color: (
    text: #ddd,
    background: (
      &: #222,
      light: #fff
    )
  )
);

@forward 'sass-module-config'
  hide $config
  with ($config: $-config);

@forward 'sass-module-config/helpers'

// main.scss
@use 'config';

body {
  color: config.color('text');
  background: config.color('background');
  header {
    width: config.size('header' 'width');
    height: config.size('header' 'height');
    background: config.color('background' 'light');
  }
}
```
