<p align="center"><img src="https://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/logo.png" width="150" alt="Samp launcer Logo"></p>

## About Samp Launcer

A mobile launcher that allows online play in GTA SA (SA-MP). It can download game resources, server monitoring, client updates, news feed, complete launcher customization, and display of donations."

## Screenshots

<p align="center">
<img src="https://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/2024-02-28%2013.06.41.jpg" width="150" alt="Screenshot 1">
<img src="https://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/2024-02-28%2013.07.30.jpg" width="150" alt="Screenshot 2">
<img src="https://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/Screenshot_20240228-124455.png" width="150" alt="Screenshot 4"></p>
<p align="center">
<img src="https://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/Screenshot_20240228-124514.png" width="150" alt="Screenshot 5">
<img src="https://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/Screenshot_20240228-125046.png" width="150" alt="Screenshot 6">
<img src="hhttps://github.com/penteleichuk/Samp-Launcer/blob/main/assets/images/Screenshot_20240228-131041.png" width="150" alt="Screenshot 7"></p>

## Getting Started

### Pre-reqs

1. Rename `.env.example` to `.env`
2. Provide the necessary parameters.

### Game cache

1. Download [download cache](https://drive.google.com/file/d/1M4eNTUPSe12QgJgOd9wmyZiFbMk7PqJs/view?usp=sharing)
2. Upload the files to your hosting.

### Installation

Open a Terminal in the project root and run...

Install all dependencies:

```shell
yarn install
```

### Running on Android

```shell
yarn android
```

### Running on release

```shell
cd android && ./gradlew bundleRelease
```

### Generate APK

```shell
cd android && ./gradlew assembleRelease
```
