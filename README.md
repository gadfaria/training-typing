
# training-typing

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

Site to measure the speed and accuracy of your typing. The site was created using only the [Framer Motion](https://www.npmjs.com/package/framer-motion) library.

### Calculating Words per Minute (WPM)
In Type to Learn, because a lot of the lessons don't require typing actual words, we define a **word** as any five characters, including spaces, numbers, letters, and punctuation, but NOT function keys such as Shift or Backspace.
 
Therefore, the number of words is calculated by dividing the number of characters typed by 5. The number of **words** is then divided by the total elapsed time (in minutes). Below is the actual calculation.
 
```Total Number of Words = Total Keys Pressed / 5```

```WPM = Total Number of Words / Time Elapsed in Minutes (rounded down)``` 

Example:
```
Total Keys Pressed = 200

Time Elapsed in Minutes = 1.5

WPM = ( (200 / 5) / 1.5 ) = 26
```
### Calculating Accuracy
In Type to Learn, the Accuracy is defined as the percentage of correct keys pressed out of the total number of keys pressed. We calculate this by dividing the number of correct keys pressed by the total number of keys pressed, and multiply by 100.

Example:

```
Total Keys Pressed = 200

Correct Keys Pressed = 190

Accuracy = (190 / 200) * 100 = 95%
```


Information taken from the site: https://support.sunburst.com/hc/en-us/articles/229335208-Type-to-Learn-How-are-Words-Per-Minute-and-Accuracy-Calculated

## License
[MIT](https://choosealicense.com/licenses/mit/)

<h5 align="center">
  ☕ Code and Coffee
</h5>
