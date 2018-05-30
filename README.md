# React form validation component

Componente que genera un formulario especificando cada fieldset y cada field con validaciones específicas.

## Estructura

El código se divide en dos partes - la librería y documentación(demo). Ambas están escritas en ES6 y JSX, para luego ser transpiladas por Babel pero de diferentes formas.

### Transpilación de la librería

The library source code, which is located in `src/lib`, is transpiled with Babel but is _not_ bundled with Webpack. Bundling is completely unnecessary, since the developer who will in the end use your library for their application will bundle their entire codebase, which includes your library. More importantly, if your library has any dependencies, bundling them together with your code would be a disaster since it could cause duplication and therefore larger final bundle size. The components still have to be transpiled since many developers have Webpack configured to not transpile their node_modules folder. Some may not be using JSX or ES6 at all, and would therefore be unable to transpile your component.

# Instalación

`npm install react-form-validizr`