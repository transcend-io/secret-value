# Why does this libary exist

This module contains a type-safe secret wrapper for Typescript Project with the aim to greatly reduce the possibility of logging sensitive data, while also explicitly marking which values in Typescript ought to be protected.

Let's jump into an example of when this might be useful: say you have a class that doesn't currently have any sensitive data that represents the results from a customer filling out a survey:

```typescript
class SurveyResults {
  constructor(
    public favoriteColor: string,
    public leastFavoritePokemon: string,
  ) {}
}
```

Some time later, you pick up a bug ticket to ask the customer for their social security number as well. Well a person's SSN is sensitive information, so it would be a good idea to keep the information out of logs if you could. How can you mark that the SSN is sensitive in such a way where you can have confidence that it will never appear in a log message, error message, or stack trace? Seeing as this class did not previously have sensitive information in it, maybe it's contents were logged somewhere. Or maybe in the future someone would log them out assuming that the class didn't have any sensitive information.

Well you could add a big 'ole comment saying `This class has sensitive information, plz don't log it ever`, but you can't always guarantee that your developers will honor that comment, if they read it at all.

Instead, you could wrap the SSN in a `Secret<T>` type that explicitly states that its value should never see the light:

```typescript
import { Secret } from "@transcend-io/secret-value";

class SurveyResults {
  constructor(
    public favoriteColor: string,
    public leastFavoritePokemon: string,
    public ssn: Secret<string>
  ) {}
}
```

Now running any variation of:

```typescript
const results = new SurveyResults("blue", "zubat", new Secret("123-45-6789"));

console.log(results);
console.log(JSON.stringify(results, null, 2));
console.log(results.valueOf())
console.log(JSON.parse(JSON.stringify(results)))
console.log(results.ssn)
console.log(results.ssn.valueOf())
console.log(results.ssn.toString())
console.log(results.ssn.toLocaleString())
console.log(JSON.stringify(results.ssn))
```

will result in `[redacted]` being displayed to STDOUT instead of the actual value `123-45-6789`

When you do actually want to use the value of the SSN in your code, you can call `.release()` to get the wrapped value back out.

```typescript
doSomethingWith(results.ssn.release())
```

## Installation

With yarn:

`yarn add @transcend-io/secret-value`

With npm:

`npm install @transcend-io/secret-value`


## API

Wrapping a secret:

```typescript
import { Secret } from 'secret-value';

const secret = new Secret('some secret value')
```

Unwrapping a secret:

```typescript
secret.release()
```

Updating a Secret value while keeping the result a secret:

```typescript
const secretLength = secret.map((rawValue) => rawValue.length)
```

Wrapping multiple values of an existing object:

```typescript
import { wrapSecrets } from 'secret-value'

const rawObject = { foo: 'bar', bazz: 'buzz', bippity: 'boppity' }
const secretified = wrapSecrets(rawObject, ['bazz', 'bippity'])
console.log(secretified) // prints { foo: 'bar', bazz: [redacted], bippity: [redacted] }
```
