// data to show
const sections = [
    {
        name: 'Section 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.'
    },
    {
        name: 'Section 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.'
    },
    {
        name: 'Section 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.'
    },
    {
        name: 'Section 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.'
    }
];

const toUp = document.querySelector("#toUp");
if (toUp) {
    toUp.addEventListener('click',() => {
        window.scrollTo(0, 0);
    });
}

// queue the data and add it to stack call after load with timeout 0
setTimeout(() => {
    // nav constants
    const ul = document.querySelector('ul');
    const fragmentNav = document.createDocumentFragment();
    // container constants
    const container = document.getElementById('container');
    const fragmentContent = document.createDocumentFragment();
    // identify the section with and id to scroll to it when click
    let id = 1;

    // loop through data and show the content
    sections.forEach( section => {
        // in the nav menu
        let liElement = document.createElement('li');
        liElement.id = `section_${id}`;
        liElement.innerHTML = section.name;
        fragmentNav.appendChild(liElement);

        // in the content menu
        let sectionElement = document.createElement('section');
        sectionElement.setAttribute('data-nav',`section_${id}`);
        let h2 = document.createElement('h2');
        h2.innerHTML = section.name;
        sectionElement.appendChild(h2);
        let p = document.createElement('p');
        p.innerHTML = section.content;
        sectionElement.appendChild(p);
        fragmentContent.appendChild(sectionElement);

        id++;
    });

    // make sure no errors, and selectors are not null and exsists
    if (ul && container) {
        // (reflow & calculate) and show nav menu
        ul.appendChild(fragmentNav);
        // event listener for the LIs parents
        ul.addEventListener('click', (event) => {
            if (event.target.nodeName === 'LI') {
                const navs = document.querySelectorAll('li');
                for ( const nav of navs ) {
                    if (nav.id === event.target.id) {
                        nav.className = 'selected';
                    } else {
                        nav.className = '';
                    }
                }
                const section = document.querySelector(`section[data-nav="${event.target.id}"]`);
                if (section) {
                    // 50 is the space of the fixed header
                    window.scrollTo(0, section.offsetTop-50);
                }
            }
        });
        // (reflow & calculate) and show content
        container.appendChild(fragmentContent);
        // event listener for the sections
        container.addEventListener('click', (event) => {
            if (event.target.nodeName === 'H2') {
                let content = event.target.parentElement.querySelector('p');
                if (content) {
                    content.classList.toggle('hidden');
                }
            }
        });
    }
}, 0);

var interval = setTimeout(() => {
    document.querySelector('header').style.display = 'none';
}, 5000);

document.addEventListener('scroll', () => {

    const sections = document.querySelectorAll("section");
    for ( let section of sections ) {
        // if bottom is showing by more than 100px and top is showing by more than 100px
        if (
            ((section.getBoundingClientRect().bottom - 100) > 0) &&
            (section.getBoundingClientRect().top < window.innerHeight - 100)
        ) {
            section.className = 'active';
        } else {
            section.className = '';
        }
    }

    if (toUp) {
        if (window.innerHeight > (document.body.getBoundingClientRect().bottom - 10)) {
            // reached the bottom with safe space 10px more
            toUp.style.display = 'block';
        } else {
            toUp.style.display = 'none';
        }
    }

    document.querySelector('header').style.display = '';
    clearInterval(interval);
    interval = setTimeout(() => {
        document.querySelector('header').style.display = 'none';
    }, 5000);

});