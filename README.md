# LOLCODE-to-JavaScript compiler babel macro

A fully functioning LOLCODE-to-JavaScript compiler implemented as a Babel macro. You never thought you wanted this and now here it is. You’re welcome. 🐱

Let me start by proving that this crazy contraption works 👇

<a href="https://codesandbox.io/s/github/Swizec/lolcode.macro-example" target="_blank" rel="noopener noreferrer"><img style="max-width: 480px;" src="https://s3.amazonaws.com/techletter.app/screenshot-1558022421993.png" alt="Click through for source" scale="0"></a>

Here you have a CodeSandbox with the legendary FizzBuzz implemented in LOLCODE. A Babel macro compiles it to a JavaScript function at build-time and you use it as any ole JavaScript at runtime.

LOLCODE goes in 🐱
LOLCODE goes in 🐱

```lolcode
HAI
    I HAS A count ITS 1
    IM IN YR fizzbuzz UPPIN YR count TIL BOTH SAEM count AN 30
        I HAS A div ITS MOD OF count AN 3
        IT R BOTH SAEM 0 AN div
        O RLY?
            YA RLY
                VISIBLE "Fizz"
            MEBBE BOTH SAEM 0 AN MOD OF count AN 5
                VISIBLE "Buzz"
            NO WAI
                VISIBLE count
        OIC
    IM OUTTA YR fizzbuzz
KTHXBYE
```

JavaScript comes out ✌️

```javascript
var fizzbuzz = function (stdlib) {
  return function () {
    var IT;
    var count = 1;

    for (; !stdlib["BOTH SAEM"](count, 30); count++) {
      var _IT = void 0;

      var div = stdlib["MOD OF"](count, 3);
      _IT = stdlib["BOTH SAEM"](0, div);

      if (_IT) {
        var _IT2 = void 0;

        console.log("Fizz");
      } else if (stdlib["BOTH SAEM"](0, stdlib["MOD OF"](count, 5))) {
        var _IT3 = void 0;

        console.log("Buzz");
      } else {
        var _IT4 = void 0;

        console.log(count);
      }

      ;
    }

    ;
  };
}(lolcode_macro_dist_lolstdlib__WEBPACK_IMPORTED_MODULE_2__["default"]);
```

Taken from Chrome DevTools source maps. That's after Webpack and Babel do their thing. Intermediate output from `lolcode.macro` is modern JavaScript with lets and consts.

## How to use

Install from NPM

```
$ npm install lolcode.macro
```

Then import and use similarly to CSS-in-JS or GraphQL

```javascript
import { lolcode } from "lolcode.macro";
import lolstdlib from "lolcode.macro/dist/lolstdlib";

const fizzbuzz = lolcode`
HAI
    I HAS A count ITS 1
    IM IN YR fizzbuzz UPPIN YR count TIL BOTH SAEM count AN 30
        I HAS A div ITS MOD OF count AN 3
        IT R BOTH SAEM 0 AN div
        O RLY?
            YA RLY
                VISIBLE "Fizz"
            MEBBE BOTH SAEM 0 AN MOD OF count AN 5
                VISIBLE "Buzz"
            NO WAI
                VISIBLE count
        OIC
    IM OUTTA YR fizzbuzz
KTHXBYE
`;

fizzbuzz();
```

