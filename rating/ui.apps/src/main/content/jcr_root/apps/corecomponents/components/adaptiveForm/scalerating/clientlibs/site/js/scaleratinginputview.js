/*******************************************************************************
 * Copyright 2022 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
(function() {

    "use strict";
    class ScaleRating extends FormView.FormFieldBase {

        static NS = FormView.Constants.NS;
        static IS = "adaptiveFormScaleRating";
        static bemBlock = 'cmp-adaptiveform-scalerating';
        static selectors  = {
            self: "[data-" + this.NS + '-is="' + this.IS + '"]',
            widget: `.${ScaleRating.bemBlock}__widget`,
            label: `.${ScaleRating.bemBlock}__label`,
            description: `.${ScaleRating.bemBlock}__longdescription`,
            errorDiv: `.${ScaleRating.bemBlock}__errormessage`,
            qm: `.${ScaleRating.bemBlock}__questionmark`,
            tooltipDiv: `.${ScaleRating.bemBlock}__shortdescription`
        };

        constructor(params) {
            super(params);
            this.initialise();
        }
        
        updateStars(input) {
          const starCountInput = input;
          let starCount = parseInt(starCountInput.value);
      
          // Enforce minimum and maximum values
          if (starCount < parseInt(starCountInput.min)) {
            starCount = parseInt(starCountInput.min);
          } else if (starCount > parseInt(starCountInput.max)) {
            starCount = parseInt(starCountInput.max);
          }
      
          starCountInput.value = starCount;
      
          const starsContainer = input.parentNode.querySelector('.stars-container');
          starsContainer.innerHTML = '';
          starsContainer.classList.add('stars-container');
      
          for (let i = 1; i <= starCount; i++) {
            const star = document.createElement("span");
            star.className = "cmp-adaptiveform-star";
            star.id = i;
            star.addEventListener("click", (e) => {
              this.updateRating(e);
            })
            // star.onclick = () => {
            //   this.updateRating(this.id, input);
            // };
            star.innerHTML = "&#9733;";
            starsContainer.appendChild(star);
          }
      
          const stars = starsContainer.querySelectorAll('.cmp-adaptiveform-star');
          stars.forEach((star, starvalue) => {
            star.addEventListener('click', () => {
              for (let i = 0; i <= starvalue; i++) {
                stars[i].classList.add('cmp-adaptiveform_star--filled', 'active');
              }
              for (let i = starvalue + 1; i < stars.length; i++) {
                stars[i].classList.remove('cmp-adaptiveform_star--filled', 'active');
              }
            });
          });
        }

        updateRating(event) {
          const starElement = event.currentTarget;
          const id = starElement.id; 
          // const ratingContainer = input.parentNode.parentNode;
          // const currentRating = ratingContainer.querySelector('.current-rating');
          // currentRating.innerHTML = id;
          // _this._setmodel.value(id);
          this._model.value = id;
        }

        initialise() {
            const _this = this;
              // Initial stars setup for each instance
              const starCountInputs = document.querySelectorAll('.star-count');
              starCountInputs.forEach((input) => {
                this.updateStars(input);
              });

              // Handle page load event
              document.addEventListener('DOMContentLoaded', function() {
                const starCountInputs = document.querySelectorAll('.star-count');
                starCountInputs.forEach((input) => {
                  this.updateStars(input);
                });
              });            

        }

        getClass() {
            return ScaleRating.IS;
        }

        getWidget() {
            return this.element.querySelector(ScaleRating.selectors.widget);
        }

        getDescription() {
            return this.element.querySelector(ScaleRating.selectors.description);
        }

        getLabel() {
            return this.element.querySelector(ScaleRating.selectors.label);
        }

        getErrorDiv() {
            return this.element.querySelector(ScaleRating.selectors.errorDiv);
        }

        getTooltipDiv() {
            return this.element.querySelector(ScaleRating.selectors.tooltipDiv);
        }

        getQuestionMarkDiv() {
            return this.element.querySelector(ScaleRating.selectors.qm);
        }
        
      }


    FormView.Utils.setupField(({element, formContainer}) => {
        return new ScaleRating({element,formContainer})
    }, ScaleRating.selectors.self);
})();

