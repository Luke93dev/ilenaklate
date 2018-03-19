        window.onload = function () {
            hideAll.style.display = "none";
        }

        //Eventy dla paska nawigacji
        document.getElementById('to_calc').addEventListener('click', function () {
            Scroll('forms')
        })
        document.getElementById('to_training').addEventListener('click', function () {
            Scroll('advices-section')
        })
        document.getElementById('to_footer').addEventListener('click', function () {
            Scroll('footer')
        })

        ////////////////////////////////////////////////////   

        // Dynamiczne dodawanie/usuwanie klas po wczytaniu strony + deklaracja zmiennych używanych w kilku miejscach skryptu

        results.classList.add('hide');
        message.classList.add('hide');
        image.classList.remove('form-section__image--transition');

        const list = document.querySelector('.header__list');
        const anim_button = document.querySelector('.anim-button');

        ///////////////////////////////////////////////////

        // Menu hamburgerowe - urządzenia mobilne

        anim_button.addEventListener('click', classToggle);

        function classToggle() {

            list.classList.toggle('anim-button--slide');
            this.classList.toggle('anim-button__bar--click');
            document.querySelector('.nav').classList.toggle('border');
        }

        ////////////////////////////////////////////////////

        // Schowanie rozwiniętego menu hamburgerowego w przypadku, gdy użytkownik przewinie stronę

        window.addEventListener('scroll', removeClass);

        function removeClass() {
            if (document.documentElement.scrollTop || document.body.scrollTop >= 169) {
                list.classList.remove('anim-button--slide');
                anim_button.classList.remove('anim-button__bar--click');
            }
        };

        ///////////////////////////////////////////////////////    

        // Pojawianie się przycisku do powrotu na górę strony po przewinicięciu w dół, dla wszystkich urządzeń, poza telefonami o orientacji pionowej //

        const mobileViewport = window.matchMedia("screen and (min-width: 600px)");
        const buttonUp = document.querySelector(".arrow-button-up")

        function ToggleClass() {
            if (document.documentElement.scrollTop || document.body.scrollTop > 500) {
                buttonUp.style.opacity = "1";
            } else buttonUp.style.opacity = "0";
        }

        window.addEventListener('scroll', function () {
            if (mobileViewport.matches) {
                ToggleClass()
            } else {
                buttonUp.style.display = "none";
            }
        })


        ////////////////////////////////////////////////////

        // Poruszanie się po stronie góra - dół za pomocą arrow buttons

        document.querySelector('.fa-chevron-circle-down').addEventListener('click', function () {
            Scroll('forms')
        });


        document.querySelector('.fa-angle-double-up').addEventListener('click', function () {
            setTimeout((function () {
                document.documentElement.scrollTop = 0;
            }), 700);
            Scroll('header')
        });


        //////////////////////////////
        // Część kalkulatora // 
        //////////////////////////////

        /* Fragment kodu poniżej zapobiega przejściu do góry strony (próba wysłania formularza) i wywołuje funkcję calculate po naciśnięciu klawisza Enter */

        document.getElementById('weight').addEventListener('keypress', function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                calculate();
            }
        });
        /////////////////////////////////////////////////////////////


        /* Funkcja wykonująca potrzebne obliczenia kalulatora. Uwzględnia prostą walidację pola formularza (typ number i odpowiedni zakres wprowadzonej wartości) */
        document.querySelector('#form_button').addEventListener('click', calculate);

        function calculate() {
            let weight, weight_num, reps, reps_num, text, result;
            weight = document.querySelector("#weight");
            weight_num = parseInt(weight.value);
            reps = document.querySelector("#reps");
            reps_num = parseInt(reps.value);

            if (!(/^\d{2,3}$/.test(weight.value) && (weight_num >= 40 && weight_num <= 250))) {
                text = "Wartość powinna być liczbą całkowitą i powinna zawierać się w przedziale 40-250kg.";
                setTimeout(function () {
                    window.location = "index.html#forms"
                }, 200);
                results.classList.add('hide');

                message.innerHTML = text;
                image.classList.add("form-section__image--transition");
                message.classList.remove('hide');
            } else {
                if (reps_num == 2) {
                    result = Math.round(weight_num * 1.07);
                    document.getElementById("max").innerHTML = result;

                } else {
                    result = Math.round(weight_num * (1.03 + reps_num * 0.03));
                    document.getElementById("max").innerHTML = result;
                }
                results.classList.remove('hide');
                image.classList.remove("form-section__image--transition");
                message.classList.add('hide');
                setTimeout(function () {
                    Scroll('results')
                }, 200);
            }

            document.getElementById("80p").innerHTML = Math.round(result * 0.8);
            document.getElementById("90p").innerHTML = Math.round(result * 0.9);
            document.getElementById("110p").innerHTML = Math.round(result * 1.1);
        }
        ////////////////////////////////////////////////////////////////

        /* Funkcja służąca do płynnego scrollowania */

        function Scroll(name) {
            ScrollTo(document.getElementById(name));
        }

        function ScrollTo(elem) {

            let distanceTo = parseFloat(elem.getBoundingClientRect().top * 0.5);

            document.documentElement.scrollTop += distanceTo + 0.99;
            document.body.scrollTop += distanceTo + 0.99;

            if (!elem.lastScroll || elem.lastScroll >= Math.abs(distanceTo) && elem.lastScroll >= 0.6) {
                elem.lastScroll = Math.abs(distanceTo);
                setTimeout(function () {
                    ScrollTo(elem);
                }, "65");
            } else {
                elem.lastScroll = null;
            }
        }
