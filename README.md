# Objects!
## A simple object oriented language for creating graphical objects

[See live demo here](https://chriswainformatik.github.io/objects/)

This is supposed to be an educational application students can use to practice object oriented style commands.

Class and method names are German.

Available commands are:
 - `objectName:CLASSNAME` to create an object with a given name from a given class
 - `objectName.methodName(...)` to call methods provided by objects
  
Available lasses are:
 - `RECHTECK`
 - `DREIECK`
 - `KREIS`

### TODO:
 - change delay to velocity on ui
 - code completion
 - show created objects (as in BlueJ)
 - class cards
 - fix bugs:
   - change of triangle size also changes border size; maybe use canvas on top of div for this: canvas for drawing shapes, div for drawing grid
   - changing position of triangles doesn't work the expected way 
   