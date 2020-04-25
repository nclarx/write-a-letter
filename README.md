# Write a Letter

Yet another version of an app I've been making to transcribe photographs and documents and link up transcriptions
to coordinates on an image. Have pretty much finished an Angular version of this, but want to play with React and 
see if it can produce something more light-weight and modular.

I also wanted a testing ground to see how RxJS and React play together.

## Updates

- 2020-04-21: started playing with MobX on the `test/mobx` branch to see whether it's better than using RxJS
- 2020-04-25: kind of have an unholy union of MobX and RxJS going on `test/mobx`, need to look at how the store will handle me updating items in an array and whether that causes too many re-renders

## Usage

This app won't work unless you have a Firebase Firestore database with metadata relating to images that are stored in
a Firebase Storage bucket. You would need to create your own environment file with your Firebase initialisation data.

The most interesting bits at the moment of this app are the `/hooks` and `/services` where I'm trying to wrap the 
Firebase JS SDK in observables using RxJS.

To serve the app locally:

```shell
npm start
```

Hit me up with questions at [nick@clarx.dev](mailto:nick@clarx.dev)
