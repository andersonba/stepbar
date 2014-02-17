(function(context, namespace) {

    var StepBar,
        winStepBar = context[namespace];

    // StepBar already exists
    if (winStepBar) return;

    StepBar = function() {
        var currentStep = 1,
            totalSteps = 0;

        /**
         * Resets stepbar
         * @return {StepBar} StepBar
         */
        this.reset = function() {
            this.step(1);
            return this;
        };

        this.next = function() {
            var to = currentStep + 1;
            if (to <= totalSteps) this.step(to);
        };

        this.prev = function() {
            var to = currentStep - 1;
            if (to > 0 && to <= totalSteps) this.step(to);
        };

        /**
         * Sets to specific step
         * @param  {Number} idx Number of step
         * @return {StepBar}     StepBar
         */
        this.step = function(idx) {
            var steps = document.getElementsByClassName('stepbar-step'),
                step = steps[idx - 1],
                tooltip = document.getElementsByClassName('stepbar-tooltip')[0];

            if (step === undefined) throw 'Step #' + idx + ' not found';

            // Sets elements classes
            Array.prototype.forEach.call(steps, function(el, i) {
                // Reset
                el.className = 'stepbar-step';
                // Previous sets to completed
                if (i < idx - 1 || idx == steps.length)
                    el.className += ' completed';
            });

            // Sets active
            step.className += ' active';

            // Sets tooltip text
            tooltip.innerHTML = step.getAttribute('title');

            // Sets tooltip position
            tooltip.style.left = (step.offsetWidth * (idx - 1)) - (tooltip.offsetWidth / 2) + step.offsetWidth / 2 + 'px';

            // Sets currentStep
            currentStep = idx;

            return this;
        };

        this.render = function(el) {
            var containerEl = document.createElement('div'),
                tooltipEl = document.createElement('div'),
                barEl = document.createElement('div'),
                stepEl = document.createElement('div'),
                stepsEl = document.createElement('div'),
                progressEl = document.createElement('div'),
                steps,
                i;

            // Gets steps
            steps = JSON.parse(el.getAttribute('data-steps'));
            if (!steps) return;
            totalSteps = steps.length;

            // Classes
            containerEl.className = 'stepbar-container';
            tooltipEl.className = 'stepbar-tooltip';
            barEl.className = 'stepbar-bar';
            stepEl.className = 'stepbar-step';
            stepsEl.className = 'stepbar-steps';
            progressEl.className = 'stepbar-progress';

            // Mounts steps
            for (i = 0, len = steps.length; i < len; ++i) {
                var iEl = stepEl.cloneNode(true);
                iEl.setAttribute('title', steps[i]);
                stepsEl.appendChild(iEl);
            }

            // Renders
            barEl.appendChild(stepsEl);
            barEl.appendChild(progressEl);
            containerEl.appendChild(tooltipEl);
            containerEl.appendChild(barEl);
            el.appendChild(containerEl);

            this.reset();
        };

        /**
         * Init stepbar, rendering all elements contains 'stepbar' className
         * @return {StepBar} StepBar
         */
        this.init = function() {
            var stepbars = document.getElementsByClassName('stepbar'),
                self = this;

            Array.prototype.forEach.call(stepbars, function(el) {
                self.render(el);
            });
        };
    };

    winStepBar = new StepBar();
    context[namespace] = winStepBar;

    // Initialize
    context[namespace].init();

}(window, 'stepbar'));
