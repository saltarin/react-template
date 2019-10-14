### CAUTION
* [TYPESCRIPT AND BABEL](https://iamturns.com/typescript-babel/)
```text
It’s not a perfect marriage.
According to the announcement post, there are four TypeScript features that do not compile in Babel due to its single-file emit architecture.
Don’t worry, it ain’t so bad. And TypeScript will warn against these issues when the isolatedModules flag is enabled.
1) Namespaces.

Solution: don’t use them! They’re outdated. Use the industry standard ES6 modules (import / export) instead. The recommended tslint rules ensure namespaces are not used.
2) Casting a type with the<newtype>x syntax.

Solution: Use x as newtype instead.
3) Const enums.

This is a shame. Need to resort to regular enums for now.

4) Legacy-style import / export syntax.

Examples: import foo = require(...) and export = foo.
In all my years of TypeScriptin’ I’ve never come across this. Who codes this way? Stop it!
```