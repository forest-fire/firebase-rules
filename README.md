# Firebase Rules

> Make your Firebase database rules readable and scalable. Using only typescript/javascript.

This library was forked from [firebase-toolbelt/firebase-rules](https://github.com/firebase-toolbelt/firebase-rules) and converted to Typescript. Subtle parts of the API
have been improved to allow for greater flexibility. Also, most of the exposed API is now
provided as function rather than just static constants.

## Table of Contents

- [Firebase Rules](#firebase-rules)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Helpers](#helpers)
    - [Conditions](#conditions)
      - [ifOrElse](#iforelse)
      - [anyCondition](#anycondition)
      - [everyCondition](#everycondition)
    - [CRUD](#crud)
    - [Authorization](#authorization)
    - [Common](#common)
      - [Data](#data)
      - [Props](#props)
      - [Validation](#validation)
      - [Indexing](#indexing)
      - [User Defined String](#user-defined-string)
      - [Transformers](#transformers)
  - [New Data Root](#new-data-root)
  - [Testing](#testing)

## Getting Started

The best way to understand how it works it's just by using it. Let's try it out in this quick demo.
Let's create some rules for an app that let users create their own 'user' object and then create/update their own posts.

The database should look something like this:

```json
{
  "users": {
    "$userId": {
      "firstName": "John"
    }
  },
  "posts": {
    "$postId": {
      "title": "My post title.",
      "body": "My post body.",
      "createdAt": "timestamp",
      "createdBy": "$userId"
    }
  }
}
```

Let's first create our rules related to the user object.
The user must be able to create and update his profile.
Other users must be able to see his profile.
No users are ever removed from our app.

```typescript
// ./rules/modules/users.js

import {
  isAuth,
  isAuthId,
  newDataExists,
  hasChildren,
  isString,
  validate,
  ifCondition
} from 'firebase-rules';

const isUserAndIsNotRemoving = ifCondition(
  newDataExists(),
  isAuthId('$userId'),
  false
);

export default {
  'users/$userId': {
    read: isAuth,
    write: isUserAndIsNotRemoving,
    validate: hasChildren('firstName')
  },
  'users/$userId/firstName': validate(isString),
  'users/$userId/$invalidProp': validate(false)
});
```

Next we can build our post object rules.
Any user can create posts. Only the post's creator may update or remove it.
Posts can be read by any of our app's users.

```typescript
// ./rules/modules/posts.js

import {
  isAuth,
  isAuthId,
  isString,
  isNow,
  newProp,
  hasChildren,
  validate
} from 'firebase-rules/helpers/common';

export default {
  'posts/$postId': {
    read: isAuth,
    write: isAuthId(newProp('createdBy')),
    validate: hasChildren('title', 'body', 'createdAt', 'createdBy')
  },
  'posts/$postId/title': validate(isString),
  'posts/$postId/body': validate(isString),
  'posts/$postId/createdAt': validate(isNow),
  'posts/$postId/createdBy': validate(isAuthId(newData)),
  'posts/$postId/$invalidProp': validate(false)
};
```

Now let's export this rules so we can import them to firebase.

```typescript
import { createRule } from 'firebase-rules';
import { users, posts } from './modules';

createRules({
  ...users,
  ...posts
}, 'database.rules.json');
```

Done! There is now a file named `database.rules.json` in our app's root folder.
We can now upload our app to Firebase using their CLI or even upload our file manually using their website.

## Helpers

We include many helpers that are commonly used when building a firebase ruleset.
**Keep in mind that we're only generating strings. So you can quickly create helpers of your own. Check out our helpers source code, they're so simple it's ridiculous.**

### Conditions

Using our conditions helpers will make writing your code more like writing normal code logic.

#### ifOrElse

If the first condition is true, the second condition is checked.
If the first condition is false, the third condition is checked.
It works much like a ternary operator.

If the third condition is not provided, it defaults to 'false'.

```javascript
ifOrElse(
  ifUserIsAuth,
  alsoCheckIfHeIsValid,
  otherwiseCheckOtherCondition
)
```

#### anyCondition

Any of the passed conditions must be true for the rule to be accepted.
**It might also receive an array instead of a list of arguments**.

```typescript
anyCondition(
  thisMustBeTrue,
  OR_thisMustBeTrue,
  OR_atLeastThisMustBeTrue,
  ...
)
```

#### everyCondition

Any of the passed conditions must be true for the rule to be accepted.
**It might also receive an array instead of a list of arguments**.

```typescript
everyCondition(
  thisMustBeTrue,
  AND_thisTooMustBeTrue,
  AND_thisMustAlsoBeTrue,
  ...
)
```

### CRUD

Our CRUD helpers makes it easy to check for different rules in case of create/update/delete situations.

```typescript
onCreate( checkIfAllChildrenArePresent ),
onUpdate( checkIfNoRequiredChildrenAreRemoved ),
onDelete( checkIfUserCanDeleteThis )
```

> Note that `onDelete` is not called on `validate` rules since firebase bypasses validations on null values.

### Authorization

Functions include:

```typescript
isLoggedIn()
isUser(uid: string)
hasCustomClaim(claim: string)
customClaimValue(claim: string, value: scalar, child?: string)
customClaimContains(claim: string, value: scalar, child?: string)
hasEmail()
emailMatches(regEx: string)
hasVerifiedEmail()
hasPhoneNumber()
```

So if you wanted to ensure all logged in users can _read_ but you
can only _write_ to posts which you own:

```typescript
{
  'posts/$userId/$postId': {
    read: isLoggedIn(),           // 'auth.uid != null',
    write: isUser('$userId')      // 'auth.uid == $userId'
  }
}
```

### Common

We also provide a lot of common snippets so you won't have to redo the basics.

#### Data

```typescript
data(child?: string)
isValue(value: string | number | boolean, childPath?: string)
dataExists(child?: string)
dataDoesNotExist(child?: string)

newData(child?: string)
isNewValue(value: string | number | boolean, childPath?: string)
newDataExists(child?: string)
newDataDoesNotExist(child?: string)
```

e.g. the path can only be created but not updated

```typescript
$path:
  write: everyCondition( dataIsEmpty, newDataExists )
  // data.val() == null && newData.val() != null
```

#### Props

```typescript
child(path: string)
newChild(path: string)
hasChildren(...children: string[])
```

e.g. a post can only be created with all required fields filled. the createdBy must hold the userId.

```javascript
post:
  write: everyCondition(
    hasChildren('title', 'body', 'createdBy'),
    isAuthId(newProp('createdBy'))
  )
  // newData.hasChildren(['title', 'body', 'createdBy']) && newData.child('createdBy').val() == auth.uid
```

#### Validation

```javascript
validate(conditions)

isString(child?: string)
isNumber(child?: string)
isInteger(child?: string)
isBoolean(child?: string)

isBefore(timestamp: number)
isAfter(timestamp: number)
```

A lot of paths will only hold validation rules so there's a short-hand function that helps with that.

```typescript
const rules = {
  "posts/$postId/title":     validate(isString())
  "posts/$postId/likes":     validate(isNumber())
  "posts/$postId/archived":  validate(isBoolean())
  "posts/$postId/createdAt": validate(isBefore(23434364))
  "posts/$postId/createdBy": validate(isUser(data()))
}
```

#### Indexing

```typescript
indexOn(...properties: string[])
```

e.g. indexing some children for optimized querying

```typescript
{
  "posts/$postId":
    indexOn: ['createdAt', 'createdBy']
}
```

#### User Defined String

```typescript
s('something') // '\'something\''
```

Since we're dealing with an object that will be turned to a json, sometimes it's useful escaping user defined strings so they're not mistaken for variables by the firebase rules parser. This is normally used when passing a user defined string to a function like so:

```typescript
const userExists = (userId: string) => `root.child('users').child(${userId}).exists()`;

userName('$userId') // `root.child('users').child($userId).exists()`
userName('123')     // `root.child('users').child(123).exists()` -> ERROR -> `123` is not a valid variable
userName(s(123))    // `root.child('users').child('123').exists()`
```

#### Transformers

```typescript
toData(input: string | function)
toNewData(input: string | function)
```

There will be a time you will want to duplicate a rule so it checks both data and newData.
This transformers will help you building code without having to duplicate it in these situations.

```typescript
const userExists = (userId) => `root.child('users').child(${userId}).exists()`;
const userWillExist = toNewData(userExists);

userExists(child('createdBy')) // root.child('users').child(data.child('createdBy').val()).exists()
userWillExist('$userId') // newDataRoot().child(newData.child('createdBy').val()).exists()
```

See the `newDataRoot()` that appears on the output above? Read below to understand it better.

## New Data Root

Turns out you can't really use the `root` variable when you're dealing with the data that is
being added to your database. This can be a bit of a pain when you're defining reusable rules 
that will be used on a lot of different paths.

Let me show you what I mean.

```typescript
{
  "users/$userId/numberOfPosts":
    validate: 'root.child('posts').child('$userId').numChildren() == newData.val()'
}
```

The above code would work perfectly if you are increasing the `user/numberOfPosts` prop *after* you've already created the post on the database. But if you're creating the post at the same time you're updating this counter it would not really work. `root` can't be used in the context of the data that is being added. To solve this you would have to do something like this:

```typescript
{
  "users/$userId/numberOfPosts":
    validate: 'newData.parent().parent().child('posts').child('$userId').numChildren() == newData.val()'
}
```

Messy, right? Not only that, you won't be able to reuse any rule throughout your application because things may be at different depths, so they will require a different number of `parent()` to be called.

Fear not. We've got your back. While we're parsing your rules, we will check for a special keyword `newDataRoot()` and we will replace it with the correct code regarding the path you're using it. Let's see it in action.

```typescript
const numberOfPosts = userId => `newDataRoot().child('posts').child(${userId}).numChildren()`;
const rules = {
  "users/$userId":
    validate: `${numberOfPosts('$userId')} == newData.child('numberOfPosts').val()'
  // 'newData.parent().child('posts').child('$userId').numChildren() == newData.val()'
  
  "users/$userId/numberOfPosts":
    validate: `${numberOfPosts('$userId')} == newData.val()'
  // 'newData.parent().parent().child('posts').child('$userId').numChildren() == newData.val()'
}
```

This is *really* useful when you're creating data on multiple locations that depend on each other.

## Testing

We recommend using the excelent [targaryen](https://github.com/goldibex/targaryen) library for testing your firebase rules without reaching for the server. Using it with **firebase-rules** is extremelly easy as you can generate your rules as an object instead of creating them on a file by just omitting the filename when calling the `createRules` function.

```typescript
import targaryen from 'targaryen';
const chai, { expect } = require('chai');
chai.use(targaryen);

const createRules = require('firebase-rules');
const { anyCondition } = require('firebase-rules/helpers/conditions');

/**
 * You can retrieve your rules as an object
 * by just omitting the filename argument.
 */
const myFirebaseRules = createRules({
  '/my/path': {
    validate: anyCondition(
      `newData.val() == 'a'`,
      `newData.val() == 'b'`
    )
  }
});

/**
 * an object representing your firebase data
 */
const myFirebaseData = {};

/**
 * Now you can test your rules!
 */

describe('my firebase rules tests', function() {

  before(function() {
    targaryen.setFirebaseData(myFirebaseData);
    targaryen.setFirebaseRules(myFirebaseRules);
  });

  it('should only allow 'a' or 'b' values to be written to `/my/path`', function() {
    expect(null).can.write('a').to.path('/my/path');
    expect(null).cannot.write('c').to.path('/my/path');
  })

});
```

---

Made with ♥ by [Georges Boris](https://georgesboris.com)
Converted to Typescript by [Ken Snyder](https://ken.net)
