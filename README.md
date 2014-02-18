StepBar
=======

Clean step bar that shows you where you are in the order progress

![Preview stepbar](http://andersonba.com/stepbar/stepbar.jpg)

So, why not check out a [demo](http://andersonba.com/stepbar)?

General
=======
To get started using StepBar, simply include ```stepbar.min.js``` and ```stepbar.min.css``` on your page. Add the ```stepbar``` class in the target element and define steps passing JSON object in ```data-steps```, see example:

    <div class="stepbar" data-steps='["Start", "Step 2", "Step 3", "Step 4", "Completed"]'></div>
    
This will load the stepbar object into the global window object for you. The StepBar comes with a simple API with which you can manage steps.

- ```stepbar.step(idx)``` - Changes current step
- ```stepbar.getCurrentStep()``` - Gets the current step number
- ```stepbar.prev()``` - Goes back one step
- ```stepbar.next()``` - Goes next one step
- ```stepbar.start()``` - Goes to first step, reseting the stepbar
- ```stepbar.complete()``` - Goes to last step, ending the stepbar


Credits
=======
Design inspired by [Adi Pintilie](http://dribbble.com/shots/716707-Progress-bar?list=show&tag=order_steps)