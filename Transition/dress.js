        document.addEventListener('DOMContentLoaded', () => {
            const container = document.querySelector('.transition-container');
            const coat = document.querySelector('.coat');
            

            setTimeout(() => {
                coat.classList.add('active');
            }, 300);
            

            container.addEventListener('mouseenter', activateTransition);
            container.addEventListener('click', activateTransition);
            
            function activateTransition() {
                container.classList.add('active');
                container.removeEventListener('mouseenter', activateTransition);
                container.removeEventListener('click', activateTransition);
            }
        });