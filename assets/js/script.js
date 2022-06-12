const $ = function(selector) {
    return new $.prototype.init(selector);
};

$.prototype.init = function(selector) {
    if (!selector) {
        return this; // {}
    }

    if (selector.tagName) {
        this[0] = selector;
        this.length = 1;
        return this;
    }

    Object.assign(this, document.querySelectorAll(selector));
    this.length = document.querySelectorAll(selector).length;
    return this;
};

$.prototype.init.prototype = $.prototype;

window.$ = $;


$.prototype.click = function(handler) {
    for (let i = 0; i < this.length; i++) {
        if (handler) {
            this[i].addEventListener('click', handler);
        } else {
            this[i].click();
        }
    }
    return this;
};


$.prototype.fadeIn = function(dur, display, fin) { //Д.З.4-8
    
    for (let i = 0; i < this.length; i++) {
        this.fadeInBody(dur, display, fin, i);
        console.log(2222);
    }

    return this;
};


$.prototype.fadeOut = function(dur, fin) { //Д.З.4-8
    
    for (let i = 0; i < this.length; i++) {
        this.fadeOutBody(dur, fin, i);
    }

    return this;
};


$.prototype.fadeToggle = function(dur, display, fin) { //Д.З.4-8
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            this.fadeInBody(dur, display, fin, i);
        } else {
            this.fadeOutBody(dur, fin, i);
        }
    }
    return this;
};


$.prototype.fadeInBody = function(dur, display, fin, i) { //Д.З.4-8
    this[i].style.display = display || 'block';
    const _fadeIn = (complection) => {
        this[i].style.opacity = complection;
    };
    const ani = this.animateOverTime(dur, _fadeIn, fin);
    requestAnimationFrame(ani);
    return this[i];
}


$.prototype.fadeOutBody = function(dur, fin, i) { //Д.З.4-8
    const _fadeOut = (complection) => {
        this[i].style.opacity = 1 - complection;
        if (complection === 1) {
            this[i].style.display = 'none';
        }
    };
    const ani = this.animateOverTime(dur, _fadeOut, fin);
    requestAnimationFrame(ani);
    return this[i];
}


$.prototype.animateOverTime = function(dur, cb, fin) {
    let timeStart;
    function _animateOverTime(time) {
        if (!timeStart) {
            timeStart = time;
        }
        let timeElapsed = time - timeStart;
        let complection = Math.min(timeElapsed / dur, 1);

        cb(complection);

        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === 'function') {
                fin();
            }
        }
    }
    return _animateOverTime;
};



$.prototype.dropdown = function() {
    for (let i = 0; i < this.length; i++) {
        const id = this[i].getAttribute('id'); //вариант урока
        // const id = this[i].getAttribute('id').replace(/(-?(\D+\.\D+)|(\D+))/, ''); //("drop:26.2_d5").replace выдает 26.2_d5
        // console.log(id);
        $(this[i]).click(() => {
            $(`[data-toggle-id="${id}"]`).fadeToggle(800);
        });
    }
};

$('.navbar').dropdown();






